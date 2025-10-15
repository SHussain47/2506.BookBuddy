import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAccountDetails } from "../api/reservations";
import { Link, Outlet, useNavigate } from "react-router";

export default function ProfilePage() {
  const { logout, token } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate("/books");
  };

  // console.log(userInfo.reservation);
  console.log(userInfo);

  return (
    <>
      <h1>Welcome {userInfo ? userInfo.firstname : "Guest"}</h1>
      <p>Your email on file is: {userInfo ? userInfo.email : "LogIn first to see details"}</p>

      <h2>Your Reservations</h2>

      <Outlet />

      {!userInfo?.reservation?.length && (
        <p>
          You have not reserved any books yet. Browse our <Link to="/books">catalog</Link>!
        </p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
