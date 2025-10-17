"""
Coach Agent - AI-powered conversational financial coach
Uses Gemini API for personalized advice
"""
import google.generativeai as genai
from typing import Dict, List, Optional
from app.config import settings

class CoachAgent:
    """
    AI coach that provides personalized financial advice in Hinglish
    """

    def __init__(self):
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

        self.system_prompt = """You are TaalAI, a friendly and culturally-aware financial coach for Indians with irregular incomes (freelancers, gig workers, influencers).

Your personality:
- Warm, supportive, and non-judgmental
- Speaks in simple Hinglish (mix of Hindi and English) when appropriate
- Uses Indian context (INR, Indian tax system, UPI, etc.)
- Gives practical, actionable advice
- Keeps responses concise (2-3 sentences max)
- Uses emojis sparingly for warmth

Your expertise:
- Income volatility management
- Emergency fund building
- Tax planning (TDS, GST, advance tax)
- Goal-based savings
- Behavioral finance

Guidelines:
- Always consider the user's irregular income pattern
- Avoid complex jargon
- Provide specific numbers when possible
- End with an encouraging note or question
- NEVER give investment product recommendations
- Focus on habits, not one-time fixes
"""

    def generate_advice(
        self,
        user_message: str,
        context: Optional[Dict] = None,
        language: str = "en"
    ) -> str:
        """
        Generate personalized financial advice

        Args:
            user_message: User's question or concern
            context: User's financial data for context
            language: Preferred language (en, hi, hinglish)

        Returns:
            AI-generated advice
        """
        # Build context string
        context_str = ""
        if context:
            if 'pulse_score' in context:
                context_str += f"\nUser's Financial Pulse: {context['pulse_score']}/100"
            if 'avg_income' in context:
                context_str += f"\nAverage Monthly Income: ₹{context['avg_income']:,.0f}"
            if 'avg_expense' in context:
                context_str += f"\nAverage Monthly Expense: ₹{context['avg_expense']:,.0f}"
            if 'volatility' in context:
                volatility_level = "high" if context['volatility'] > 0.3 else "moderate" if context['volatility'] > 0.1 else "low"
                context_str += f"\nIncome Volatility: {volatility_level}"

        # Language instruction
        language_instruction = ""
        if language == "hi":
            language_instruction = "\nRespond in Hindi (Devanagari script)."
        elif language == "hinglish":
            language_instruction = "\nRespond in Hinglish (mix Hindi words with English)."

        full_prompt = f"""{self.system_prompt}

{context_str}

User Question: {user_message}
{language_instruction}

Respond as TaalAI:"""

        try:
            response = self.model.generate_content(full_prompt)
            return response.text.strip()
        except Exception as e:
            return f"Sorry, I'm having trouble right now. Please try again. Error: {str(e)}"

    def generate_daily_nudge(
        self,
        user_data: Dict
    ) -> str:
        """
        Generate a daily financial nudge based on user's data

        Args:
            user_data: User's financial information

        Returns:
            Short motivational message
        """
        prompt = f"""{self.system_prompt}

User Financial Summary:
- Pulse Score: {user_data.get('pulse_score', 50)}/100
- Avg Income: ₹{user_data.get('avg_income', 0):,.0f}
- Savings Rate: {user_data.get('savings_rate', 0):.1f}%
- Recent Trend: {user_data.get('trend', 'stable')}

Generate a short (1-2 sentences), encouraging daily nudge that motivates the user to make a small positive financial decision today. Be specific and actionable.

Daily Nudge:"""

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return "💪 Track one small expense today. Awareness is the first step to control!"

    def explain_spending_pattern(
        self,
        spending_data: List[Dict]
    ) -> str:
        """
        Analyze and explain spending patterns

        Args:
            spending_data: List of expenses by category

        Returns:
            Natural language explanation
        """
        if not spending_data:
            return "I need more spending data to give you insights. Track your expenses for a few days!"

        # Summarize spending
        summary = "\n".join([
            f"- {item['category']}: ₹{item['amount']:,.0f}"
            for item in spending_data[:5]  # Top 5 categories
        ])

        prompt = f"""{self.system_prompt}

User's spending breakdown:
{summary}

Analyze this spending pattern and provide:
1. One key observation
2. One specific suggestion to optimize spending
3. One encouraging note

Keep it brief (3-4 sentences).

Analysis:"""

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return "Your spending shows you're aware of where money goes - that's great! Look for one category to reduce by 10% this month."

    def create_goal_plan(
        self,
        goal_name: str,
        target_amount: float,
        current_savings: float,
        monthly_income: float
    ) -> str:
        """
        Create a personalized plan to achieve a financial goal

        Args:
            goal_name: Name of the goal
            target_amount: Target amount needed
            current_savings: Current savings
            monthly_income: Average monthly income

        Returns:
            Step-by-step plan
        """
        remaining = target_amount - current_savings

        prompt = f"""{self.system_prompt}

User wants to save for: {goal_name}
Target Amount: ₹{target_amount:,.0f}
Already Saved: ₹{current_savings:,.0f}
Remaining: ₹{remaining:,.0f}
Average Monthly Income: ₹{monthly_income:,.0f}

Create a practical, encouraging 3-step plan to help them achieve this goal. Consider their irregular income. Be specific with numbers and timelines.

Goal Plan:"""

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            suggested_monthly = remaining / 12
            return f"""Here's a simple plan for {goal_name}:

1. Save ₹{suggested_monthly:,.0f}/month for 12 months
2. In high-income months, save extra toward this goal
3. Track progress weekly to stay motivated

You've got this! 💪"""
