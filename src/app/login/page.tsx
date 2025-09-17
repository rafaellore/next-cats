"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import loginAction from "@/actions/login";
import { useAuth } from "@/providers/authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAction(email, password);

      login(data.user);

      router.push("/");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Imagem lateral */}
      <div className="hidden md:block">
        <img
          src="/assets/login-cat-image.jpg"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Formulário */}
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 text-white font-semibold py-2 rounded-md hover:bg-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <a
              href="#"
              className="text-sm text-gray-500 hover:underline self-start"
            >
              Perdeu a senha?
            </a>
          </form>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Cadastre-se</h2>
            <p className="text-gray-600 mb-4">
              Ainda não possui conta? Cadastre-se no site.
            </p>
            <button className="bg-orange-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-500 transition">
              Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}