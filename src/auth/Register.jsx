import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // console.log(email);
  // console.log(password);

  const tryRegister = async (event) => {
    event.preventDefault();
    setError(null);

    // const formData = new FormData(event.target);
    // const firstName = formData.get("firstName");
    // const lastName = formData.get("lastName");
    // const email = formData.get("email");
    // const password = formData.get("password");

    console.log("FirstName: ", firstName);
    console.log("LastName: ", lastname);

    try {
      await register({ firstname: firstName, lastname, email, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={tryRegister}>
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastname}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Register</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to={`/login`}>Log in</Link> here.
      </p>
    </>
  );
}
