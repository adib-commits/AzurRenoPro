"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAppointments,
  updateAppointmentStatus,
} from "@/services/appointmentApi";
import type { Appointment } from "@/types/appointment";

export default function AppointmentsPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadAppointments() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const data = await getAppointments(token);
        setAppointments(data);
      } catch {
        localStorage.removeItem("access_token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, [router]);

  async function handleStatusChange(
    appointmentId: number,
    status: string,
  ) {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setUpdatingId(appointmentId);
    setError("");

    try {
      const updatedAppointment = await updateAppointmentStatus(
        appointmentId,
        status,
        token,
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment,
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
            Chargement des rendez-vous...
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
          Rendez-vous
        </h1>

        <p className="mt-3 text-slate-400">
          Consultez et gérez les rendez-vous de vos clients.
        </p>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!error && appointments.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Aucun rendez-vous pour le moment.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6">
          {appointments.map((appointment) => (
            <article
              key={appointment.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="text-sm font-bold text-amber-400">
                    Rendez-vous #{appointment.id}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {appointment.customer_name}
                  </h2>
                </div>

                <span className="h-fit rounded-full bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-400">
                  {appointment.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 text-slate-200">
                    {appointment.email}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Téléphone
                  </p>
                  <p className="mt-1 text-slate-200">
                    {appointment.phone}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Date
                  </p>
                  <p className="mt-1 text-slate-200">
                    {new Date(
                      `${appointment.appointment_date}T00:00:00`,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Heure
                  </p>
                  <p className="mt-1 text-slate-200">
                    {appointment.appointment_time}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  disabled={updatingId === appointment.id}
                  onClick={() =>
                    handleStatusChange(
                      appointment.id,
                      "confirmed",
                    )
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Confirmer
                </button>

                <button
                  type="button"
                  disabled={updatingId === appointment.id}
                  onClick={() =>
                    handleStatusChange(
                      appointment.id,
                      "cancelled",
                    )
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  disabled={updatingId === appointment.id}
                  onClick={() =>
                    handleStatusChange(
                      appointment.id,
                      "completed",
                    )
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
