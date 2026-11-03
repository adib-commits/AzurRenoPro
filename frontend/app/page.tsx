
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Peinture",
    description:
      "Rafraîchissement, rénovation et mise en peinture de vos espaces intérieurs et extérieurs.",
    href: "/quote?category=peinture",
  },
  {
    number: "02",
    title: "Rénovation",
    description:
      "Des travaux adaptés pour moderniser, rénover et valoriser votre logement.",
    href: "/quote?category=renovation",
  },
  {
    number: "03",
    title: "Aménagement",
    description:
      "Des solutions fonctionnelles pour transformer et optimiser vos espaces.",
    href: "/quote?category=amenagement",
  },
];

const advantages = [
  "Devis personnalisé",
  "Échange simple et rapide",
  "Suivi de votre projet",
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-7 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
              Artisan rénovation & aménagement
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Donnez une nouvelle vie à{" "}
              <span className="text-amber-400">
                votre intérieur.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              AzurRenoPro vous accompagne dans vos projets de rénovation,
              peinture et aménagement avec une prise de contact simple,
              un devis personnalisé et un rendez-vous rapide.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="rounded-xl bg-amber-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Demander un devis
              </Link>

              <Link
                href="/services"
                className="rounded-xl border border-slate-700 px-7 py-4 text-center font-bold text-white transition hover:border-slate-500 hover:bg-white/5"
              >
                Découvrir nos services
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
              {advantages.map((advantage) => (
                <div
                  key={advantage}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-slate-950">
                    ✓
                  </span>
                  {advantage}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-amber-400">
                    VOTRE PROJET
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Une démarche simple
                  </h2>
                </div>

                <span className="text-5xl font-black text-white/10">
                  AR
                </span>
              </div>

              <div className="space-y-5">
                {[
                  ["01", "Présentez votre projet"],
                  ["02", "Recevez un devis adapté"],
                  ["03", "Planifiez votre rendez-vous"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="flex items-center gap-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
                  >
                    <span className="text-xl font-black text-amber-400">
                      {number}
                    </span>

                    <p className="font-semibold text-slate-100">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/appointment"
                className="mt-8 block rounded-xl bg-amber-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-500"
              >
                Planifier un rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
                Notre savoir-faire
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Des solutions pour chaque projet
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-600">
              De la peinture à la rénovation, nous vous accompagnons pour
              améliorer votre habitat avec des prestations adaptées.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
              >
                <span className="text-sm font-black text-amber-600">
                  {service.number}
                </span>

                <h3 className="mt-8 text-2xl font-black text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex font-bold text-slate-950 transition group-hover:text-amber-600"
                >
                  En savoir plus →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-600">
              Pourquoi AzurRenoPro ?
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              Votre projet, simplement.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Notre plateforme facilite les premières étapes de votre projet.
              Consultez les prestations, décrivez vos besoins et choisissez
              directement un créneau de rendez-vous.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950 p-7 text-white">
              <p className="text-3xl font-black text-amber-400">
                01
              </p>

              <h3 className="mt-8 text-xl font-bold">
                Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Des formulaires clairs pour présenter rapidement votre projet.
              </p>
            </div>

            <div className="rounded-3xl bg-amber-400 p-7 text-slate-950">
              <p className="text-3xl font-black">
                02
              </p>

              <h3 className="mt-8 text-xl font-bold">
                Rapide
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-800">
                Envoyez votre demande et planifiez votre rendez-vous en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-8 py-14 text-white sm:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="font-bold text-amber-400">
                Vous avez un projet ?
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Parlons de votre rénovation.
              </h2>

              <p className="mt-3 text-slate-400">
                Décrivez vos besoins et commencez votre demande en quelques
                minutes.
              </p>
            </div>

            <Link
              href="/quote"
              className="rounded-xl bg-amber-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Obtenir un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
