'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Coffee,
  Book,
  Dumbbell,
  Droplet,
  Moon,
  Target,
  CheckCircle2,
} from 'lucide-react'
import { HeartbeatPulse } from '@/components/dashboard/HeartbeatPulse'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Hello')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock user data
  const userName = 'Shama'

  // Get time-based greeting
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock financial data
  const [incomeData] = useState([
    { month: 'Jan', income: 50000, expense: 30000 },
    { month: 'Feb', income: 45000, expense: 28000 },
    { month: 'Mar', income: 55000, expense: 32000 },
    { month: 'Apr', income: 52000, expense: 31000 },
    { month: 'May', income: 48000, expense: 29000 },
    { month: 'Jun', income: 58000, expense: 33000 },
  ])

  // Monthly savings progress
  const currentMonth = incomeData[incomeData.length - 1]
  const monthlySavings = currentMonth.income - currentMonth.expense
  const savingsGoal = 30000
  const savingsProgress = Math.min((monthlySavings / savingsGoal) * 100, 100)

  // Micro habits data
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Exercise', icon: Dumbbell, completed: true, streak: 12 },
    { id: 2, name: 'Read Finance Book', icon: Book, completed: true, streak: 8 },
    { id: 3, name: 'Track Expenses', icon: Target, completed: false, streak: 15 },
    { id: 4, name: 'Drink Water (8 glasses)', icon: Droplet, completed: true, streak: 20 },
    { id: 5, name: 'No Coffee After 2PM', icon: Coffee, completed: false, streak: 5 },
    { id: 6, name: 'Sleep Before 11PM', icon: Moon, completed: false, streak: 3 },
  ])

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h =>
      h.id === id ? { ...h, completed: !h.completed } : h
    ))
  }

  const completedToday = habits.filter(h => h.completed).length
  const totalHabits = habits.length
  const habitProgress = (completedToday / totalHabits) * 100

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:ml-[280px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Floating Greeting Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-grotesk">
                <span className="text-gradient-green-gold">{greeting}, {userName}!</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                {currentTime.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Heartbeat Pulse Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeartbeatPulse data={incomeData} />
        </motion.div>

        {/* Monthly Savings Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="neuro-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Monthly Savings</h3>
              <p className="text-sm text-muted-foreground">Goal: {formatCurrency(savingsGoal)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold font-grotesk text-gradient-turquoise">
                {formatCurrency(monthlySavings)}
              </div>
              <div className="text-sm text-muted-foreground">
                {savingsProgress.toFixed(0)}% achieved
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="progress-neuro">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${savingsProgress}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Milestone markers */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>₹0</span>
              <span>₹15k</span>
              <span>₹30k</span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 flex items-center gap-2">
            {savingsProgress >= 100 ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-theme-green" />
                <span className="text-sm text-theme-green font-medium">
                  Goal achieved! 🎉
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5 text-theme-gold" />
                <span className="text-sm text-muted-foreground">
                  ₹{(savingsGoal - monthlySavings).toLocaleString('en-IN')} more to reach your goal
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Micro Habits Tracker */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="neuro-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Daily Micro Habits</h3>
              <p className="text-sm text-muted-foreground">
                Building financial discipline, one day at a time
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-grotesk text-gradient-purple">
                {completedToday}/{totalHabits}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Today's Progress</span>
              <span className="font-medium">{habitProgress.toFixed(0)}%</span>
            </div>
            <div className="progress-neuro">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${habitProgress}%` }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  background: 'linear-gradient(90deg, #9D4EDD 0%, #C77DFF 100%)',
                }}
              />
            </div>
          </div>

          {/* Habits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {habits.map((habit, index) => {
              const Icon = habit.icon

              return (
                <motion.button
                  key={habit.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleHabit(habit.id)}
                  className={`
                    neuro-card-hover rounded-2xl p-4 text-left transition-all
                    ${habit.completed
                      ? 'border-theme-green/30 bg-gradient-to-br from-theme-green/10 to-transparent'
                      : 'border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                      ${habit.completed
                        ? 'bg-gradient-green text-white'
                        : 'bg-muted/20 text-muted-foreground'
                      }
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium text-sm ${habit.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {habit.name}
                        </h4>
                        {habit.completed && (
                          <CheckCircle2 className="w-4 h-4 text-theme-green" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          🔥 {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Motivational Message */}
          {habitProgress === 100 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-theme-green/10 to-theme-gold/10 border border-theme-green/20"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-theme-green" />
                <div>
                  <h4 className="font-semibold text-theme-green">Perfect Day!</h4>
                  <p className="text-sm text-muted-foreground">
                    You've completed all your habits today. Keep it up!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
