import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  textDecoration: isActive ? "underline" : "none",
});

export default function Header({ isLoggedIn = false, onLogout = () => {} }) {
  return (
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
            <NavLink to="/login" style={linkStyle}>Log in</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/books" style={linkStyle}>Books</NavLink>
            <NavLink to="/account" style={linkStyle}>Account</NavLink>
            <button
              onClick={onLogout}
              style={{ all: "unset", cursor: "pointer", textDecoration: "underline" }}
            >
              Log out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}