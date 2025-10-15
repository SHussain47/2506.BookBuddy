import { useEffect, useState } from "react";
import { getMyReservations } from "../api/reservations";
import { returnBook } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function Account() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    // If token hasn't loaded yet, do nothing
    if (token === undefined) return;

    async function fetchReservations() {
      if (!token) {
        console.warn("No token found — user not logged in.");
        setLoading(false);
        return;
      }

      try {
        const data = await getMyReservations(token);
        console.log("Fetched reservations: ", data);
        setReservations(data || []);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const success = await returnBook(reservationId, token);
      if (success) {
        alert("Return book completed!");
        setReservations((prev) => prev.filter((res) => res.id !== reservationId));
      }
    } catch (error) {
      console.error("Failed to return book:", error);
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
                <button onClick={() => handleReturn(book.id)}>Return Book</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
