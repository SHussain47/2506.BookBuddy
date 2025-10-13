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
    </>
  );
}
