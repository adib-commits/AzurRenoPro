import os


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://artisan:artisan@localhost:5432/artisan_db",
)

JWT_SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "dev-secret-key-change-in-production",
)

JWT_ALGORITHM = "HS256"

JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60
