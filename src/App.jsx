<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layout/Header.jsx";

export default function App() {
  
  const isLoggedIn = false;

  function handleLogout() {
    console.log("TODO: call authContext.logout()");
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main style={{ padding: "16px", maxWidth: 900, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailLinkOnly />} />

          {/* Placeholders for team */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
=======
import React from "react";
import BookPage from "./books/BookPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
>>>>>>> origin/main
    </>
  );
}

/* --- place holders for branch fix --- */
function BooksPage() {
  return <h1>Catalog</h1>;
}
function BookDetailLinkOnly() {
  return (
    <>
      <h1>Book</h1>
      <p>(Role C page links here.)</p>
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
      <p>Need an account? Register.</p>
    </>
  );
}
function AccountPage() {
  return <h1>Account</h1>;
}
function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>Go back to Books.</p>
    </>
  );
}