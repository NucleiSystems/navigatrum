import { NonPrivRoutes, PrivRoutes } from "./auth/token_handler";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./auth/login.tsx";
import RegisterComponent from "./auth/register.tsx";
import LandingPage from "./landingPage.tsx";
import "../sass/index.scss";
import "./index.css";
import GalleryView from "./gallery/galleryView.tsx";
import Logout from "./auth/logout.tsx";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <NonPrivRoutes>
              <LandingPage />
            </NonPrivRoutes>
          }
        />

        <Route
          path="/login"
          element={
            <NonPrivRoutes>
              <LoginComponent />
            </NonPrivRoutes>
          }
        />

        <Route
          path="/register"
          element={
            <NonPrivRoutes>
              <RegisterComponent />
            </NonPrivRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivRoutes>
              <GalleryView />
            </PrivRoutes>
          }
        />

        <Route
          path="/logout"
          element={
            <PrivRoutes>
              <Logout />
            </PrivRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;