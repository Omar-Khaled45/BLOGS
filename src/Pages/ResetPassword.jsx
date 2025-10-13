import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

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
    <div className="h-[calc(100vh-72px)] bg-secBackground flex items-start md:items-center transition-all duration-300 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="w-[500px] mt-[100px] md:mt-0 bg-form rounded-lg shadow-lg dark:shadow-dark px-7 py-5">
          <h1 className="text-center text-2xl md:text-4xl font-bold mb-5 md:mb-10 relative after:content=[''] after:w-[50px] after:h-[5px] after:bg-primary after:absolute after:bottom-[-15px] md:after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2">
            Password Reset
          </h1>
          <h2 className="text-center mt-8 mb-3 font-semibold text-black/50 dark:text-white/50">
            Enter your email to receive a password reset link
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center mb-3">
              <input
                type="email"
                name="email"
                className="p-4 rounded-md bg-secBackground caret-primary focus:outline-none"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-5 flex justify-center">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold"
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
