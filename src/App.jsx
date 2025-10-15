import { Routes, Route, Navigate, NavLink, useParams } from "react-router-dom";
import Header from "./Layout/Header.jsx";

import Catalog from "./books/Catalog.jsx";
import BookPage from "./books/BookPage.jsx";
import Account from "./account/Account.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import ProfilePage from "./books/ProfilePage.jsx";

function NotFound() {
  return <p>404 — Page not found. <a href="/books">Back to books</a></p>;
}


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
  return (
    <>
      <h1>Register</h1>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>.
      </p>
    </>
  );
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

          <Route path="/books" element={<Catalog />} />

          <Route path="/books/:id" element={<BookDetailLinkOnly />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/account" element={<Account />} />
          <Route path="/account-info" element={<ProfilePage />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}