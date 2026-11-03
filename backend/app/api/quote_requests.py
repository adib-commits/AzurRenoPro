from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_artisan
from app.db.database import get_db
from app.models import User
from app.models.quote_request import QuoteRequest
from app.schemas.quote_request import (
    QuoteRequestCreate,
    QuoteRequestResponse,
    QuoteRequestStatusUpdate,
)


router = APIRouter(
    prefix="/quote-requests",
    tags=["Quote Requests"],
)


@router.post(
    "",
    response_model=QuoteRequestResponse,
    status_code=201,
)
def create_quote_request(
    quote_request: QuoteRequestCreate,
    db: Session = Depends(get_db),
):
    new_quote_request = QuoteRequest(**quote_request.model_dump())

    db.add(new_quote_request)
    db.commit()
    db.refresh(new_quote_request)

    return new_quote_request


@router.get(
    "",
    response_model=list[QuoteRequestResponse],
)
def get_quote_requests(
    db: Session = Depends(get_db),
    current_artisan: User = Depends(get_current_artisan),
):
    return db.query(QuoteRequest).all()


@router.get(
    "/{quote_request_id}",
    response_model=QuoteRequestResponse,
)
def get_quote_request(
    quote_request_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_artisan),
):
    quote_request = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.id == quote_request_id)
        .first()
    )

    if quote_request is None:
        raise HTTPException(
            status_code=404,
            detail="Quote request not found",
        )

    return quote_request


@router.patch(
    "/{quote_request_id}",
    response_model=QuoteRequestResponse,
)
def update_quote_request_status(
    quote_request_id: int,
    status_update: QuoteRequestStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_artisan),
):
    quote_request = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.id == quote_request_id)
        .first()
    )

    if quote_request is None:
        raise HTTPException(
            status_code=404,
            detail="Quote request not found",
        )

    quote_request.status = status_update.status

    db.commit()
    db.refresh(quote_request)

    return quote_request
