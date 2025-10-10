const BASE = import.meta.env.VITE_API_URL;

export async function api(
  path,
  { method = "GET", body, headers, ...rest } = {}
) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    let msg;
    try {
      msg = await res.text();
    } catch {
      msg = res.statusText;
    }
    throw new Error(`Request failed: ${res.status} ${msg}`);
  }

  return res.json();
}