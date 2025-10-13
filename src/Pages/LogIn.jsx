import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthErrorHandling } from "../hooks/useAuthErrorHandling";
import { useAuthContext } from "../context/AuthContext";
import { useListContext } from "../context/ListContext";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { user, userSignIn } = useAuthContext();

  const { reload } = useListContext();

  const { error, setError, handleAuthError } = useAuthErrorHandling();

  // Handle Sign In Function
  const handleLogIn = (e) => {
    e.preventDefault();

    userSignIn(email, password)
      .then(() => {
        navigate("/");

        reload();
      })
      .catch((error) => {
        console.log("Error Message: " + error.message);
        console.log("Error Code: " + error.code);
        handleAuthError(error);
      });
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-secBackground flex items-start md:items-center transition-all duration-300 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="w-[500px] px-7 py-5 mt-[100px] md:mt-0 bg-form rounded-lg shadow-lg dark:shadow-dark">
          <h1 className="text-center text-2xl md:text-4xl font-bold mb-5 md:mb-10 relative after:content=[''] after:w-[50px] after:h-[5px] after:bg-primary after:absolute after:bottom-[-15px] md:after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2">
            Log In
          </h1>
          <form className="w-full" onSubmit={handleLogIn}>
            <div className="flex flex-col justify-center mb-3">
              <label htmlFor="email" className="block mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="p-4 rounded-md bg-secBackground caret-primary focus:outline-none"
                placeholder="Email"
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
              {error && (
                <p className="text-center mt-3 text-red-300 font-semibold">
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="password" className="block mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="p-4 rounded-md bg-secBackground  caret-primary focus:outline-none"
                placeholder="Password"
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-end my-4">
              <Link
                className="font-semibold text-black/50 dark:text-white/50"
                to="/reset-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold w-full"
              >
                Log In
              </button>
            </div>
            <div className="text-center font-semibold">
              New to Blogs?{" "}
              <Link to="/signup" className="text-primary">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
