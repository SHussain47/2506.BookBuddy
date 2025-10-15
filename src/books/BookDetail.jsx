import { useState } from "react";
import { makeReservation } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function BookDetail({ book, syncBooks }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  if (!book) return <p>Loading book details...</p>;

  const tryMakeReservation = async () => {
    setError(null);
    try {
      await makeReservation(token, book);
      await syncBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <article className="book-card" style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, marginBottom: 12 }}>
      <h2>{book.title}</h2>
      <p><strong>{book.author}</strong></p>
      <p>{book.description}</p>

      {error && (
        <p role="alert" style={{ color: "crimson", marginTop: 8 }}>
          {error}
        </p>
      )}


      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={book.title}
          style={{ display: "block", maxWidth: 240, marginTop: 8 }}
        />
      )}

      <button
        onClick={tryMakeReservation}
        disabled={!book.available}
        style={{ marginTop: 12 }}
      >
        {book.available ? "Reserve" : "Unavailable"}
      </button>
    </article>
  );
}
