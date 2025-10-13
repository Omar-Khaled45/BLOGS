import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { useAuthErrorHandling } from "../hooks/useAuthErrorHandling";
import { useAuthContext } from "../contexts/AuthProvider";

const SignUp = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");

  const [surname, setSurname] = useState("");

  const { user, userSignUp } = useAuthContext();

  const { error, setError, handleAuthError } = useAuthErrorHandling();

  // Handle Sign Up Function
  const handleSignUp = (e) => {
    e.preventDefault();

    userSignUp(email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName:
            firstName.trim().charAt(0).toUpperCase() +
            firstName.trim().slice(1) +
            " " +
            surname.trim().charAt(0).toUpperCase() +
            surname.trim().slice(1),
        }).then(() => sendEmailVerification(auth.currentUser));
      })
      .catch((error) => {
        console.log(error.code);
        handleAuthError(error);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-secBackground flex items-start md:items-center transition-all duration-200 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="w-[500px] px-7 py-5 mt-[100px] md:mt-0 bg-form rounded-lg shadow-lg dark:shadow-dark">
          <h1 className="text-center text-2xl md:text-4xl font-bold mb-6 md:mb-10 relative after:content=[''] after:w-[50px] after:h-[5px] after:bg-primary after:absolute after:bottom-[-15px] md:after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2">
            Sign Up
          </h1>
          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <div>
                <label htmlFor="firstName" className="block mb-3">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="p-4 rounded-md bg-secBackground w-full caret-primary focus:outline-none"
                  placeholder="First Name"
                  onChange={(e) => {
                    setError("");
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-3">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  className="p-4 rounded-md bg-secBackground w-full caret-primary focus:outline-none"
                  placeholder="Surname"
                  onChange={(e) => {
                    setError("");
                    setSurname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center mb-3">
              <label htmlFor="email" className="block mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="p-4 rounded-md bg-secBackground  caret-primary focus:outline-none"
                placeholder="Email"
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div
              className={`flex flex-col justify-center ${
                error ? "mb-0" : "mb-6"
              }`}
            >
              <label htmlFor="password" className="block mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="p-4 rounded-md bg-secBackground caret-primary focus:outline-none"
                placeholder="Password"
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && (
              <p className="text-center my-3 text-red-300 font-semibold">
                {error}
              </p>
            )}
            <div className="mb-5">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold w-full"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center font-semibold">
              Already Have an Account?{" "}
              <Link to="/login" className="text-primary">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
