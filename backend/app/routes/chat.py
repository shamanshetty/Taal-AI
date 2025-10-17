from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import ChatRequest, ChatResponse
from app.agents.coach_agent import CoachAgent
from datetime import datetime

router = APIRouter()
coach = CoachAgent()

@router.post("/message", response_model=ChatResponse)
async def send_message(request: ChatRequest, user_id: str = Query(...)):
    """Send a message to the AI coach"""
    try:
        # TODO: Fetch user context from database
        context = {
            "pulse_score": 75,
            "avg_income": 50000,
            "avg_expense": 30000,
            "volatility": 0.15
        }

        response_text = coach.generate_advice(
            user_message=request.message,
            context=context,
            language=request.language
        )

        # TODO: If use_voice is True, generate audio using TTS
        audio_url = None
        if request.use_voice:
            # audio_url = await generate_tts(response_text, request.language)
            pass

        return {
            "response": response_text,
            "audio_url": audio_url,
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/daily-nudge")
async def get_daily_nudge(user_id: str = Query(...)):
    """Get daily financial nudge"""
    # TODO: Fetch user data from database
    user_data = {
        "pulse_score": 75,
        "avg_income": 50000,
        "savings_rate": 25.0,
        "trend": "up"
    }

    nudge = coach.generate_daily_nudge(user_data)

    return {
        "nudge": nudge,
        "timestamp": datetime.now()
    }
