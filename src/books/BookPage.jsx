import { useState, useEffect } from "react";
import { getBooks } from "../api/reservations";
import BookDetail from "./BookDetail";

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const syncBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    syncBooks();
  }, []);
  return (
    <>
      <h1>Books</h1>
      {books.map((book) => (
        <BookDetail key={book.id} book={book} syncBooks={syncBooks} />
      ))}
    </>
  );
}
