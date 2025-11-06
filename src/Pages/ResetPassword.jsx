import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email sent successfully. Please check your inbox",
          background: "var(--form-color)",
          color: "var(--main-text)",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Back to log in",
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-[calc(100vh-72px)] items-start bg-secBackground transition-all duration-300 md:items-center dark:text-mainText">
      <div className="container flex justify-center">
        <div className="mt-[100px] w-[500px] rounded-lg bg-form px-7 py-5 shadow-lg md:mt-0 dark:shadow-dark">
          <h1 className="after:content=[''] relative mb-5 text-center text-2xl font-bold after:absolute after:bottom-[-15px] after:left-1/2 after:h-[5px] after:w-[50px] after:-translate-x-1/2 after:bg-primary md:mb-10 md:text-4xl md:after:bottom-[-20px]">
            Password Reset
          </h1>
          <h2 className="mb-3 mt-8 text-center font-semibold text-black/50 dark:text-white/50">
            Enter your email to receive a password reset link
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col justify-center">
              <input
                type="email"
                name="email"
                className="rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-5 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2 font-semibold text-white"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
