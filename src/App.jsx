import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate, useParams } from "react-router-dom";
import { api } from "./api/client";


//Active-Link Style
const linkStyle = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "none"
});


export default function App() {
  // Role A replace with AuthContext
  const isLoggedIn = false;


  // Placeholder for future Logout
  function handleLogout() {
    console.log("TODO: call authContext.logout()");
  }


  return (
    <>
      <header style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>

          <NavLink to="/books" style={linkStyle}>
            <strong>Book Buddy</strong>
          </NavLink>

          <div style={{ flex: 1 }} />

          {!isLoggedIn ? (
            <>
              <NavLink to="/books" style={linkStyle}>Books</NavLink>
              <NavLink to="/register" style={linkStyle}>Register</NavLink>
              <NavLink to="/login" style={linkStyle}>Login</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/books" style={linkStyle}>Books</NavLink>
              <NavLink to="/account" style={linkStyle}>Account</NavLink>
              <button onClick={handleLogout} style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline' }}>
              Log out
            </button>
          </>
        )}
        </nav>
      </header>


      <main style={{ padding: "16px", maxWidth: 900, margin: "0 auto"}}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetailLinkOnly />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}


function BooksPage() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | ready
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setStatus("loading");
        const data = await api("/books"); // GET /books
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
  if (status === "error") return <p role="alert">Error: {error}</p>;
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
              alt={`Cover of ${b.title}`}
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


function BookDetailLinkOnly() {
  const { id } = useParams();
  return (
    <>
    <h1>Book #{id}</h1>
    <p>(Role C) Details & reserve/return actions here. Role B link to this page.</p>
    <NavLink to="/books">Back to Books</NavLink>
    </>
  );
}


function RegisterPage() { 
  return <h1>Register</h1>; 
}


function LoginPage() {
  return (
    <>
      <h1>Login</h1>
      <p>
        Need an account? <NavLink to="/register">Register here.</NavLink>
      </p>
    </>
  );
}


function AccountPage() {
  return <h1>Account</h1>; // Role A/C fill this
}


function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <NavLink to="/books">Go back to Books</NavLink>
    </>
  );
}