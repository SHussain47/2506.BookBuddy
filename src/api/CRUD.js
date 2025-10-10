const API = import.meta.env.VITE_API;

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
