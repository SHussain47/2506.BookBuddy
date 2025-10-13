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
console.log("API:", API);

export async function makeReservation(token, book) {
  if (!token) {
    throw Error("You must be signed in to make a reservation.");
  }
  if (!book.available) {
    throw Error("This book is currently unavailable.");
  }
  const response = await fetch(`${API}/books/${book.id}/reserve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message || "Failed to reserve book.");
  }
  return result;
}

// GET account details
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

