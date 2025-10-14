import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layout/Header.jsx";
import BookPage from "./books/BookPage.jsx";

function NotFound() {
  return <p>404 — Page not found. <a href="/books">Back to books</a></p>;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
