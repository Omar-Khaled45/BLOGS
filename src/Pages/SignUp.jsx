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
    <div className="flex h-[calc(100vh-72px)] items-start bg-secBackground transition-all duration-200 md:items-center dark:text-mainText">
      <div className="container flex justify-center">
        <div className="mt-[100px] w-[500px] rounded-lg bg-form px-7 py-5 shadow-lg md:mt-0 dark:shadow-dark">
          <h1 className="after:content=[''] relative mb-6 text-center text-2xl font-bold after:absolute after:bottom-[-15px] after:left-1/2 after:h-[5px] after:w-[50px] after:-translate-x-1/2 after:bg-primary md:mb-10 md:text-4xl md:after:bottom-[-20px]">
            Sign Up
          </h1>
          <form onSubmit={handleSignUp}>
            <div className="mb-3 grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="mb-3 block">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                  placeholder="First Name"
                  onChange={(e) => {
                    setError("");
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-3 block">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  className="w-full rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                  placeholder="Surname"
                  onChange={(e) => {
                    setError("");
                    setSurname(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-3 flex flex-col justify-center">
              <label htmlFor="email" className="mb-3 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
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
              <label htmlFor="password" className="mb-3 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                placeholder="Password"
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && (
              <p className="my-3 text-center font-semibold text-red-300">
                {error}
              </p>
            )}
            <div className="mb-5">
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-5 py-2 font-semibold text-white"
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
