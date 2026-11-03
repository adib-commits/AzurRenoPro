import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">
            Artisan Platform
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            Une plateforme simple pour découvrir nos services, demander
            un devis et planifier un rendez-vous.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Navigation</p>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/">Accueil</Link>
            <Link href="/services">Services</Link>
            <Link href="/quote">Demander un devis</Link>
            <Link href="/appointment">Prendre rendez-vous</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white">Contact</p>

          <p className="mt-4 text-sm text-gray-400">
            Contactez votre artisan pour discuter de votre projet.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-5 text-center text-sm text-gray-500">
        © 2026 Artisan Platform. Tous droits réservés.
      </div>
    </footer>
  );
}
