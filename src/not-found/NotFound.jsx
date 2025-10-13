import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section
      style={{
        display: "grid",
        gap: 12,
        padding: 24,
        border: "1px solid #d0d7de",
        borderRadius: 12,
        background: "white",
        maxWidth: 700,
        margin: "24px auto",
      }}
    >
      <h1 style={{ margin: 0 }}>Page not found</h1>
      <p style={{ margin: 0, color: "#57606a" }}>
        We couldn’t find that page or it may have moved.
      </p>
      <div>
        <NavLink
          to="/books"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #d0d7de",
            textDecoration: "none",
          }}
        >
          ← Back to Books
        </NavLink>
      </div>
    </section>
  );
}
