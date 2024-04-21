import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import AddBlogPage from "./Pages/AddPostPage";
import Settings from "./components/Settings";
import { useAuthContext } from "./hooks/useAuthContext";
import EmailVerification from "./Pages/EmailVerification";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Navbar />
      <Settings />
      <Routes>
        <Route
          path="/"
          element={
            user && !user.emailVerified ? (
              <Navigate to="/email-verification" />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/add"
          element={
            user && user.emailVerified ? (
              <AddBlogPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/email-verification"
          element={
            user && !user.emailVerified ? (
              <EmailVerification />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reset-password"
          element={!user ? <ResetPassword /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
