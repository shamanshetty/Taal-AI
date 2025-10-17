'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Download,
  Filter,
  PieChart,
  BarChart3,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Wallet,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('overview')

  // Mock data for charts
  const monthlyData = [
    { month: 'Apr', income: 75000, expense: 45000, savings: 30000 },
    { month: 'May', income: 82000, expense: 48000, savings: 34000 },
    { month: 'Jun', income: 78000, expense: 52000, savings: 26000 },
    { month: 'Jul', income: 85000, expense: 47000, savings: 38000 },
    { month: 'Aug', income: 90000, expense: 51000, savings: 39000 },
    { month: 'Sep', income: 88000, expense: 49000, savings: 39000 },
    { month: 'Oct', income: 95000, expense: 53000, savings: 42000 },
  ]

  const categoryData = [
    { name: 'Food & Dining', value: 15000, color: '#F59E0B' },
    { name: 'Transport', value: 8000, color: '#16A34A' },
    { name: 'Entertainment', value: 5000, color: '#8B5CF6' },
    { name: 'Shopping', value: 12000, color: '#EF4444' },
    { name: 'Bills & Utilities', value: 10000, color: '#3B82F6' },
    { name: 'Others', value: 3000, color: '#6B7280' },
  ]

  const savingsGrowth = [
    { month: 'Apr', balance: 100000 },
    { month: 'May', balance: 134000 },
    { month: 'Jun', balance: 160000 },
    { month: 'Jul', balance: 198000 },
    { month: 'Aug', balance: 237000 },
    { month: 'Sep', balance: 276000 },
    { month: 'Oct', balance: 318000 },
  ]

  // Calculate summary metrics
  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)
  const totalExpense = monthlyData.reduce((sum, item) => sum + item.expense, 0)
  const totalSavings = monthlyData.reduce((sum, item) => sum + item.savings, 0)
  const savingsRate = (totalSavings / totalIncome) * 100
  const avgMonthlyIncome = totalIncome / monthlyData.length
  const avgMonthlyExpense = totalExpense / monthlyData.length

  // Month-over-month growth
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  const incomeGrowth = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
  const expenseGrowth = ((currentMonth.expense - previousMonth.expense) / previousMonth.expense) * 100

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:ml-[280px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-grotesk mb-2">
              <span className="text-gradient-green-gold">Financial Reports</span>
            </h1>
            <p className="text-muted-foreground">Comprehensive insights into your financial journey</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-background/50 border border-white/10 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-theme-green/50"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            <button className="neuro-button flex items-center gap-2 text-theme-green">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </motion.div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Income</span>
              <ArrowUpRight className="w-5 h-5 text-theme-green" />
            </div>
            <div className="text-3xl font-bold text-theme-green mb-1">
              {formatCurrency(totalIncome)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-theme-green" />
              <span className="text-theme-green">+{incomeGrowth.toFixed(1)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Expenses</span>
              <ArrowDownRight className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-3xl font-bold text-destructive mb-1">
              {formatCurrency(totalExpense)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-destructive" />
              <span className="text-destructive">+{expenseGrowth.toFixed(1)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Savings</span>
              <Wallet className="w-5 h-5 text-theme-gold" />
            </div>
            <div className="text-3xl font-bold text-theme-gold mb-1">
              {formatCurrency(totalSavings)}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Avg:</span>
              <span className="text-foreground font-medium">{formatCurrency(totalSavings / monthlyData.length)}/mo</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Savings Rate</span>
              <Target className="w-5 h-5 text-theme-green" />
            </div>
            <div className="text-3xl font-bold text-theme-green mb-1">
              {savingsRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              {savingsRate >= 50 ? 'Excellent!' : savingsRate >= 30 ? 'Good progress' : 'Need improvement'}
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="neuro-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Income vs Expenses</h2>
                <p className="text-sm text-muted-foreground">Monthly comparison</p>
              </div>
              <BarChart3 className="w-6 h-6 text-theme-gold" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#999999" />
                <YAxis stroke="#999999" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="income" fill="#16A34A" name="Income" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#EF4444" name="Expenses" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category-wise Spending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="neuro-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Spending by Category</h2>
                <p className="text-sm text-muted-foreground">Current month breakdown</p>
              </div>
              <PieChart className="w-6 h-6 text-theme-gold" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RechartPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </RechartPieChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-muted-foreground">{category.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Savings Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="neuro-card rounded-3xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Savings Growth</h2>
                <p className="text-sm text-muted-foreground">Total balance over time</p>
              </div>
              <LineChartIcon className="w-6 h-6 text-theme-green" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#999999" />
                <YAxis stroke="#999999" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ fill: '#16A34A', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="neuro-card rounded-3xl p-6"
          style={{ background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-theme-gold" />
            <h2 className="text-xl font-bold">AI-Powered Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-theme-green" />
                <h3 className="font-semibold">Income Trend</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your income has grown by {incomeGrowth.toFixed(1)}% this month. Keep diversifying your income streams!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-theme-gold" />
                <h3 className="font-semibold">Expense Pattern</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Food & Dining is your top expense category. Consider meal prepping to save 30-40%.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-theme-green" />
                <h3 className="font-semibold">Savings Goal</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You're on track! At this rate, you'll reach ₹5L in savings within 6 months.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
