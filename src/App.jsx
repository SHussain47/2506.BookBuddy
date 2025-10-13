import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import BookPage from "./books/BookPage";
import Account from "./account/Account";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProfilePage from "./books/ProfilePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="books" element={<BookPage />} />
          <Route path="/account" element={<Account />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account-info" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
