"use client";

import createPost from "@/actions/postPost";
import { useAuth } from "@/providers/authContext";
import { useState, FormEvent, ChangeEvent } from "react";

export default function CreatePostPage() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await createPost({ title, content, file: file || undefined, authorEmail: user?.email });

    if (result.ok) {
      setMessage("Post criado com sucesso!");
      setTitle("");
      setContent("");
      setFile(null);
    } else {
      setMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Conteúdo</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          rows={4}
          required
        />
      </div>

      <div className="hidden">
        <label className="block mb-1 font-semibold">Email do Autor</label>
        <input
          type="email"
          value={user?.email}
          disabled
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Imagem</label>

        {/* Container customizado */}
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          {file ? (
            <span className="text-gray-700">{file.name}</span>
          ) : (
            <span className="text-gray-400">Clique ou arraste a imagem aqui</span>
          )}
        </label>

        {/* Input real escondido */}
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>



      <button
        type="submit"
        disabled={loading || !title || !content}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Criar Post"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}
