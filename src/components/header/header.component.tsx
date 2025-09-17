"use client";

import CatLogoIcon from "@/icons/cat-logo-icon";
import { useAuth } from "@/providers/authContext";
import Link from "next/link";

import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <nav className="flex justify-between items-center h-16 max-w-[50rem] mx-auto">
        <div className="py-2">
          <Link href="/" className="text-xl font-bold">
            <CatLogoIcon />
          </Link>
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 text-gray-700 hover:text-black"
            >
              <span>Olá, {user.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                <Link
                  href="/post"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Postar
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-gray-800 flex items-center hover:text-black"
          >
            Login / Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}
