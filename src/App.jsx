<<<<<<< HEAD
import { Routes, Route, Navigate, NavLink, useParams } from "react-router-dom";
import Header from "./Layout/Header.jsx";
import Catalog from "./books/Catalog.jsx";
=======
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import BookPage from "./books/BookPage";
import Account from "./account/Account";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProfilePage from "./books/ProfilePage";
>>>>>>> origin/main

export default function App() {

  const isLoggedIn = false;

  function handleLogout() {
    console.log("TODO: call authContext.logout()");
  }

  return (
    <>
<<<<<<< HEAD
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main style={{ padding: "16px", maxWidth: 900, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<Catalog />} />
          <Route path="/books/:id" element={<BookDetailLinkOnly />} />

          {/* placeholders for team */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

/* ---------- placeholders for branch fix ---------- */

function BookDetailLinkOnly() {
  const { id } = useParams();
  return (
    <>
      <h1>Book #{id}</h1>
      <p>(Role C) Details & reserve/return actions will go here.</p>
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
        Need an account? <NavLink to="/register">Register</NavLink>.
      </p>
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
      <NavLink to="/books">Go back to Books</NavLink>
=======
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="books" element={<BookPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account-info" element={<ProfilePage />} />
      </Routes>
>>>>>>> origin/main
    </>
  );
}
