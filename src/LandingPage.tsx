import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const landingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>landingPage</h1>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
      >
        register
      </Button>
    </>
  );
};

export default landingPage;
