import { useDispatch } from "react-redux";
import { removeToken } from "../features/tokenStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(removeToken());
    navigate("/login");
  });
  return <div></div>;
};

export default Logout;
