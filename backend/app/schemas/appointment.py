from datetime import date, datetime, time
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AppointmentCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=30)
    appointment_date: date
    appointment_time: time


class AppointmentResponse(AppointmentCreate):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AppointmentStatusUpdate(BaseModel):
    status: Literal["pending", "confirmed", "cancelled", "completed"]
