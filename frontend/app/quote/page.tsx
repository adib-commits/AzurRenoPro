"use client";

import { FormEvent, useEffect, useState } from "react";

import { createQuoteRequest } from "@/services/quoteRequestApi";
import { getServices } from "@/services/serviceApi";
import type { Service } from "@/types/service";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10";

const labelClass = "mb-2 block text-sm font-bold text-slate-800";

export default function QuotePage() {
  const [services, setServices] = useState<Service[]>([]);

  const [serviceId, setServiceId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workType, setWorkType] = useState("");
  const [surface, setSurface] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data.filter((service) => service.active));
      } catch {
        setError("Impossible de charger les services.");
      }
    }

    loadServices();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await createQuoteRequest({
        service_id: Number(serviceId),
        customer_name: customerName,
        email,
        phone,
        work_type: workType,
        surface: surface ? Number(surface) : null,
        description,
      });

      setMessage("Votre demande de devis a bien été envoyée.");

      setServiceId("");
      setCustomerName("");
      setEmail("");
      setPhone("");
      setWorkType("");
      setSurface("");
      setDescription("");
    } catch {
      setError(
        "Une erreur est survenue lors de l'envoi de votre demande.",
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
            Votre projet
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Demandez votre devis
            <span className="text-amber-400"> personnalisé.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Décrivez-nous votre projet de rénovation. Ces quelques
            informations nous permettront de mieux comprendre vos besoins.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          {/* Colonne gauche */}
          <aside>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
              Comment ça marche ?
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
              Une demande simple et rapide
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Remplissez le formulaire avec les informations principales
              concernant votre projet.
            </p>

            <div className="mt-10 space-y-4">
              {[
                [
                  "01",
                  "Choisissez votre service",
                  "Sélectionnez la prestation correspondant à votre projet.",
                ],
                [
                  "02",
                  "Décrivez vos besoins",
                  "Indiquez le type de travaux, la surface et les informations utiles.",
                ],
                [
                  "03",
                  "Envoyez votre demande",
                  "Votre demande est enregistrée afin de pouvoir être étudiée.",
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
              <p className="font-bold">Besoin d&apos;échanger directement ?</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Vous pouvez également planifier un rendez-vous depuis notre
                plateforme.
              </p>

              <a
                href="/appointment"
                className="mt-5 inline-block font-bold text-amber-400 transition hover:text-amber-300"
              >
                Prendre rendez-vous →
              </a>
            </div>
          </aside>

          {/* Formulaire */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="border-b border-slate-100 pb-7">
              <p className="text-sm font-bold text-amber-600">
                DEMANDE DE DEVIS
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Parlez-nous de votre projet
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Les champs ci-dessous nous permettent de préparer votre
                demande.
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

              {/* Projet */}
              <fieldset>
                <legend className="mb-5 text-lg font-black text-slate-950">
                  Votre projet
                </legend>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Service souhaité
                  </label>

                  <select
                    id="service"
                    value={serviceId}
                    onChange={(event) => setServiceId(event.target.value)}
                    required
                    className={inputClass}
                  >
                    <option value="">Sélectionnez un service</option>

                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="workType" className={labelClass}>
                      Type de travaux
                    </label>

                    <input
                      id="workType"
                      type="text"
                      value={workType}
                      onChange={(event) => setWorkType(event.target.value)}
                      minLength={2}
                      maxLength={100}
                      required
                      placeholder="Ex : peinture intérieure"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="surface" className={labelClass}>
                      Surface estimée
                      <span className="ml-1 font-normal text-slate-400">
                        (optionnel)
                      </span>
                    </label>

                    <div className="relative">
                      <input
                        id="surface"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={surface}
                        onChange={(event) => setSurface(event.target.value)}
                        placeholder="50"
                        className={`${inputClass} pr-14`}
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                        m²
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="description" className={labelClass}>
                    Description du projet
                  </label>

                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    minLength={5}
                    required
                    rows={6}
                    placeholder="Décrivez les travaux souhaités, les pièces concernées et toute information utile..."
                    className={`${inputClass} resize-y`}
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Plus votre description est précise, plus votre demande
                    pourra être étudiée efficacement.
                  </p>
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
                {loading ? "Envoi en cours..." : "Envoyer ma demande →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
