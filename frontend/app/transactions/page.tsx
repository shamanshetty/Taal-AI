'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Tag,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  Lightbulb,
  Target,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock transaction data
  const transactions: Transaction[] = [
    { id: '1', date: '2025-10-15', description: 'Freelance Project Payment', category: 'Income', amount: 45000, type: 'income' },
    { id: '2', date: '2025-10-14', description: 'Grocery Shopping', category: 'Food', amount: 2500, type: 'expense' },
    { id: '3', date: '2025-10-13', description: 'Netflix Subscription', category: 'Entertainment', amount: 649, type: 'expense' },
    { id: '4', date: '2025-10-12', description: 'Client Consulting Fee', category: 'Income', amount: 30000, type: 'income' },
    { id: '5', date: '2025-10-11', description: 'Uber Rides', category: 'Transport', amount: 850, type: 'expense' },
    { id: '6', date: '2025-10-10', description: 'Restaurant Dinner', category: 'Food', amount: 1800, type: 'expense' },
    { id: '7', date: '2025-10-09', description: 'Online Course', category: 'Education', amount: 3500, type: 'expense' },
    { id: '8', date: '2025-10-08', description: 'Amazon Shopping', category: 'Shopping', amount: 4200, type: 'expense' },
  ]

  const categories = ['all', 'Income', 'Food', 'Transport', 'Entertainment', 'Education', 'Shopping']

  // Calculate insights
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalIncome - totalExpense

  // Category-wise spending
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0]

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:ml-[280px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-grotesk mb-2">
            <span className="text-gradient-green-gold">Transactions</span>
          </h1>
          <p className="text-muted-foreground">Track every rupee with detailed insights</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="text-3xl font-bold text-theme-green">
              ₹{totalIncome.toLocaleString('en-IN')}
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
            <div className="text-3xl font-bold text-destructive">
              ₹{totalExpense.toLocaleString('en-IN')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Net Balance</span>
              <DollarSign className={`w-5 h-5 ${netBalance >= 0 ? 'text-theme-green' : 'text-destructive'}`} />
            </div>
            <div className={`text-3xl font-bold ${netBalance >= 0 ? 'text-theme-green' : 'text-destructive'}`}>
              {netBalance >= 0 ? '+' : ''}₹{Math.abs(netBalance).toLocaleString('en-IN')}
            </div>
          </motion.div>
        </div>

        {/* Personalized Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="neuro-card rounded-3xl p-6"
          style={{ background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-theme-gold" />
            <h2 className="text-xl font-bold">Personalized Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top Spending Category */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-theme-gold" />
                <h3 className="text-sm font-medium text-muted-foreground">Top Spending Category</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">{topCategory?.[0] || 'N/A'}</p>
              <p className="text-sm text-muted-foreground mt-1">
                ₹{topCategory?.[1]?.toLocaleString('en-IN')} spent ({((topCategory?.[1] / totalExpense) * 100).toFixed(0)}%)
              </p>
            </div>

            {/* Spending Pattern */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-theme-green" />
                <h3 className="text-sm font-medium text-muted-foreground">Spending Pattern</h3>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {netBalance > 0 ? 'Healthy Savings' : 'Spending > Income'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {netBalance > 0
                  ? `You're saving ${((netBalance / totalIncome) * 100).toFixed(0)}% of your income`
                  : 'Consider reducing expenses to build savings'
                }
              </p>
            </div>

            {/* Smart Recommendation */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-theme-green" />
                <h3 className="text-sm font-medium text-muted-foreground">Smart Recommendation</h3>
              </div>
              <p className="text-foreground">
                {topCategory?.[0] === 'Food' && (
                  <span>Try meal prepping to reduce food expenses by 30-40%. You could save ₹{Math.round((topCategory[1] * 0.35)).toLocaleString('en-IN')} this month!</span>
                )}
                {topCategory?.[0] === 'Transport' && (
                  <span>Consider using public transport or carpooling to cut transport costs by 25%. Potential savings: ₹{Math.round((topCategory[1] * 0.25)).toLocaleString('en-IN')}</span>
                )}
                {topCategory?.[0] === 'Entertainment' && (
                  <span>Set a monthly entertainment budget of ₹{Math.round(topCategory[1] * 0.7).toLocaleString('en-IN')} to enjoy while saving 30%</span>
                )}
                {topCategory?.[0] === 'Shopping' && (
                  <span>Use the 30-day rule: Wait 30 days before non-essential purchases. This could reduce impulse buying by 40%</span>
                )}
                {!['Food', 'Transport', 'Entertainment', 'Shopping'].includes(topCategory?.[0]) && (
                  <span>Great job managing your expenses! Keep tracking to maintain this balance.</span>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="neuro-card rounded-2xl p-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background/50 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-theme-green/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-background/50 border border-white/10 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-theme-green/50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-3"
        >
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="neuro-card-hover rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    ${transaction.type === 'income'
                      ? 'bg-theme-green/20 text-theme-green'
                      : 'bg-destructive/20 text-destructive'
                    }
                  `}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-6 h-6" />
                    ) : (
                      <ArrowDownRight className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">{transaction.description}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(transaction.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        {transaction.category}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`text-xl font-bold ${
                  transaction.type === 'income' ? 'text-theme-green' : 'text-destructive'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
