import { Routes, Route } from "react-router-dom";
import { LoggedInChecker, RequireToken } from "./auth/token_handler";
import Profile from "./personal/Profile";
import Login from "./auth/Login";
import LandingPage from "./LandingPage";
import Gallery from "./personal/components/data_display/gallery";
import Upload from "./personal/components/upload/UploadPage";
import Register from "./auth/register";
import ChatRoomEntry from "./personal/components/chat_component/communicate";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/" // This is the default route
          element={
            <LoggedInChecker>
              <LandingPage />
            </LoggedInChecker>
          }
        />
        <Route
          path="/login" // This is the login route
          element={
            <LoggedInChecker>
              <Login />
            </LoggedInChecker>
          }
        />
        <Route
          path="/register" // This is the login route
          element={
            <LoggedInChecker>
              <Register />
            </LoggedInChecker>
          }
        />

        <Route
          path="/profile" // This is the profile route
          element={
            <RequireToken>
              <Profile />
            </RequireToken>
          }
        />
        <Route
          path="/chat" // This is the profile route
          element={
            <RequireToken>
              <ChatRoomEntry />
            </RequireToken>
          }
        />
        <Route
          path="/gallery" // This is the profile route
          element={
            <RequireToken>
              <Gallery />
            </RequireToken>
          }
        />
        <Route
          path="/upload" // This is the profile route
          element={
            <RequireToken>
              <Upload />
            </RequireToken>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
