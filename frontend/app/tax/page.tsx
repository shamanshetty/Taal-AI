'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  Lightbulb,
  DollarSign,
  PieChart,
  Download,
  ArrowRight,
  Clock,
} from 'lucide-react'

export default function TaxPage() {
  // Mock income data for irregular income professional
  const monthlyIncome = [
    { month: 'Apr', income: 45000, taxableIncome: 45000 },
    { month: 'May', income: 0, taxableIncome: 0 },
    { month: 'Jun', income: 85000, taxableIncome: 85000 },
    { month: 'Jul', income: 30000, taxableIncome: 30000 },
    { month: 'Aug', income: 0, taxableIncome: 0 },
    { month: 'Sep', income: 120000, taxableIncome: 120000 },
    { month: 'Oct', income: 55000, taxableIncome: 55000 },
  ]

  const totalIncome = monthlyIncome.reduce((sum, m) => sum + m.income, 0)
  const avgMonthlyIncome = totalIncome / monthlyIncome.length
  const projectedAnnualIncome = avgMonthlyIncome * 12

  // Tax calculation for FY 2024-25 (New Regime)
  const calculateTax = (income: number) => {
    let tax = 0
    if (income <= 300000) {
      tax = 0
    } else if (income <= 700000) {
      tax = (income - 300000) * 0.05
    } else if (income <= 1000000) {
      tax = 20000 + (income - 700000) * 0.10
    } else if (income <= 1200000) {
      tax = 50000 + (income - 1000000) * 0.15
    } else if (income <= 1500000) {
      tax = 80000 + (income - 1200000) * 0.20
    } else {
      tax = 140000 + (income - 1500000) * 0.30
    }
    return Math.round(tax + tax * 0.04) // Including 4% cess
  }

  const estimatedTax = calculateTax(projectedAnnualIncome)
  const monthlyTaxProvision = Math.round(estimatedTax / 12)
  const taxRate = ((estimatedTax / projectedAnnualIncome) * 100).toFixed(1)

  // Deductions
  const [deductions, setDeductions] = useState([
    { name: '80C - PPF/ELSS/Insurance', amount: 0, maxLimit: 150000 },
    { name: '80D - Health Insurance', amount: 0, maxLimit: 25000 },
    { name: 'NPS - 80CCD(1B)', amount: 0, maxLimit: 50000 },
    { name: 'Home Loan Interest - 24(b)', amount: 0, maxLimit: 200000 },
  ])

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0)
  const taxAfterDeductions = calculateTax(Math.max(0, projectedAnnualIncome - totalDeductions))
  const taxSaved = estimatedTax - taxAfterDeductions

  // Quarterly tax estimates
  const quarters = [
    { name: 'Q1 (Apr-Jun)', dueDate: 'June 15', amount: Math.round(estimatedTax * 0.25) },
    { name: 'Q2 (Jul-Sep)', dueDate: 'Sep 15', amount: Math.round(estimatedTax * 0.25) },
    { name: 'Q3 (Oct-Dec)', dueDate: 'Dec 15', amount: Math.round(estimatedTax * 0.25) },
    { name: 'Q4 (Jan-Mar)', dueDate: 'Mar 15', amount: Math.round(estimatedTax * 0.25) },
  ]

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
            <span className="text-gradient-green-gold">Tax Insights</span>
          </h1>
          <p className="text-muted-foreground">Smart tax planning for irregular income professionals</p>
        </motion.div>

        {/* Income Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-theme-green" />
              <span className="text-sm text-muted-foreground">YTD Income</span>
            </div>
            <div className="text-2xl font-bold text-theme-green">
              ₹{totalIncome.toLocaleString('en-IN')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-theme-gold" />
              <span className="text-sm text-muted-foreground">Projected Annual</span>
            </div>
            <div className="text-2xl font-bold">
              ₹{Math.round(projectedAnnualIncome).toLocaleString('en-IN')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-destructive" />
              <span className="text-sm text-muted-foreground">Est. Tax Liability</span>
            </div>
            <div className="text-2xl font-bold text-destructive">
              ₹{estimatedTax.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{taxRate}% effective rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="neuro-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-theme-gold" />
              <span className="text-sm text-muted-foreground">Monthly Provision</span>
            </div>
            <div className="text-2xl font-bold text-theme-gold">
              ₹{monthlyTaxProvision.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Set aside monthly</p>
          </motion.div>
        </div>

        {/* Critical Tax Tips for Irregular Income */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="neuro-card rounded-3xl p-6"
          style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <h2 className="text-xl font-bold">Critical for Irregular Income Earners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-background/50 border border-destructive/20">
              <h3 className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Advance Tax is Mandatory
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                If your tax liability exceeds ₹10,000, you MUST pay advance tax quarterly. Failing to do so results in interest charges under Section 234B & 234C.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q1 (by June 15)</span>
                  <span className="font-medium">15% of annual tax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q2 (by Sep 15)</span>
                  <span className="font-medium">45% cumulative</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q3 (by Dec 15)</span>
                  <span className="font-medium">75% cumulative</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Q4 (by Mar 15)</span>
                  <span className="font-medium">100% of tax</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-theme-gold/20">
              <h3 className="text-sm font-medium text-theme-gold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Smart Strategies for You
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-theme-green mt-0.5">•</span>
                  <span>Set aside {taxRate}% of every payment immediately in a separate account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-theme-green mt-0.5">•</span>
                  <span>During high-income months, save extra for low-income months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-theme-green mt-0.5">•</span>
                  <span>Use 44ADA presumptive taxation if eligible (declare 50% as income)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-theme-green mt-0.5">•</span>
                  <span>Maintain proper invoices and receipts for all income and expenses</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quarterly Advance Tax Payment Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="neuro-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Advance Tax Payment Schedule</h2>
            <span className="text-sm text-muted-foreground">Based on projected income</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quarters.map((quarter, index) => {
              const isPast = new Date() > new Date(`2025-${quarter.dueDate}`)
              return (
                <motion.div
                  key={quarter.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="neuro-card-hover rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{quarter.name}</h3>
                      <p className="text-sm text-muted-foreground">Due: {quarter.dueDate}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${isPast ? 'bg-theme-green/20' : 'bg-theme-gold/20'}`}>
                      {isPast ? (
                        <CheckCircle2 className="w-5 h-5 text-theme-green" />
                      ) : (
                        <Calendar className="w-5 h-5 text-theme-gold" />
                      )}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-theme-gold">
                    ₹{quarter.amount.toLocaleString('en-IN')}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-theme-green/10 border border-theme-green/20">
            <p className="text-sm text-foreground">
              💡 Pro Tip: Pay slightly more in early quarters if you expect higher income later. You can adjust in subsequent quarters or claim refund while filing ITR.
            </p>
          </div>
        </motion.div>

        {/* Tax Saving Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="neuro-card rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Maximize Tax Savings</h2>
            <span className="text-sm text-theme-green font-medium">
              Save up to ₹{Math.round(estimatedTax * 0.3).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-3">
            {deductions.map((deduction, index) => (
              <div key={index} className="p-4 rounded-xl bg-background/50 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{deduction.name}</h3>
                    <p className="text-xs text-muted-foreground">Max limit: ₹{deduction.maxLimit.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-lg font-bold text-theme-gold">₹{deduction.amount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <div className="progress-neuro h-2">
                  <div
                    className="progress-fill h-full"
                    style={{ width: `${(deduction.amount / deduction.maxLimit) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Current Tax</p>
              <p className="text-2xl font-bold text-destructive">₹{estimatedTax.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-center">
              <p className="text-sm text-muted-foreground mb-1">After Deductions</p>
              <p className="text-2xl font-bold text-theme-gold">₹{taxAfterDeductions.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-4 rounded-xl bg-theme-green/10 border border-theme-green/20 text-center">
              <p className="text-sm text-muted-foreground mb-1">You Save</p>
              <p className="text-2xl font-bold text-theme-green">₹{taxSaved.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="neuro-card rounded-3xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">Action Items for This Month</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-theme-gold/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-theme-gold" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Set Aside Tax Provision</h3>
                <p className="text-sm text-muted-foreground">
                  Transfer ₹{monthlyTaxProvision.toLocaleString('en-IN')} to your tax savings account this month
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-theme-green/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-theme-green" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Organize Invoices & Receipts</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain digital copies of all income proofs and expense receipts for ITR filing
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-theme-green/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-theme-green" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Download Form 26AS</h3>
                <p className="text-sm text-muted-foreground">
                  Check your Form 26AS quarterly to verify TDS credits from clients
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
