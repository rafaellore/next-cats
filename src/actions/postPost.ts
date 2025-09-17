export interface CreatePostInput {
  title: string;
  content: string;
  authorEmail?: string;
  file?: File;
}

export default async function createPost({
  title,
  content,
  authorEmail,
  file,
}: CreatePostInput) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorEmail", authorEmail || "");
    if (file) formData.append("file", file);

    const response = await fetch(process.env.API_URL + "/posts", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao criar post.");
    }

    const data = await response.json();
    return { data, ok: true, error: "" };
  } catch (error: any) {
    return {
      data: null,
      ok: false,
      error: error.message || "Erro desconhecido",
    };
  }
}
