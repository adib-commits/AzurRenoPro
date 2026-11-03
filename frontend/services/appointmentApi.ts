import type {
  Appointment,
  AppointmentCreate,
} from "@/types/appointment";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function createAppointment(
  data: AppointmentCreate,
): Promise<Appointment> {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Impossible de créer le rendez-vous.");
  }

  return response.json();
}

export async function getAppointments(
  token: string,
): Promise<Appointment[]> {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les rendez-vous.");
  }

  return response.json();
}

export async function updateAppointmentStatus(
  appointmentId: number,
  status: string,
  token: string,
): Promise<Appointment> {
  const response = await fetch(
    `${API_URL}/appointments/${appointmentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Impossible de modifier le statut du rendez-vous.",
    );
  }

  return response.json();
}
