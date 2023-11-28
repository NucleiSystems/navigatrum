import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../navbar";

const AuthProvider = ({ ProtectedPage }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canRender, allowRender] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/auth/login");
      allowRender(false);
    } else if (location.pathname === "/" && token === null) {
      navigate("/auth/login");
      allowRender(false);
    } else {
      allowRender(true);
    }
  }, [location]);

  if (canRender) {
    return (
      <div className="h-screen h-full w-full bg-gradient-to-r from-[#4b8a47] to-[#96bd9b]">
        <NavBar />
        {ProtectedPage}
      </div>
    );
  } else {
    // You don't need to navigate here, just return null or any other component you want to render
    return null;
  }
};

export default AuthProvider;
