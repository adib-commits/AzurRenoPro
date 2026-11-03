from app.core.security import hash_password
from app.models import User


def create_artisan(db):
    user = User(
        email="login@test.com",
        password_hash=hash_password("TestPassword123!"),
        role="artisan",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def test_login_success(client, db):
    create_artisan(db)

    response = client.post(
        "/auth/login",
        json={
            "email": "login@test.com",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, db):
    create_artisan(db)

    response = client.post(
        "/auth/login",
        json={
            "email": "login@test.com",
            "password": "WrongPassword",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


def test_login_unknown_user(client):
    response = client.post(
        "/auth/login",
        json={
            "email": "unknown@test.com",
            "password": "TestPassword123!",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


def test_private_route_without_token(client):
    response = client.get("/quote-requests")

    assert response.status_code == 401

def test_non_artisan_cannot_access_private_route(client, db):
    user = User(
        email="customer@test.com",
        password_hash=hash_password("TestPassword123!"),
        role="customer",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    login_response = client.post(
        "/auth/login",
        json={
            "email": "customer@test.com",
            "password": "TestPassword123!",
        },
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    response = client.get(
        "/quote-requests",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 403
    assert response.json()["detail"] == "Artisan access required"
