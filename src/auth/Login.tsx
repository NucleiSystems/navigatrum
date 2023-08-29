import "./styles.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import { Card, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { addToken, setExpire } from "../slices/tokenStore";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginUser = async (username: string, password: string) => {
    await axios
      .post(
        "https://nucleibackend.systems/users/token",
        new URLSearchParams({
          username: username,
          password: password,
        })
      )
      .then(async (e) => {
        console.log(e.data.access_token);
        await dispatch(addToken(e.data.access_token));
        await dispatch(setExpire());
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
                try {
                  loginUser(username, password);
                } catch {
                  console.log("there was an error");
                }
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
