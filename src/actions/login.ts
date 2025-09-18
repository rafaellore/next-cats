"use server";

export default async function loginAction(email: string, password: string) {
  try {
    const res = await fetch(process.env.API_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
