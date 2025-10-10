import { Routes, Route } from "react-router";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ProfilePage from "./books/ProfilePage";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account-info" element={<ProfilePage />} />
      </Routes>
    </>
  )
}
