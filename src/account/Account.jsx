import { useEffect, useState } from "react";
import { getMyReservations } from "../api/reservations";

export default function Account() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      const data = await getMyReservations();
      setReservations(data);
      setLoading(false);
    }
    fetchReservations();
  }, []);

  async function handleReturn(reservationId) {
    const success = await returnBook(reservationId);
    if (success) {
      alert("Return book completed!");
      const result = await getMyReservations();
      setReservations(result);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <article>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reserved books.</p>
      ) : (
        <div>
          {reservations.map((book) => (
            <div key={book.id}>
              <img src={book.coverimage} alt={book.title} width="100" />
              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button onClick={() => handleReturn(book.id)}>
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
