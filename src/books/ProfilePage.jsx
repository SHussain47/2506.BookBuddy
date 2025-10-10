import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAccountDetails } from "../api/CRUD";
import { Link } from "react-router";

export default function ProfilePage() {
  const { logout, token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getAccDetails() {
      try {
        const data = await getAccountDetails(token);
        // Seeing the account data on console
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.error("Error loading account details: ", error);
      }
    }

    if (token) getAccDetails();
  }, [token]);

  return (
    <>
      <h1>Welcome {userInfo ? userInfo.firstname : "Guest"}</h1>
      <p>Your email on file is: {userInfo ? userInfo.email : "LogIn first to see details"}</p>
      <h2>Your Reservations</h2>
      {userInfo && userInfo.reservation ? (
        <p>{userInfo.reservation}</p>
      ) : (
        <p>
          You have not reserved any books yet. Browse our <Link>catalog</Link>!
        </p>
      )}

      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
