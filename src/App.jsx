import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header.jsx";

import BookPage from "./books/BookPage.jsx";
import Account from "./account/Account";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProfilePage from "./books/ProfilePage";

function NotFound() {
  return <p>404 — Page not found. <a href="/books">Back to books</a></p>;
}

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: "16px", maxWidth: 900, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account-info" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
