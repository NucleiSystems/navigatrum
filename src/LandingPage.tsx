import React from "react";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <button
        onClick={() => {
          window.location.href = "/register";
        }}
      >
        register
      </button>
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        login
      </button>
    </div>
  );
}
