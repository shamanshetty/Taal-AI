from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import GoalCreate, GoalUpdate, GoalResponse
from typing import List
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=GoalResponse)
async def create_goal(goal: GoalCreate, user_id: str = Query(...)):
    """Create a new financial goal"""
    # TODO: Save to Supabase
    return {
        "id": "temp-id",
        "user_id": user_id,
        **goal.dict(),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }

@router.get("/", response_model=List[GoalResponse])
async def get_goals(user_id: str = Query(...)):
    """Get user's financial goals"""
    # TODO: Fetch from Supabase
    return []

@router.patch("/{goal_id}", response_model=GoalResponse)
async def update_goal(goal_id: str, goal: GoalUpdate):
    """Update a financial goal"""
    # TODO: Update in Supabase
    raise HTTPException(status_code=501, detail="Not implemented")

@router.delete("/{goal_id}")
async def delete_goal(goal_id: str):
    """Delete a financial goal"""
    # TODO: Delete from Supabase
    return {"message": "Goal deleted successfully"}
