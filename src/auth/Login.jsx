import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, Navigate } from "react-router";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const tryLogin = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({ email, password });
      // Navigate to main page
      console.log("Logged In!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={tryLogin}>
        <label>
          Email
          <input type="text" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link>Register</Link>!
      </p>
    </>
  );
}
