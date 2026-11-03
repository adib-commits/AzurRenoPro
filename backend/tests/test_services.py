def create_test_service(client, auth_headers):
    response = client.post(
        "/services",
        json={
            "name": "Peinture intérieure",
            "description": "Travaux de peinture pour murs et plafonds",
            "active": True,
        },
        headers=auth_headers,
    )

    assert response.status_code == 201

    return response.json()


def test_create_service(client, auth_headers):
    response = client.post(
        "/services",
        json={
            "name": "Peinture intérieure",
            "description": "Travaux de peinture pour murs et plafonds",
            "active": True,
        },
        headers=auth_headers,
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Peinture intérieure"
    assert data["description"] == "Travaux de peinture pour murs et plafonds"
    assert data["active"] is True
    assert "id" in data


def test_get_services(client, auth_headers):
    service = create_test_service(client, auth_headers)

    response = client.get("/services")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["id"] == service["id"]
    assert data[0]["name"] == "Peinture intérieure"


def test_get_service_by_id(client, auth_headers):
    service = create_test_service(client, auth_headers)

    response = client.get(f"/services/{service['id']}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == service["id"]
    assert data["name"] == "Peinture intérieure"


def test_get_unknown_service(client):
    response = client.get("/services/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Service not found"


def test_update_service(client, auth_headers):
    service = create_test_service(client, auth_headers)

    response = client.patch(
        f"/services/{service['id']}",
        json={"active": False},
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["active"] is False
    assert data["name"] == "Peinture intérieure"
    assert data["description"] == "Travaux de peinture pour murs et plafonds"
