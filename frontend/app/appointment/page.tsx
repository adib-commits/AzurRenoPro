"use client";

import { FormEvent, useState } from "react";

import { createAppointment } from "@/services/appointmentApi";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-950 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10";

const labelClass = "mb-2 block text-sm font-bold text-slate-800";

export default function AppointmentPage() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await createAppointment({
        customer_name: customerName,
        email,
        phone,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
      });

      setMessage("Votre rendez-vous a bien été enregistré.");

      setCustomerName("");
      setEmail("");
      setPhone("");
      setAppointmentDate("");
      setAppointmentTime("");
    } catch {
      setError(
        "Une erreur est survenue lors de la prise de rendez-vous.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-slate-50">
      {/* En-tête */}
      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">
            Planifier une intervention
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Choisissez votre
            <span className="text-amber-400"> rendez-vous.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Sélectionnez la date et l&apos;heure qui vous conviennent pour
            planifier un échange concernant votre projet.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          {/* Informations */}
          <aside>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
              Votre rendez-vous
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Planifiez votre échange simplement
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Renseignez vos coordonnées puis choisissez la date et
              l&apos;heure souhaitées pour votre rendez-vous.
            </p>

            <div className="mt-10 space-y-4">
              {[
                [
                  "01",
                  "Vos coordonnées",
                  "Indiquez vos informations afin de pouvoir vous identifier.",
                ],
                [
                  "02",
                  "Choisissez une date",
                  "Sélectionnez le jour qui correspond à vos disponibilités.",
                ],
                [
                  "03",
                  "Choisissez une heure",
                  "Définissez l'heure souhaitée puis confirmez votre demande.",
                ],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 font-black text-slate-950">
                    {number}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
              <p className="font-bold">
                Vous souhaitez d&apos;abord obtenir un devis ?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Présentez-nous votre projet grâce à notre formulaire de
                demande de devis.
              </p>

              <a
                href="/quote"
                className="mt-5 inline-block font-bold text-amber-400 transition hover:text-amber-300"
              >
                Demander un devis →
              </a>
            </div>
          </aside>

          {/* Formulaire */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="border-b border-slate-100 pb-7">
              <p className="text-sm font-bold text-amber-600">
                RENDEZ-VOUS
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Planifiez votre rendez-vous
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Complétez vos informations et choisissez le créneau
                souhaité.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-7">
              {/* Coordonnées */}
              <fieldset>
                <legend className="mb-5 text-lg font-black text-slate-950">
                  Vos coordonnées
                </legend>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="customerName" className={labelClass}>
                      Nom complet
                    </label>

                    <input
                      id="customerName"
                      type="text"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                      minLength={2}
                      maxLength={100}
                      required
                      placeholder="Jean Dupont"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Téléphone
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      minLength={5}
                      maxLength={30}
                      required
                      placeholder="06 00 00 00 00"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="email" className={labelClass}>
                    Adresse email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="exemple@email.fr"
                    className={inputClass}
                  />
                </div>
              </fieldset>

              <div className="border-t border-slate-100" />

              {/* Créneau */}
              <fieldset>
                <legend className="mb-5 text-lg font-black text-slate-950">
                  Choisissez votre créneau
                </legend>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="appointmentDate" className={labelClass}>
                      Date souhaitée
                    </label>

                    <input
                      id="appointmentDate"
                      type="date"
                      value={appointmentDate}
                      onChange={(event) =>
                        setAppointmentDate(event.target.value)
                      }
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="appointmentTime" className={labelClass}>
                      Heure souhaitée
                    </label>

                    <input
                      id="appointmentTime"
                      type="time"
                      value={appointmentTime}
                      onChange={(event) =>
                        setAppointmentTime(event.target.value)
                      }
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 font-black text-slate-950">
                      i
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        Votre demande de rendez-vous
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Une fois le formulaire envoyé, votre rendez-vous sera
                        enregistré dans la plateforme.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Messages */}
              {message && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700"
                >
                  ✓ {message}
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-400 px-6 py-4 font-black text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading
                  ? "Enregistrement..."
                  : "Confirmer le rendez-vous →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
