import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../interfaces/authInterface";
import { expTime, setToken, setTokenExpire } from "../../utils/token_handler";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import endpoints from "../../utils/endpointConfig";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (data: loginRequest) => {
    axios
      .post(
        endpoints().endpoints.login,
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
    <div className="flex h-screen">
      <div className="m-auto w-screen lg:mx-auto lg:m-auto md:m-auto sm:my-auto sm:mx-5 ">
        <Card className="m-auto lg:w-1/2 md:w-96 lg:mx-auto sm:w-full sm:text-sm sm:h-96 ">
          <CardHeader></CardHeader>
          <CardBody>
            <Input
              required
              className="lg:mt-4 md:mt-5 sm:mt-6"
              id="outlined-required"
              label="Username"
              autoComplete="current-username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <Input
              required
              className="lg:mt-4 md:mt-5 sm:mt-6"
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
              className="lg:mt-10 sm:mt-5"
              onClick={() => {
                loginUser({
                  username,
                  password,
                });
              }}
            >
              Login
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginComponent;
