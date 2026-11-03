import type {
  Service,
  ServiceCreate,
  ServiceUpdate,
} from "@/types/service";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les services.");
  }

  return response.json();
}

export async function createService(
  data: ServiceCreate,
  token: string,
): Promise<Service> {
  const response = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Impossible de créer le service.");
  }

  return response.json();
}

export async function updateService(
  serviceId: number,
  data: ServiceUpdate,
  token: string,
): Promise<Service> {
  const response = await fetch(`${API_URL}/services/${serviceId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Impossible de modifier le service.");
  }

  return response.json();
}
