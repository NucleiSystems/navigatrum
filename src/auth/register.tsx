import "./styles.scss";
import Button from "@mui/material/Button";
import { Card, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { useState } from "react";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    await axios.post(
      "http://localhost:8000/users/register",
      new URLSearchParams({
        username: username,
        email: email,
        password: password,
      })
    );
  };

  return (
    <div className="mainContainer">
      <Card className="regCard">
        <CardContent>
          <div className="contentCard">
            <h1 className="title">Register</h1>
            <TextField
              required
              className="textFields"
              id="outlined-required"
              label="username"
              autoComplete="current-username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <TextField
              required
              className="textFields"
              id="outlined-email-input"
              label="email"
              type="email"
              autoComplete="current-password"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              required
              className="textFields"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(password);
              }}
            />

            <Button
              variant="contained"
              onClick={() => {
                registerUser(username, email, password);
              }}
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterComponent;
