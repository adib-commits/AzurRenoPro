import Link from "next/link";

import { getServices } from "@/services/serviceApi";

export const instant = false;

export default async function ServicesPage() {
  const services = await getServices();

  const activeServices = services.filter((service) => service.active);

  return (
    <main className="bg-slate-50">
      {/* En-tête */}
      <section className="bg-slate-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-400">
            Notre savoir-faire
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Des services adaptés à
            <span className="text-amber-400"> votre projet.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Découvrez nos prestations de rénovation et d&apos;aménagement et
            trouvez la solution adaptée à vos besoins.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
                Nos prestations
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Comment pouvons-nous vous aider ?
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-600">
              Sélectionnez la prestation qui correspond à votre projet puis
              transmettez-nous votre demande de devis.
            </p>
          </div>

          {activeServices.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-semibold text-slate-600">
                Aucun service n&apos;est disponible pour le moment.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeServices.map((service, index) => (
                <article
                  key={service.id}
                  className="group flex min-h-80 flex-col rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 font-black text-amber-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                      Service
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-black text-slate-950">
                    {service.name}
                  </h2>

                  <p className="mt-4 flex-1 leading-7 text-slate-600">
                    {service.description ?? "Description à venir."}
                  </p>

                  <Link
                    href="/quote"
                    className="mt-8 inline-flex items-center font-black text-slate-950 transition group-hover:text-amber-600"
                  >
                    Demander un devis
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Accompagnement */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
              Votre projet
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Une démarche simple, du projet au rendez-vous.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              Notre plateforme vous permet de découvrir les prestations,
              présenter votre projet puis organiser facilement un rendez-vous.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Découvrez", "Consultez les prestations disponibles."],
              ["02", "Décrivez", "Présentez-nous votre projet en ligne."],
              ["03", "Planifiez", "Choisissez votre rendez-vous."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="font-black text-amber-600">{number}</span>

                <h3 className="mt-6 font-black text-slate-950">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-slate-950 px-8 py-12 text-white sm:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="font-bold text-amber-400">
                Votre projet commence ici
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Besoin d&apos;un devis personnalisé ?
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-400">
                Donnez-nous quelques informations sur votre projet afin de
                préparer votre demande.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="rounded-xl bg-amber-400 px-6 py-4 text-center font-black text-slate-950 transition hover:bg-amber-300"
              >
                Demander un devis
              </Link>

              <Link
                href="/appointment"
                className="rounded-xl border border-slate-700 px-6 py-4 text-center font-black text-white transition hover:bg-white/5"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
