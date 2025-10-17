from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import TransactionCreate, TransactionResponse, FinancialPulseResponse
from app.agents.taal_core import TaalCoreAgent
from typing import List
from datetime import datetime

router = APIRouter()
taal_core = TaalCoreAgent()

@router.post("/", response_model=TransactionResponse)
async def create_transaction(transaction: TransactionCreate, user_id: str = Query(...)):
    """Create a new transaction"""
    # TODO: Save to Supabase
    return {
        "id": "temp-id",
        "user_id": user_id,
        **transaction.dict(),
        "created_at": datetime.now()
    }

@router.get("/", response_model=List[TransactionResponse])
async def get_transactions(
    user_id: str = Query(...),
    type: str = Query(None),
    limit: int = Query(100, le=1000)
):
    """Get user transactions"""
    # TODO: Fetch from Supabase
    return []

@router.get("/pulse", response_model=FinancialPulseResponse)
async def get_financial_pulse(user_id: str = Query(...)):
    """Calculate and return financial pulse score"""
    # TODO: Fetch real data from Supabase
    # Mock data for now
    income_data = [
        {"amount": 50000, "date": "2024-01-15"},
        {"amount": 45000, "date": "2024-02-15"},
        {"amount": 55000, "date": "2024-03-15"},
    ]
    expense_data = [
        {"amount": 30000, "date": "2024-01-20"},
        {"amount": 28000, "date": "2024-02-20"},
        {"amount": 32000, "date": "2024-03-20"},
    ]

    pulse_score, metrics = taal_core.calculate_financial_pulse(income_data, expense_data)
    insights = taal_core.generate_insights(metrics)

    return {
        "score": pulse_score,
        "trend": metrics['trend'],
        "volatility": metrics['volatility'],
        "savings_rate": metrics['savings_rate'],
        "insights": insights
    }
