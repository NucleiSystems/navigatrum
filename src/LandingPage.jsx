import React from "react";

export default function LandingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Landing Page</h1>
      <h1>commit change :/</h1>
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
