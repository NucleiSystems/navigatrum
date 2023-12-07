import { useNavigate } from "react-router";
import { useEffect } from "react";
import { logOff } from "../../components/logOff";
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logOff();
    navigate("/login");
  });

  return <div></div>;
};

export default Logout;
