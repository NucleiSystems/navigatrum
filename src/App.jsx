import { Routes, Route } from "react-router-dom";
import { LoggedInChecker, RequireToken } from "./auth/token_handler";
import Profile from "./personal/Profile";
import Login from "./auth/Login";
import LandingPage from "./LandingPage";
import Gallery from "./personal/components/gallery_display/gallery";
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
          path="/" 
          element={
            <LoggedInChecker>
              <LandingPage />
            </LoggedInChecker>
          }
        />

        <Route
          path="/login" 
          element={
            <LoggedInChecker>
              <Login />
            </LoggedInChecker>
          }
        />

        <Route
          path="/register" 
          element={
            <LoggedInChecker>
              <Register />
            </LoggedInChecker>
          }
        />

        <Route
          path="/profile" 
          element={
            <RequireToken>
              <Profile />
            </RequireToken>
          }
        />

        <Route
          path="/chat" 
          element={
            <RequireToken>
              <ChatRoomEntry />
            </RequireToken>
          }
        />

        <Route
          path="/gallery" 
          element={
            <RequireToken>
              <Gallery />
            </RequireToken>
          }
        />

        <Route
          path="/upload" 
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
