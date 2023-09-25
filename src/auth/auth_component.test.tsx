import React from "react";
import { fetchToken, PrivRoutes, NonPrivRoutes } from "./token_handler";
import { describe, expect, test } from "@jest/globals";

describe("fetchToken", () => {
  it("should return the token from localStorage", () => {
    localStorage.setItem("token", "test_token");
    expect(fetchToken()).toEqual("test_token");
  });

  it("should return null if token is not in localStorage", () => {
    localStorage.removeItem("token");
    expect(fetchToken()).toBeNull();
  });
});

describe("PrivRoutes", () => {
  it("should redirect to login if user is not logged in", () => {
    const navigate = jest.fn();

    const wrapper = PrivRoutes({ children: <div>Test</div> });
    wrapper.props.children.props.children({ navigate, isLoggedIn });
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("should render the child component if user is logged in", () => {
    const isLoggedIn = true;
    const wrapper = PrivRoutes({ children: <div>Test</div> });
    expect(wrapper.props.children).toEqual(<div>Test</div>);
  });
});

describe("NonPrivRoutes", () => {
  it("should redirect to dashboard if user is logged in", () => {
    const navigate = jest.fn();
    const isLoggedIn = true;
    const location = { pathname: "/test" };
    const wrapper = NonPrivRoutes({ children: <div>Test</div> });
    wrapper.props.children.props.children({ navigate, isLoggedIn, location });
    expect(navigate).toHaveBeenCalledWith("/dashboard", { state: location });
  });

  it("should render the child component if user is not logged in", () => {
    const isLoggedIn = false;
    const wrapper = NonPrivRoutes({ children: <div>Test</div> });
    expect(wrapper.props.children).toEqual(<div>Test</div>);
  });
});
