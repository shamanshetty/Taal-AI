import type {
  ActionInboxItem,
  ComplianceQueueItem,
  DashboardHighlights,
  FinancialPulse,
  Goal,
  ReceivableHighlight,
  Transaction,
  UpcomingEventItem,
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim()

type RequestOptions = {
  signal?: AbortSignal
}

const ensureApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured')
  }
  return API_BASE_URL
}

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json()
  }

  let detail = response.statusText
  try {
    const errorBody = await response.json()
    if (typeof errorBody?.detail === 'string') {
      detail = errorBody.detail
    }
  } catch (error) {
    // Ignore body parsing errors and fall back to status text
  }

  throw new Error(detail || 'Request to TaalAI API failed')
}

const normalizeTransaction = (payload: any): Transaction => ({
  id: String(payload.id),
  user_id: String(payload.user_id),
  type: payload.type,
  amount: Number(payload.amount) || 0,
  currency: payload.currency ?? 'INR',
  category: payload.category ?? undefined,
  subcategory: payload.subcategory ?? undefined,
  description: payload.description ?? undefined,
  date: payload.date,
  client_id: payload.client_id ?? undefined,
  scheduled_for: payload.scheduled_for ?? undefined,
  is_recurring: Boolean(payload.is_recurring),
  recurrence_rule: payload.recurrence_rule ?? undefined,
  gst_eligible: Boolean(payload.gst_eligible),
  gst_rate: payload.gst_rate != null ? Number(payload.gst_rate) : undefined,
  ledger_status: payload.ledger_status ?? 'unreconciled',
  requires_follow_up: Boolean(payload.requires_follow_up),
  follow_up_reason: payload.follow_up_reason ?? undefined,
  has_receipt: Boolean(payload.has_receipt),
  tags: Array.isArray(payload.tags) ? payload.tags : undefined,
  notes: payload.notes ?? undefined,
  source: payload.source ?? undefined,
  created_at: payload.created_at,
  updated_at: payload.updated_at ?? payload.created_at,
})

const normalizeGoal = (payload: any): Goal => ({
  id: String(payload.id),
  user_id: String(payload.user_id),
  title: payload.title ?? 'Untitled goal',
  description: payload.description ?? undefined,
  category: payload.category ?? undefined,
  status: payload.status ?? 'active',
  priority: payload.priority ?? 'medium',
  target_amount: Number(payload.target_amount) || 0,
  current_amount: Number(payload.current_amount) || 0,
  deadline: payload.deadline ?? undefined,
  monthly_contribution: Number(payload.monthly_contribution) || 0,
  required_monthly: Number(payload.required_monthly) || 0,
  icon_key: payload.icon_key ?? undefined,
  tags: Array.isArray(payload.tags) ? payload.tags : undefined,
  notes: payload.notes ?? undefined,
  created_at: payload.created_at,
  updated_at: payload.updated_at,
})

const normalizePulse = (payload: any): FinancialPulse => ({
  score: Number(payload.score) || 0,
  trend: payload.trend ?? 'stable',
  volatility: Number(payload.volatility) || 0,
  savingsRate: Number(payload.savings_rate ?? payload.savingsRate) || 0,
  insights: Array.isArray(payload.insights)
    ? payload.insights.map((item: unknown) => String(item))
    : [],
})

export async function fetchTransactions(
  userId: string,
  options?: RequestOptions,
): Promise<Transaction[]> {
  const baseUrl = ensureApiBaseUrl()
  const url = new URL('/api/transactions', baseUrl)
  url.searchParams.set('user_id', userId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: options?.signal,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await handleResponse(response)
  if (!Array.isArray(data)) {
    return []
  }

  return data.map(normalizeTransaction)
}

export async function fetchGoals(userId: string, options?: RequestOptions): Promise<Goal[]> {
  const baseUrl = ensureApiBaseUrl()
  const url = new URL('/api/goals', baseUrl)
  url.searchParams.set('user_id', userId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: options?.signal,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await handleResponse(response)
  if (!Array.isArray(data)) {
    return []
  }

  return data.map(normalizeGoal)
}

export async function fetchFinancialPulse(
  userId: string,
  options?: RequestOptions,
): Promise<FinancialPulse | null> {
  const baseUrl = ensureApiBaseUrl()
  const url = new URL('/api/transactions/pulse', baseUrl)
  url.searchParams.set('user_id', userId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: options?.signal,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await handleResponse(response)
  if (!data) {
    return null
  }

  return normalizePulse(data)
}

const normalizeReceivable = (payload: any): ReceivableHighlight => ({
  id: String(payload.id),
  title: payload.title ?? 'Invoice',
  client_name: payload.client_name ?? undefined,
  amount: Number(payload.amount) || 0,
  currency: payload.currency ?? 'INR',
  due_date: payload.due_date ?? undefined,
  status_label: payload.status_label ?? 'Add invoice details',
})

const normalizeComplianceItem = (payload: any): ComplianceQueueItem => ({
  id: String(payload.id),
  title: payload.title ?? 'Compliance task',
  task_type: payload.task_type ?? undefined,
  due_date: payload.due_date ?? undefined,
  status: payload.status ?? 'pending',
  notes: payload.notes ?? undefined,
  urgency_label: payload.urgency_label ?? 'Add due date',
})

const normalizeActionItem = (payload: any): ActionInboxItem => ({
  id: String(payload.id),
  title: payload.title ?? 'Action item',
  category: payload.category ?? 'General',
  urgency: payload.urgency ?? '__',
  kind: payload.kind ?? 'transaction',
  amount: payload.amount != null ? Number(payload.amount) : undefined,
})

const normalizeUpcomingEvent = (payload: any): UpcomingEventItem => ({
  id: String(payload.id),
  title: payload.title ?? 'Upcoming item',
  date: payload.date ?? undefined,
  amount: payload.amount != null ? Number(payload.amount) : undefined,
  currency: payload.currency ?? undefined,
  type: payload.type ?? 'task',
  source: payload.source ?? 'transaction',
})

export async function fetchDashboardHighlights(
  userId: string,
  options?: RequestOptions,
): Promise<DashboardHighlights> {
  const baseUrl = ensureApiBaseUrl()
  const url = new URL('/api/dashboard/highlights', baseUrl)
  url.searchParams.set('user_id', userId)

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: options?.signal,
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await handleResponse(response)
  return {
    receivables: Array.isArray(data?.receivables)
      ? data.receivables.map(normalizeReceivable)
      : [],
    compliance_queue: Array.isArray(data?.compliance_queue)
      ? data.compliance_queue.map(normalizeComplianceItem)
      : [],
    action_inbox: Array.isArray(data?.action_inbox)
      ? data.action_inbox.map(normalizeActionItem)
      : [],
    upcoming_events: Array.isArray(data?.upcoming_events)
      ? data.upcoming_events.map(normalizeUpcomingEvent)
      : [],
  }
}
