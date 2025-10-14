import { useState } from "react";
import { makeReservation } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function BookDetail({ book, syncBooks }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  if (!book) return <p>Loading book details....</p>;

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
    <article className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <img src={book.coverimage} alt={book.title} />

      <button
        className="reserve-btn"
        onClick={tryMakeReservation}
        disabled={!book.available}
      >
        {book.available ? "Reserve" : "Unavailable"}
      </button>
    </article>
  );
}