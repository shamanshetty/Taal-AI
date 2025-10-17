'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, Clock, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

export default function SimulatorPage() {
  const [purchaseAmount, setPurchaseAmount] = useState('')
  const [purchaseDescription, setPurchaseDescription] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSimulate = async () => {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) return

    setIsLoading(true)

    try {
      // TODO: Call actual API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/simulator/what-if?user_id=demo`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            purchase_amount: parseFloat(purchaseAmount),
            purchase_description: purchaseDescription || 'Purchase',
          }),
        }
      )

      const data = await response.json()
      setResult(data)
    } catch (error) {
      // Mock data for demo
      const mockChartData = []
      for (let i = 0; i <= 12; i++) {
        mockChartData.push({
          month: i,
          without_purchase: 100000 + i * 20000,
          with_purchase: i === 0 ? 100000 - parseFloat(purchaseAmount) : 100000 - parseFloat(purchaseAmount) + i * 20000,
        })
      }

      setResult({
        purchase_amount: parseFloat(purchaseAmount),
        purchase_description: purchaseDescription || 'Purchase',
        impact: {
          affordability_score: 75,
          savings_reduction: parseFloat(purchaseAmount),
          new_savings: 100000 - parseFloat(purchaseAmount),
          recovery_months: parseFloat(purchaseAmount) / 20000,
          goal_impacts: [
            {
              goal_name: 'Emergency Fund',
              delay_months: 2.5,
              delay_days: 75,
            },
          ],
        },
        recommendation: '⚠️ This will impact your savings, but it\'s manageable if needed.',
        chart_data: mockChartData,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getAffordabilityColor = (score: number) => {
    if (score >= 80) return 'text-theme-green'
    if (score >= 60) return 'text-theme-gold'
    return 'text-destructive'
  }

  const getAffordabilityBgColor = (score: number) => {
    if (score >= 80) return 'bg-theme-green'
    if (score >= 60) return 'bg-theme-gold'
    return 'bg-destructive'
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:ml-[280px]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-grotesk mb-2">
            <span className="text-gradient-green-gold">What If Simulator</span>
          </h1>
          <p className="text-muted-foreground">
            See how a purchase affects your financial goals
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="neuro-card rounded-3xl p-6"
        >
          <h2 className="text-xl font-bold mb-2">Simulate a Purchase</h2>
          <p className="text-sm text-muted-foreground mb-6">Enter the details of what you're thinking of buying</p>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Purchase Description</label>
              <input
                type="text"
                placeholder="e.g., New iPhone 15"
                value={purchaseDescription}
                onChange={(e) => setPurchaseDescription(e.target.value)}
                className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-theme-green/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g., 80000"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                className="w-full px-4 py-2 bg-background/50 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-theme-green/50"
              />
            </div>
            <button
              onClick={handleSimulate}
              disabled={isLoading}
              className="w-full neuro-button py-3 bg-gradient-green text-white font-medium disabled:opacity-50"
            >
              {isLoading ? 'Simulating...' : 'Simulate Impact'}
            </button>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Affordability Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="neuro-card rounded-3xl p-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-32 h-32 rounded-full ${getAffordabilityBgColor(result.impact.affordability_score)}/20 flex items-center justify-center`}>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${getAffordabilityColor(result.impact.affordability_score)}`}>
                          {result.impact.affordability_score}
                        </div>
                        <div className="text-xs text-gray-500">Affordability</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{result.purchase_description}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {formatCurrency(result.purchase_amount)}
                    </p>
                    <div className={`p-4 rounded-lg ${
                      result.impact.affordability_score >= 80
                        ? 'bg-theme-green/10 border border-theme-green/20'
                        : result.impact.affordability_score >= 60
                        ? 'bg-theme-gold/10 border border-theme-gold/20'
                        : 'bg-destructive/10 border border-destructive/20'
                    }`}>
                      <p className="text-sm">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>            {/* Impact Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="neuro-card rounded-2xl p-6"
              >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-theme-gold/20 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-theme-gold" />
                    </div>
                    <h4 className="font-medium">Savings Impact</h4>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(result.impact.savings_reduction)}</p>
                  <p className="text-sm text-muted-foreground mt-1">Reduction in savings</p>
                </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="neuro-card rounded-2xl p-6"
              >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-theme-green/20 rounded-lg">
                      <Clock className="w-5 h-5 text-theme-green" />
                    </div>
                    <h4 className="font-medium">Recovery Time</h4>
                  </div>
                  <p className="text-2xl font-bold">
                    {result.impact.recovery_months ? `${result.impact.recovery_months.toFixed(1)} mo` : 'N/A'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">To rebuild savings</p>
                </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="neuro-card rounded-2xl p-6"
              >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-destructive/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <h4 className="font-medium">New Balance</h4>
                  </div>
                  <p className="text-2xl font-bold">{formatCurrency(result.impact.new_savings)}</p>
                  <p className="text-sm text-muted-foreground mt-1">After purchase</p>
                </motion.div>
            </div>

            {/* Goal Impacts */}
            {result.impact.goal_impacts && result.impact.goal_impacts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="neuro-card rounded-3xl p-6"
              >
                <h2 className="text-xl font-bold mb-2">Impact on Your Goals</h2>
                <p className="text-sm text-muted-foreground mb-6">How this purchase affects your financial goals</p>
                
                <div className="space-y-3">
                    {result.impact.goal_impacts.map((goal: any, index: number) => (
                      <div key={index} className="p-4 neuro-card rounded-xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{goal.goal_name}</h4>
                            {goal.delay_days && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Delayed by {goal.delay_days} days ({goal.delay_months} months)
                              </p>
                            )}
                          </div>
                          {goal.delay_months && (
                            <span className="text-2xl font-bold text-theme-gold">
                              +{goal.delay_months}mo
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
            )}

            {/* Savings Trajectory Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="neuro-card rounded-3xl p-6"
            >
              <h2 className="text-xl font-bold mb-2">Savings Trajectory Comparison</h2>
              <p className="text-sm text-muted-foreground mb-6">See how your savings will grow with and without this purchase</p>
              
              <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={result.chart_data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="month" stroke="#999999" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
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
                    <Line
                      type="monotone"
                      dataKey="without_purchase"
                      stroke="#16A34A"
                      strokeWidth={2}
                      name="Without Purchase"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="with_purchase"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="With Purchase"
                      dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
