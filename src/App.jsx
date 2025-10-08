import { Routes, Route } from "react-router";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProfilePage from "./books/ProfilePage";


export default function App() {
  return (
    <>
      <h1>Test</h1>
      <Register />
      <Login />
      <ProfilePage />
    </>
  )
}
