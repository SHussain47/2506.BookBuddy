import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../api/client.js";

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setStatus("loading");
        const data = await api("/books");
        if (!alive) return;
        setBooks(Array.isArray(data) ? data : []);
        setStatus("ready");
      } catch (err) {
        if (!alive) return;
        setError(err.message || "Failed to load books");
        setStatus("error");
      }
    })();
    return () => { alive = false; };
  }, []);

  if (status === "loading") return <p>Loading books…</p>;
  if (status === "error")   return <p role="alert">Error: {error}</p>;
  if (status === "ready" && books.length === 0) return <p>No books found.</p>;

  return (
    <>
      <h1>Catalog</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: "16px 0" }}>
        {books.map((b) => (
          <li
            key={b.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              gap: 12,
              padding: "12px 8px",
              borderBottom: "1px solid #eee",
            }}
          >
            <img
              src={b.coverimage}
              alt={`cover of ${b.title}`}
              style={{ width: 100, height: 120, objectFit: "cover", borderRadius: 4 }}
            />
            <div>
              <h2 style={{ margin: "0 0 6px 0" }}>
                <NavLink to={`/books/${b.id}`}>{b.title}</NavLink>
              </h2>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{b.author}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
                {b.available ? "Available" : "Reserved"}
              </div>
              <p style={{ margin: 0 }}>
                {b.description?.slice(0, 180)}
                {b.description && b.description.length > 180 ? "…" : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
