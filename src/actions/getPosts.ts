"use server";

import { Post } from "@/types/Photo.entity";

export default async function getPosts(optionsFront?: RequestInit) {
  try {
    const response = await fetch(process.env.API_URL + "/posts", {
      next: { revalidate: 0 },
    });

    if (!response.ok) throw new Error("Erro ao pegar as fotos.");

    const data = (await response.json()) as Post[];
    return { data, ok: true, error: "" };
  } catch (error) {
    throw new Error("Erro ao pegar as fotos.");
  }
}
