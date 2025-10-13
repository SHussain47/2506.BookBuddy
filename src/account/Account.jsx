import { useEffect, useState } from "react";
import { getMyReservations } from "../api/reservations";

export default function Account() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      const data = await getMyReservations();
      setReservations(data);
    }
    fetchReservations();
  }, []);
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
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
