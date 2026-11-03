def create_test_appointment(client):
    response = client.post(
        "/appointments",
        json={
            "customer_name": "Marie Test",
            "email": "marie.test@example.com",
            "phone": "0611223344",
            "appointment_date": "2026-10-20",
            "appointment_time": "14:30:00",
        },
    )

    assert response.status_code == 201

    return response.json()


def test_create_appointment(client):
    response = client.post(
        "/appointments",
        json={
            "customer_name": "Marie Test",
            "email": "marie.test@example.com",
            "phone": "0611223344",
            "appointment_date": "2026-10-20",
            "appointment_time": "14:30:00",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["customer_name"] == "Marie Test"
    assert data["email"] == "marie.test@example.com"
    assert data["status"] == "pending"
    assert "id" in data
    assert "created_at" in data


def test_get_appointments(client, auth_headers):
    appointment = create_test_appointment(client)

    response = client.get(
        "/appointments",
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["id"] == appointment["id"]
    assert data[0]["customer_name"] == "Marie Test"


def test_get_appointment_by_id(client, auth_headers):
    appointment = create_test_appointment(client)

    response = client.get(
        f"/appointments/{appointment['id']}",
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == appointment["id"]
    assert data["customer_name"] == "Marie Test"


def test_get_unknown_appointment(client, auth_headers):
    response = client.get(
        "/appointments/999",
        headers=auth_headers,
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Appointment not found"


def test_update_appointment_status(client, auth_headers):
    appointment = create_test_appointment(client)

    response = client.patch(
        f"/appointments/{appointment['id']}",
        json={"status": "confirmed"},
        headers=auth_headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == appointment["id"]
    assert data["status"] == "confirmed"


def test_reject_invalid_appointment_status(client, auth_headers):
    appointment = create_test_appointment(client)

    response = client.patch(
        f"/appointments/{appointment['id']}",
        json={"status": "bonjour"},
        headers=auth_headers,
    )

    assert response.status_code == 422
