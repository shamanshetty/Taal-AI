'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to TaalAI!',
    description: 'Let\'s set up your financial profile in 3 simple steps',
  },
  {
    id: 'income',
    title: 'Your Income Sources',
    description: 'Tell us about how you earn money',
  },
  {
    id: 'expenses',
    title: 'Monthly Expenses',
    description: 'What are your typical monthly expenses?',
  },
  {
    id: 'goals',
    title: 'Financial Goals',
    description: 'What are you saving for?',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    incomeSources: [{ name: '', type: 'freelance', amount: '' }],
    monthlyExpense: '',
    expenseCategories: '',
    goals: [{ title: '', targetAmount: '', deadline: '' }],
  })

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit and navigate to dashboard
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log('Form data:', formData)
    router.push('/dashboard')
  }

  const addIncomeSource = () => {
    setFormData({
      ...formData,
      incomeSources: [...formData.incomeSources, { name: '', type: 'freelance', amount: '' }],
    })
  }

  const addGoal = () => {
    setFormData({
      ...formData,
      goals: [...formData.goals, { title: '', targetAmount: '', deadline: '' }],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    index <= currentStep
                      ? 'bg-saffron-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-1 mx-2">
                    <div
                      className={`h-full rounded transition-all ${
                        index < currentStep ? 'bg-saffron-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-saffron-500" />
                  <span className="text-sm font-medium text-saffron-600 dark:text-saffron-400">
                    Step {currentStep + 1} of {STEPS.length}
                  </span>
                </div>
                <CardTitle>{STEPS[currentStep].title}</CardTitle>
                <CardDescription>{STEPS[currentStep].description}</CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && <WelcomeStep formData={formData} setFormData={setFormData} />}
                {currentStep === 1 && (
                  <IncomeStep
                    formData={formData}
                    setFormData={setFormData}
                    addIncomeSource={addIncomeSource}
                  />
                )}
                {currentStep === 2 && <ExpenseStep formData={formData} setFormData={setFormData} />}
                {currentStep === 3 && (
                  <GoalsStep formData={formData} setFormData={setFormData} addGoal={addGoal} />
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                  <Button onClick={nextStep} className="flex-1 flex items-center justify-center gap-2">
                    {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function WelcomeStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">What should we call you?</label>
        <Input
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>
      <div className="p-4 bg-saffron-50 dark:bg-saffron-950/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          👋 Hi! I'm TaalAI, your personal financial coach. I'll help you understand your income rhythm,
          make smarter decisions, and achieve your financial goals.
        </p>
      </div>
    </div>
  )
}

function IncomeStep({ formData, setFormData, addIncomeSource }: any) {
  return (
    <div className="space-y-4">
      {formData.incomeSources.map((source: any, index: number) => (
        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
          <Input
            placeholder="Income source (e.g., Freelance Design)"
            value={source.name}
            onChange={(e) => {
              const newSources = [...formData.incomeSources]
              newSources[index].name = e.target.value
              setFormData({ ...formData, incomeSources: newSources })
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="h-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm"
              value={source.type}
              onChange={(e) => {
                const newSources = [...formData.incomeSources]
                newSources[index].type = e.target.value
                setFormData({ ...formData, incomeSources: newSources })
              }}
            >
              <option value="monthly">Monthly Salary</option>
              <option value="freelance">Freelance</option>
              <option value="gig">Gig Work</option>
              <option value="other">Other</option>
            </select>
            <Input
              type="number"
              placeholder="Average amount (₹)"
              value={source.amount}
              onChange={(e) => {
                const newSources = [...formData.incomeSources]
                newSources[index].amount = e.target.value
                setFormData({ ...formData, incomeSources: newSources })
              }}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addIncomeSource} className="w-full">
        + Add Another Income Source
      </Button>
    </div>
  )
}

function ExpenseStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Average Monthly Expenses (₹)</label>
        <Input
          type="number"
          placeholder="e.g., 30000"
          value={formData.monthlyExpense}
          onChange={(e) => setFormData({ ...formData, monthlyExpense: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Main Expense Categories</label>
        <Input
          placeholder="e.g., Rent, Food, Transport, Entertainment"
          value={formData.expenseCategories}
          onChange={(e) => setFormData({ ...formData, expenseCategories: e.target.value })}
        />
        <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
      </div>
    </div>
  )
}

function GoalsStep({ formData, setFormData, addGoal }: any) {
  return (
    <div className="space-y-4">
      {formData.goals.map((goal: any, index: number) => (
        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
          <Input
            placeholder="Goal name (e.g., Emergency Fund)"
            value={goal.title}
            onChange={(e) => {
              const newGoals = [...formData.goals]
              newGoals[index].title = e.target.value
              setFormData({ ...formData, goals: newGoals })
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Target amount (₹)"
              value={goal.targetAmount}
              onChange={(e) => {
                const newGoals = [...formData.goals]
                newGoals[index].targetAmount = e.target.value
                setFormData({ ...formData, goals: newGoals })
              }}
            />
            <Input
              type="date"
              value={goal.deadline}
              onChange={(e) => {
                const newGoals = [...formData.goals]
                newGoals[index].deadline = e.target.value
                setFormData({ ...formData, goals: newGoals })
              }}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addGoal} className="w-full">
        + Add Another Goal
      </Button>
    </div>
  )
}
