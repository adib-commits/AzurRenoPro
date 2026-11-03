"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAppointments } from "@/services/appointmentApi";
import { getQuoteRequests } from "@/services/quoteRequestApi";
import { getServices } from "@/services/serviceApi";

export default function DashboardPage() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [totalQuotes, setTotalQuotes] = useState(0);
  const [pendingQuotes, setPendingQuotes] = useState(0);
  const [acceptedQuotes, setAcceptedQuotes] = useState(0);

  const [totalAppointments, setTotalAppointments] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [confirmedAppointments, setConfirmedAppointments] = useState(0);

  const [totalServices, setTotalServices] = useState(0);
  const [activeServices, setActiveServices] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const [quotes, appointments, services] = await Promise.all([
          getQuoteRequests(token),
          getAppointments(token),
          getServices(),
        ]);

        setAuthorized(true);

        setTotalQuotes(quotes.length);

        setPendingQuotes(
          quotes.filter((quote) => quote.status === "pending").length,
        );

        setAcceptedQuotes(
          quotes.filter((quote) => quote.status === "accepted").length,
        );

        setTotalAppointments(appointments.length);

        setPendingAppointments(
          appointments.filter(
            (appointment) => appointment.status === "pending",
          ).length,
        );

        setConfirmedAppointments(
          appointments.filter(
            (appointment) => appointment.status === "confirmed",
          ).length,
        );

        setTotalServices(services.length);

        setActiveServices(
          services.filter((service) => service.active).length,
        );
      } catch {
        localStorage.removeItem("access_token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    setAuthorized(false);
    router.replace("/login");
  }

  if (!authorized) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Vérification de la connexion...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">
              Espace artisan
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Tableau de bord
            </h1>

            <p className="mt-3 text-slate-400">
              Bienvenue dans votre espace de gestion AzurRenoPro.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3 font-bold text-red-300 transition hover:bg-red-500/20"
          >
            Déconnexion
          </button>
        </div>

        {loading ? (
          <p className="mt-10 text-slate-400">
            Chargement des statistiques...
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Devis */}
            <Link
              href="/dashboard/quotes"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/50 hover:bg-white/10"
            >
              <p className="text-sm font-bold text-amber-400">
                Devis
              </p>

              <p className="mt-4 text-4xl font-black">
                {totalQuotes}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                demande(s) au total
              </p>

              <div className="mt-4 space-y-1">
                <p className="font-bold text-green-400">
                  {acceptedQuotes} accepté(s)
                </p>

                <p className="font-bold text-white">
                  {pendingQuotes} en attente
                </p>
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Consulter et gérer les demandes de devis.
              </p>
            </Link>

            {/* Rendez-vous */}
            <Link
              href="/dashboard/appointments"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/50 hover:bg-white/10"
            >
              <p className="text-sm font-bold text-amber-400">
                Rendez-vous
              </p>

              <p className="mt-4 text-4xl font-black">
                {totalAppointments}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                rendez-vous au total
              </p>

              <div className="mt-4 space-y-1">
                <p className="font-bold text-green-400">
                  {confirmedAppointments} confirmé(s)
                </p>

                <p className="font-bold text-white">
                  {pendingAppointments} en attente
                </p>
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Consulter et gérer les rendez-vous clients.
              </p>
            </Link>

            {/* Services */}
            <Link
              href="/dashboard/services"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/50 hover:bg-white/10"
            >
              <p className="text-sm font-bold text-amber-400">
                Services
              </p>

              <p className="mt-4 text-4xl font-black">
                {totalServices}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                service(s) au total
              </p>

              <p className="mt-4 font-bold text-white">
                {activeServices} actif(s)
              </p>

              <p className="mt-5 text-sm text-slate-400">
                Ajouter, modifier et gérer les services.
              </p>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
