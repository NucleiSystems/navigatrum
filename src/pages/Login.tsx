import "./scss/auth_styles.scss";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../interfaces/authInterface";
import { expTime, setToken, setTokenExpire } from "../utils/token_handler";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          (async () => {
            await setToken(e.data.access_token);
            await setTokenExpire(expTime().toString());
          })();
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="mainContainer">
      <Card className="regCard">
        <CardBody>
          <div className="contentCard">
            <Input
              required
              className="textFields"
              id="outlined-required"
              label="username"
              autoComplete="current-username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <Input
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
              variant="bordered"
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
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginComponent;
