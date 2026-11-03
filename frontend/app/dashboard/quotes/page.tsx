"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getQuoteRequests,
  updateQuoteRequestStatus,
} from "@/services/quoteRequestApi";
import type { QuoteRequest } from "@/types/quoteRequest";

export default function QuotesPage() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadQuotes() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const data = await getQuoteRequests(token);
        setQuotes(data);
      } catch {
        localStorage.removeItem("access_token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadQuotes();
  }, [router]);

  async function handleStatusChange(
    quoteRequestId: number,
    status: string,
  ) {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setUpdatingId(quoteRequestId);
    setError("");

    try {
      const updatedQuote = await updateQuoteRequestStatus(
        quoteRequestId,
        status,
        token,
      );

      setQuotes((currentQuotes) =>
        currentQuotes.map((quote) =>
          quote.id === updatedQuote.id ? updatedQuote : quote,
        ),
      );
    } catch {
      localStorage.removeItem("access_token");
      router.replace("/login");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-slate-400">
            Chargement des demandes de devis...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">
          Espace artisan
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Demandes de devis
        </h1>

        <p className="mt-3 text-slate-400">
          Consultez et gérez les demandes envoyées par vos clients.
        </p>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!error && quotes.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Aucune demande de devis pour le moment.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6">
          {quotes.map((quote) => (
            <article
              key={quote.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="text-sm font-bold text-amber-400">
                    Demande #{quote.id}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {quote.customer_name}
                  </h2>

                  <p className="mt-1 text-slate-400">
                    {quote.work_type}
                  </p>
                </div>

                <span className="h-fit rounded-full bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-400">
                  {quote.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="mt-1 text-slate-200">
                    {quote.email}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Téléphone</p>
                  <p className="mt-1 text-slate-200">
                    {quote.phone}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Surface</p>
                  <p className="mt-1 text-slate-200">
                    {quote.surface !== null
                      ? `${quote.surface} m²`
                      : "Non renseignée"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Date</p>
                  <p className="mt-1 text-slate-200">
                    {new Date(
                      quote.created_at,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm text-slate-500">
                  Description
                </p>

                <p className="mt-2 leading-7 text-slate-300">
                  {quote.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  disabled={updatingId === quote.id}
                  onClick={() =>
                    handleStatusChange(quote.id, "accepted")
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Accepter
                </button>

                <button
                  type="button"
                  disabled={updatingId === quote.id}
                  onClick={() =>
                    handleStatusChange(quote.id, "rejected")
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Refuser
                </button>

                <button
                  type="button"
                  disabled={updatingId === quote.id}
                  onClick={() =>
                    handleStatusChange(quote.id, "completed")
                  }
                  className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Terminer
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
