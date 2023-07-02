import { useNavigate } from "react-router";
import Navbar from "./components/styling/Navbar";
import React from "react";
import { LoginInspector } from "../auth/token_handler";

export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 20, minHeight: 700 }}>
        <h1>Profile page</h1>
        <p>Hello there, welcome to your profile page</p>
        <p>go to gallery?</p>
        <button onClick={navigate("/gallery")}>gallery</button>
        <button onClick={LoginInspector}>check</button>
        <button onClick={signOut}>sign out</button>
      </div>
    </div>
  );
}
