"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/quote", label: "Demander un devis" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-lg font-black text-amber-400">
            AR
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">
              AzurRenoPro
            </p>

            <p className="text-xs font-medium text-slate-500">
              Rénovation & aménagement
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-amber-600"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/login"
            className="text-sm font-semibold text-slate-600 transition hover:text-amber-600"
          >
            Espace artisan
          </Link>

          <Link
            href="/appointment"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-500"
          >
            Prendre rendez-vous
          </Link>
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl text-slate-950 md:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Navigation mobile */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Espace artisan
            </Link>

            <Link
              href="/appointment"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-amber-400 px-4 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-500"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
