// src/books/Catalog.jsx
import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { api } from "../api/client.js";
import SearchBar from "./SearchBar.jsx";

/** Debounce any value by `delay` ms. */
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [q, setQ] = useState(initialQ);
  const debouncedQ = useDebouncedValue(q, 300);

  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | empty | error
  const [error, setError] = useState("");

  // keep ?q= in the URL in sync with the input
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (q) next.set("q", q);
    else next.delete("q");
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // fetch the full catalog, then client-filter by debounced query
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setStatus("loading");
      setError("");

      try {
        // always fetch all; API doesn’t filter reliably with ?search=
        const data = await api("/books");
        if (cancelled) return;

        // client-side filter (title or author, case-insensitive)
        const norm = (s) => (s ? String(s).toLowerCase() : "");
        const term = norm(debouncedQ);

        const filtered = term
          ? data.filter(
              (b) => norm(b.title).includes(term) || norm(b.author).includes(term)
            )
          : data;

        if (!Array.isArray(filtered) || filtered.length === 0) {
          setBooks([]);
          setStatus("empty");
        } else {
          setBooks(filtered);
          setStatus("ready");
        }
      } catch (err) {
        if (cancelled) return;
        setError(err?.message || "Failed to load books.");
        setStatus("error");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQ]);

  const handleClear = () => setQ("");

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Books</h1>

      <SearchBar
        value={q}
        onChange={setQ}
        onClear={handleClear}
        isLoading={status === "loading"}
      />

      {status === "error" && (
        <div
          role="alert"
          style={{
            padding: 12,
            borderRadius: 8,
            background: "#fff5f5",
            border: "1px solid #ffd7d7",
            color: "#9f1c1c",
          }}
        >
          {error}
          <div>
            <button
              type="button"
              onClick={handleClear}
              style={{
                marginTop: 8,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #d0d7de",
                background: "white",
                cursor: "pointer",
              }}
            >
              Reset search
            </button>
          </div>
        </div>
      )}

      {status === "empty" && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: "#f6f8fa",
            border: "1px solid #d0d7de",
            color: "#57606a",
          }}
        >
          No results{q ? ` for “${q}”` : ""}.
          <div>
            <button
              type="button"
              onClick={handleClear}
              style={{
                marginTop: 8,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #d0d7de",
                background: "white",
                cursor: "pointer",
              }}
            >
              Clear / show all
            </button>
          </div>
        </div>
      )}

      {(status === "ready" || status === "loading") && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: 12,
          }}
        >
          {books.map((b) => (
            <li
              key={b.id}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 12,
                alignItems: "center",
                padding: 12,
                border: "1px solid #d0d7de",
                borderRadius: 10,
                background: "white",
              }}
            >
              <img
                src={b.coverimage}
                alt={b.title}
                width="64"
                height="96"
                style={{ objectFit: "cover", borderRadius: 6 }}
              />
              <div style={{ display: "grid", gap: 4 }}>
                <div style={{ fontWeight: 600 }}>{b.title}</div>
                <div style={{ color: "#57606a", fontSize: 14 }}>{b.author}</div>
                <div style={{ fontSize: 12 }}>
                  {b.available ? "Available" : "Checked out"}
                </div>
              </div>

              <NavLink
                to={`/books/${b.id}`}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #d0d7de",
                  textDecoration: "none",
                }}
              >
                View
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
