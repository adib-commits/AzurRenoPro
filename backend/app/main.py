from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.appointments import router as appointments_router
from app.api.quote_requests import router as quote_requests_router
from app.api.services import router as services_router
from app.api.auth import router as auth_router


app = FastAPI(
    title="Artisan Platform API",
    description="Backend API for the Artisan Platform",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(quote_requests_router)
app.include_router(appointments_router)
app.include_router(services_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Artisan Platform API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
