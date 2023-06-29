import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchToken, setToken } from "./token_handler";
import axios from "axios";

import { MDBBtn, MDBRow, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";

export default function Register() {
  const Navigate = useNavigate();
  let location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    if (username === "" || password === "" || email === "") {
      return;
    } else {
      const response = await axios.post(
        "https://nucleibackend.systems/users/register",
        {
          email: `${username}`,
          password: `${email}`,
          username: `${password}`,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Navigate("/login");
      }
      if (response.status === 400) {
        setError(response.data.detail);
      }
    }
  };

  const errorMessage = () => {
    return (
      <div className="border-solid border-2 border-red-500">
        {error !== "" ? <h2>{error}</h2> : null}
      </div>
    );
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
            {errorMessage}
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Register
            </h3>
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              <h3>
                {error ? <p className="text-danger">{error}</p> : <p></p>}
              </h3>
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
              Register
            </MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Already have an account?{" "}
              <a href="/login" className="link-info">
                Login Here
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
