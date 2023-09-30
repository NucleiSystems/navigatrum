import "./scss/auth_styles.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Card, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { addToken, setExpire } from "../features/tokenStore";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../interfaces/authInterface";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = (data: loginRequest) => {
    axios
      .post(
        "https://nucleibackend.systems/users/token",
        new URLSearchParams({
          username: data.username,
          password: data.password,
        })
      )
      .then((e) => {
        if (e.status === 200) {
          dispatch(addToken(e.data.access_token));
          dispatch(setExpire());
          navigate("/dashboard");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="mainContainer">
      <Card className="regCard">
        <CardContent>
          <div className="contentCard">
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
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              variant="contained"
              onClick={() => {
                loginUser({
                  username,
                  password,
                });
              }}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComponent;
