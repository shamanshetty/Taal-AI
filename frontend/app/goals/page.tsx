'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  Zap,
  Lightbulb,
  DollarSign,
  PiggyBank,
  Home,
  Car,
  Plane,
  GraduationCap,
} from 'lucide-react'

interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  icon: any
  category: string
  monthlyContribution: number
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 300000,
      currentAmount: 125000,
      deadline: '2025-12-31',
      icon: PiggyBank,
      category: 'Safety Net',
      monthlyContribution: 25000,
    },
    {
      id: '2',
      title: 'Dream Vacation to Bali',
      targetAmount: 150000,
      currentAmount: 45000,
      deadline: '2026-06-30',
      icon: Plane,
      category: 'Travel',
      monthlyContribution: 15000,
    },
    {
      id: '3',
      title: 'New Laptop',
      targetAmount: 120000,
      currentAmount: 80000,
      deadline: '2025-11-30',
      icon: GraduationCap,
      category: 'Education/Work',
      monthlyContribution: 20000,
    },
  ])

  // Calculate total savings and spending insights
  const totalSavingsTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalCurrentSavings = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalMonthlyNeeded = goals.reduce((sum, g) => sum + g.monthlyContribution, 0)
  const overallProgress = (totalCurrentSavings / totalSavingsTarget) * 100

  // Mock spending data for recommendations
  const monthlyIncome = 75000
  const monthlyExpenses = 45000
  const currentSavingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100

  // Calculate days until closest deadline
  const closestDeadline = goals.reduce((closest, goal) => {
    const goalDate = new Date(goal.deadline)
    const closestDate = new Date(closest.deadline)
    return goalDate < closestDate ? goal : closest
  })
  const daysUntilDeadline = Math.ceil((new Date(closestDeadline.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

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
            <span className="text-gradient-green-gold">Financial Goals</span>
          </h1>
          <p className="text-muted-foreground">Set goals, track progress, build wealth</p>
        </motion.div>

        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-theme-gold" />
              <span className="text-sm text-muted-foreground">Active Goals</span>
            </div>
            <div className="text-3xl font-bold">{goals.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-theme-green" />
              <span className="text-sm text-muted-foreground">Current Savings</span>
            </div>
            <div className="text-2xl font-bold text-theme-green">
              ₹{totalCurrentSavings.toLocaleString('en-IN')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-theme-gold" />
              <span className="text-sm text-muted-foreground">Overall Progress</span>
            </div>
            <div className="text-3xl font-bold">{overallProgress.toFixed(0)}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-destructive" />
              <span className="text-sm text-muted-foreground">Next Deadline</span>
            </div>
            <div className="text-2xl font-bold">{daysUntilDeadline} days</div>
          </motion.div>
        </div>

        {/* Personalized Wealth Building Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="neuro-card rounded-3xl p-6"
          style={{ background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-theme-gold" />
            <h2 className="text-xl font-bold">Your Personalized Wealth Plan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Financial Health */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Current Financial Health</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Income</span>
                  <span className="font-semibold text-theme-green">₹{monthlyIncome.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Expenses</span>
                  <span className="font-semibold text-destructive">₹{monthlyExpenses.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Savings Rate</span>
                  <span className="font-semibold text-theme-gold">{currentSavingsRate.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Required Monthly Savings */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Required for Goals</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Goal Contributions</span>
                  <span className="font-semibold">₹{totalMonthlyNeeded.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available to Save</span>
                  <span className={`font-semibold ${(monthlyIncome - monthlyExpenses) >= totalMonthlyNeeded ? 'text-theme-green' : 'text-destructive'}`}>
                    ₹{(monthlyIncome - monthlyExpenses).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Gap</span>
                  <span className={`font-semibold ${(monthlyIncome - monthlyExpenses) >= totalMonthlyNeeded ? 'text-theme-green' : 'text-destructive'}`}>
                    {(monthlyIncome - monthlyExpenses) >= totalMonthlyNeeded ? 'On Track!' : `Short ₹${(totalMonthlyNeeded - (monthlyIncome - monthlyExpenses)).toLocaleString('en-IN')}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Recommendations */}
            <div className="p-4 rounded-xl bg-background/50 border border-white/5 md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-theme-gold" />
                Smart Recommendations to Get Rich
              </h3>
              <div className="space-y-3">
                {(monthlyIncome - monthlyExpenses) < totalMonthlyNeeded && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm font-medium text-foreground mb-1">🔴 Reduce Expenses by ₹{(totalMonthlyNeeded - (monthlyIncome - monthlyExpenses)).toLocaleString('en-IN')}/month</p>
                    <p className="text-xs text-muted-foreground">
                      Cut unnecessary subscriptions, cook at home more often, use public transport to free up funds for your goals.
                    </p>
                  </div>
                )}

                {currentSavingsRate < 50 && (
                  <div className="p-3 rounded-lg bg-theme-gold/10 border border-theme-gold/20">
                    <p className="text-sm font-medium text-foreground mb-1">⚡ Increase Savings Rate to 50%</p>
                    <p className="text-xs text-muted-foreground">
                      Aim to save at least 50% of your income. The 50/30/20 rule: 50% needs, 30% wants, 20% savings. You're currently at {currentSavingsRate.toFixed(0)}%.
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-theme-green/10 border border-theme-green/20">
                  <p className="text-sm font-medium text-foreground mb-1">💰 Automate Your Savings</p>
                  <p className="text-xs text-muted-foreground">
                    Set up automatic transfers of ₹{totalMonthlyNeeded.toLocaleString('en-IN')} on the 1st of every month to reach your goals faster.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-theme-green/10 border border-theme-green/20">
                  <p className="text-sm font-medium text-foreground mb-1">📈 Side Hustle Opportunity</p>
                  <p className="text-xs text-muted-foreground">
                    Consider freelancing or a part-time gig to earn an extra ₹15,000-20,000/month. This could accelerate your goals by 6-8 months!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Active Goals</h2>
            <button className="neuro-button flex items-center gap-2 text-theme-green">
              <Plus className="w-5 h-5" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="space-y-4">
            {goals.map((goal, index) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const Icon = goal.icon
              const monthsRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
              const onTrack = goal.monthlyContribution * monthsRemaining >= (goal.targetAmount - goal.currentAmount)

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="neuro-card rounded-3xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-green flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      onTrack ? 'bg-theme-green/20 text-theme-green' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {onTrack ? 'On Track' : 'Behind'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="progress-neuro h-3">
                      <motion.div
                        className="progress-fill h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Current</p>
                      <p className="font-semibold">₹{goal.currentAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Target</p>
                      <p className="font-semibold">₹{goal.targetAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Monthly</p>
                      <p className="font-semibold text-theme-gold">₹{goal.monthlyContribution.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Deadline</p>
                      <p className="font-semibold">{monthsRemaining} months</p>
                    </div>
                  </div>

                  {!onTrack && (
                    <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-foreground">
                        ⚠️ Increase monthly contribution to ₹{Math.ceil((goal.targetAmount - goal.currentAmount) / monthsRemaining).toLocaleString('en-IN')} to reach your goal on time.
                      </p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
