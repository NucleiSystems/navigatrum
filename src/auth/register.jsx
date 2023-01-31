import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchToken, setToken } from "./token_handler";
import axios from "axios";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Register() {
  const Navigate = useNavigate();
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (username === "" || password === "" || email === "") {
      return;
    } else {
      const response = await axios
        .post(
          "http://127.0.0.1:8080/users/register",
          {
            email: `${username}`,
            password: `${email}`,
            username: `${password}`,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )

        .then(async (response) => {
          if (response.data.access_token) {
            await setToken(response.data.access_token);
            Navigate("/profile");
          }
          Promise.resolve();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <MDBRow>
      <MDBCol sm="6">
        <div className="d-flex flex-row ps-5 pt-5">
          <MDBIcon fas icon="crow fa-3x me-3" style={{ color: "#709085" }} />
          <span className="h1 fw-bold mb-0">Logo</span>
        </div>
        {fetchToken() ? (
          <Navigate
            to="/profile"
            state={{
              from: location,
            }}
          />
        ) : (
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>

            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Email address"
              type="email"
              size="lg"
              id="email_form"
              onChange={(e) => {
                setEmail(document.getElementById("email_form").value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Password"
              type="password"
              size="lg"
              id="username_form"
              onChange={(e) => {
                setUsername(document.getElementById("username_form").value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Password"
              type="password"
              size="lg"
              id="password_form"
              onChange={(e) => {
                setPassword(document.getElementById("password_form").value);
              }}
            />

            <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
              onClick={register}
              color="info"
              size="lg"
            >
              Login
            </MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a class="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Don't have an account?{" "}
              <a href="#!" class="link-info">
                Register here
              </a>
            </p>
          </div>
        )}
      </MDBCol>

      <MDBCol sm="6" className="d-none d-sm-block px-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="Login image"
          className="w-100"
          style={{ objectFit: "cover", objectPosition: "left" }}
        />
      </MDBCol>
    </MDBRow>
  );
}
