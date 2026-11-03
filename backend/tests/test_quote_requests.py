from app.models import Service


def test_create_quote_request(client, db):
    service = Service(
        name="Peinture",
        description="Travaux de peinture intérieure",
        active=True,
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    response = client.post(
        "/quote-requests",
        json={
            "service_id": service.id,
            "customer_name": "Jean Test",
            "email": "jean.test@example.com",
            "phone": "0612345678",
            "work_type": "Peinture intérieure",
            "surface": 45,
            "description": "Peinture du salon et des chambres",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["customer_name"] == "Jean Test"
    assert data["email"] == "jean.test@example.com"
    assert data["status"] == "pending"
    assert data["service_id"] == service.id
    assert "id" in data
    assert "created_at" in data


def create_test_service(db):
    service = Service(
        name="Peinture",
        description="Travaux de peinture intérieure",
        active=True,
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


def create_test_quote(client, db):
    service = create_test_service(db)

    response = client.post(
        "/quote-requests",
        json={
            "service_id": service.id,
            "customer_name": "Jean Test",
            "email": "jean.test@example.com",
            "phone": "0612345678",
            "work_type": "Peinture intérieure",
            "surface": 45,
            "description": "Peinture du salon et des chambres",
        },
    )

    assert response.status_code == 201

    return response.json()


def test_get_quote_requests(client, db, auth_headers):
    quote = create_test_quote(client, db)

    response = client.get(
        "/quote-requests",
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["id"] == quote["id"]
    assert data[0]["customer_name"] == "Jean Test"


def test_get_quote_request_by_id(client, db, auth_headers):
    quote = create_test_quote(client, db)

    response = client.get(
        f"/quote-requests/{quote['id']}",
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == quote["id"]
    assert data["customer_name"] == "Jean Test"


def test_get_unknown_quote_request(client, auth_headers):
    response = client.get(
        "/quote-requests/999",
        headers=auth_headers,
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Quote request not found"


def test_update_quote_request_status(client, db, auth_headers):
    quote = create_test_quote(client, db)

    response = client.patch(
        f"/quote-requests/{quote['id']}",
        json={"status": "accepted"},
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == quote["id"]
    assert data["status"] == "accepted"


def test_reject_invalid_quote_status(client, db, auth_headers):
    quote = create_test_quote(client, db)

    response = client.patch(
        f"/quote-requests/{quote['id']}",
        json={"status": "bonjour"},
        headers=auth_headers,
    )

    assert response.status_code == 422
