from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from typing import Literal

class QuoteRequestCreate(BaseModel):
    service_id: int
    customer_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=30)
    work_type: str = Field(min_length=2, max_length=100)
    surface: float | None = Field(default=None, gt=0)
    description: str = Field(min_length=5)


class QuoteRequestResponse(QuoteRequestCreate):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class QuoteRequestStatusUpdate(BaseModel):
    status: Literal["pending", "accepted", "rejected", "completed"]
