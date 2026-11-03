import type {
  QuoteRequest,
  QuoteRequestCreate,
} from "@/types/quoteRequest";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function createQuoteRequest(
  data: QuoteRequestCreate,
): Promise<QuoteRequest> {
  const response = await fetch(`${API_URL}/quote-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Impossible d'envoyer la demande de devis.");
  }

  return response.json();
}
export async function getQuoteRequests(
  token: string,
): Promise<QuoteRequest[]> {
  const response = await fetch(`${API_URL}/quote-requests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les demandes de devis.");
  }

  return response.json();
}

export async function updateQuoteRequestStatus(
  quoteRequestId: number,
  status: string,
  token: string,
): Promise<QuoteRequest> {
  const response = await fetch(
    `${API_URL}/quote-requests/${quoteRequestId}`,
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
      "Impossible de modifier le statut de la demande de devis.",
    );
  }

  return response.json();
}
