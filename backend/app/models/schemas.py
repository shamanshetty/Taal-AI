from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, Literal
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    created_at: datetime
    updated_at: datetime

# Transaction Schemas
class TransactionBase(BaseModel):
    type: Literal["income", "expense"]
    amount: float = Field(gt=0)
    category: str
    description: Optional[str] = None
    date: datetime

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    created_at: datetime

# Goal Schemas
class GoalBase(BaseModel):
    title: str
    target_amount: float = Field(gt=0)
    current_amount: float = Field(ge=0, default=0)
    deadline: Optional[datetime] = None

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    title: Optional[str] = None
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None
    deadline: Optional[datetime] = None

class GoalResponse(GoalBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

# Financial Pulse Schema
class FinancialPulseResponse(BaseModel):
    score: int = Field(ge=0, le=100)
    trend: Literal["up", "down", "stable"]
    volatility: float
    savings_rate: float
    insights: list

# Chat Schemas
class ChatRequest(BaseModel):
    message: str
    use_voice: bool = False
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    audio_url: Optional[str] = None
    timestamp: datetime

# What-If Scenario Schema
class WhatIfRequest(BaseModel):
    purchase_amount: float = Field(gt=0)
    purchase_description: str

class WhatIfResponse(BaseModel):
    purchase_amount: float
    purchase_description: str
    impact: dict
    recommendation: str
    chart_data: list

# Tax Insights Schema
class TaxInsightResponse(BaseModel):
    estimated_tax: float
    quarter: str
    breakdown: dict
    suggestions: list

# Income Source Schema
class IncomeSourceBase(BaseModel):
    source_name: str
    source_type: Literal["monthly", "freelance", "gig", "other"]
    amount: float = Field(gt=0)
    frequency: Literal["one-time", "weekly", "monthly", "quarterly"]

class IncomeSourceCreate(IncomeSourceBase):
    pass

class IncomeSourceResponse(IncomeSourceBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    created_at: datetime
