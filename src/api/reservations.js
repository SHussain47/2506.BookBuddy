const API = import.meta.env.VITE_API;

export async function getBooks() {
  console.log("API:", API);

  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
// console.log("API:", API);

export async function makeReservation(token, book) {
  const bookId = book.id;
  if (!token) {
    // const token = "dummy-token";
    throw Error("You must be signed in to make a reservation.");
  }
  if (!book.available) {
    throw Error("This book is currently unavailable.");
  }
  const response = await fetch(`${API}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message || "Failed to reserve book.");
  }
  alert(`You have reserved "${book.title}"`);
  return result;
}

export async function getMyReservations(token) {
  // const token = "dummy-token";
  try {
    const response = await fetch(`${API}/reservations`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to get reservations");

    return result;
  } catch (e) {
    return [];
  }
}

export async function returnBook(bookId, token) {
  // const token = "dummy-token";
  try {
    const response = await fetch(`${API}/books/${bookId}/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to return book.");
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getAccountDetails(token) {
  try {
    const response = await fetch(`${API}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error with /GET account details fucntion: ", error);
    return []; // Prevent undefine return
  }
}
