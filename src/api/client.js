export const API_URL = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  if (!API_URL) throw new Error("Missing VITE_API_URL in .env");

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      message = data?.message || JSON.stringify(data) || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}