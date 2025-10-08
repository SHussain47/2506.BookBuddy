import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { logout } = useAuth();

  return (
    <>
      <h1>Welcome</h1>

      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
