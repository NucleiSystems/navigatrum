import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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

export default LandingPage;
