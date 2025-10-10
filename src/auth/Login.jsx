import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async (event) => {
    event.preventDefault();
    setError(null);

    // console.log(event.target);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login({ email, password });
      navigate("/")
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
        Don't have an account? <Link to={`/register`} >Register</Link>!
      </p>
    </>
  );
}
