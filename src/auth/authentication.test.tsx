import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import LoginComponent from "./Login";
import store from "../store";

jest.mock("axios");

describe("LoginComponent", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginComponent />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the login form", () => {
    const usernameInput = screen.getByLabelText("username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should call the login API when the form is submitted", async () => {
    const usernameInput = screen.getByLabelText("username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "https://nucleibackend.systems/users/token",
        new URLSearchParams({
          username: "testuser",
          password: "testpassword",
        })
      );
    });
  });

  it("should redirect to the dashboard page when login is successful", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { access_token: "testtoken" },
    });

    const usernameInput = screen.getByLabelText("username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  it("should display an error message when login fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Login failed"));

    const usernameInput = screen.getByLabelText("username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("there was an error")).toBeInTheDocument();
    });
  });
});
