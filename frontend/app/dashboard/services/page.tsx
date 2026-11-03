"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/services/authApi";
import {
  createService,
  getServices,
  updateService,
} from "@/services/serviceApi";
import type { Service } from "@/types/service";

export default function ServicesManagementPage() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    async function loadServices() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await getCurrentUser(token);

        const data = await getServices();
        setServices(data);
      } catch {
        localStorage.removeItem("access_token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, [router]);

  async function handleCreateService() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (newName.trim().length < 2) {
      setError("Le nom du service doit contenir au moins 2 caractères.");
      return;
    }

    setCreating(true);
    setError("");

    try {
      const newService = await createService(
        {
          name: newName.trim(),
          description: newDescription.trim() || null,
          active: true,
        },
        token,
      );

      setServices((currentServices) => [
        ...currentServices,
        newService,
      ]);

      setNewName("");
      setNewDescription("");
    } catch {
      localStorage.removeItem("access_token");
      router.replace("/login");
    } finally {
      setCreating(false);
    }
  }

  function handleStartEdit(service: Service) {
    setEditingId(service.id);
    setEditName(service.name);
    setEditDescription(service.description ?? "");
    setError("");
  }

  async function handleSaveEdit(serviceId: number) {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (editName.trim().length < 2) {
      setError("Le nom du service doit contenir au moins 2 caractères.");
      return;
    }

    setUpdatingId(serviceId);
    setError("");

    try {
      const updatedService = await updateService(
        serviceId,
        {
          name: editName.trim(),
          description: editDescription.trim() || null,
        },
        token,
      );

      setServices((currentServices) =>
        currentServices.map((service) =>
          service.id === updatedService.id
            ? updatedService
            : service,
        ),
      );

      setEditingId(null);
      setEditName("");
      setEditDescription("");
    } catch {
      localStorage.removeItem("access_token");
      router.replace("/login");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleToggleActive(service: Service) {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setUpdatingId(service.id);
    setError("");

    try {
      const updatedService = await updateService(
        service.id,
        {
          active: !service.active,
        },
        token,
      );

      setServices((currentServices) =>
        currentServices.map((currentService) =>
          currentService.id === updatedService.id
            ? updatedService
            : currentService,
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
            Chargement des services...
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
          Gestion des services
        </h1>

        <p className="mt-3 text-slate-400">
          Consultez et gérez les services proposés à vos clients.
        </p>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">
            Ajouter un service
          </h2>

          <div className="mt-6 grid gap-4">
            <input
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Nom du service"
              className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            <textarea
              value={newDescription}
              onChange={(event) =>
                setNewDescription(event.target.value)
              }
              placeholder="Description du service"
              rows={4}
              className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            <div>
              <button
                type="button"
                disabled={creating}
                onClick={handleCreateService}
                className="rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
              >
                {creating ? "Création..." : "Ajouter le service"}
              </button>
            </div>
          </div>
        </div>

        {!error && services.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-slate-400">
              Aucun service pour le moment.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="text-sm font-bold text-amber-400">
                    Service #{service.id}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {service.name}
                  </h2>

                  <p className="mt-3 text-slate-400">
                    {service.description ?? "Aucune description"}
                  </p>
                </div>

                <span className="h-fit rounded-full bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-400">
                  {service.active ? "Actif" : "Inactif"}
                </span>
              </div>

              {editingId === service.id && (
                <div className="mt-6 grid gap-4 border-t border-white/10 pt-5">
                  <input
                    type="text"
                    value={editName}
                    onChange={(event) =>
                      setEditName(event.target.value)
                    }
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(event.target.value)
                    }
                    rows={4}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={updatingId === service.id}
                      onClick={() => handleSaveEdit(service.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                    >
                      Enregistrer
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => handleStartEdit(service)}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
                >
                  Modifier
                </button>

                <button
                  type="button"
                  disabled={updatingId === service.id}
                  onClick={() => handleToggleActive(service)}
                  className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-50"
                >
                  {service.active ? "Désactiver" : "Activer"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
