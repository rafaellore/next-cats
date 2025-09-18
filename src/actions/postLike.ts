"use server";

export default async function postLike(postId: number, userId: number) {
  try {
    const response = await fetch(
      process.env.API_URL + `/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao dar/remover like.");
    }

    const data = await response.json();

    console.log(data);
    return { data, ok: true, error: "" };
  } catch (error: any) {
    return {
      data: null,
      ok: false,
      error: error.message || "Erro desconhecido",
    };
  }
}
