import axios from "axios";
import { useState } from "react";
import { registerRequest } from "../interfaces/authInterface";
import endpoints from "../utils/endpointConfig";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${endpoints().endpoints.register}?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(
          password
        )}&username=${encodeURIComponent(username)}`,
        {}
      );

      if (response.status === 200) {
        setAuthenticated(true);
        navigate("/auth/login");
        toast.success("User created successfully");
      } else {
        setAuthenticated(false);
        toast.error(`Error with Registering ${response.status}`);
      }
    } catch (error) {
      setAuthenticated(false);
      toast.error(`Error with Registering: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto w-screen lg:mx-auto lg:m-auto md:m-auto sm:my-auto sm:mx-5 ">
        <Card className="m-auto lg:w-1/2 lg:mx-auto sm:w-full sm:text-sm sm:h-96 ">
          <CardBody>
            <Input
              required
              className="lg:mt-4 md:mt-5 sm:mt-6"
              label="Username"
              autoComplete="current-username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              required
              className="lg:mt-4 md:mt-5 sm:mt-6"
              label="Email"
              autoComplete="current-password"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              required
              className="lg:mt-4 md:mt-5 sm:mt-6"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="bordered"
              className="lg:mt-10 sm:mt-5"
              onClick={registerUser}
            >
              Register
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterComponent;
