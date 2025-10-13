import { Navigate, useNavigate } from "react-router-dom";
import MailSent from "../assets/undraw_mail_sent_re_0ofv.svg";
import { useAuthContext } from "../context/AuthContext";

const EmailVerification = () => {
  const { user, userSignOut } = useAuthContext();

  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut().then(() => navigate("/login"));
  };

  if (user === null) {
    return <Navigate to="/login" />;
  }

  if (user?.emailVerified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-secBackground transition-all duration-200 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="mt-[60px] text-center leading-8 tracking-wide">
          <div className="flex justify-center w-full mb-5">
            <img
              loading="lazy"
              src={MailSent}
              alt="Mail Sent"
              className="w-40 md:w-56"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Verify Your Email
          </h1>
          <p>
            Almost there! We have sent an email to{" "}
            <span className="font-bold">{user?.email}</span>.
          </p>
          <p>
            Please follow the instructions to verify your email <br />
            and start enjoying{" "}
            <span className="font-bold text-primary">BLOGS</span>.
          </p>
          <div>
            <button
              onClick={handleSignOut}
              className="px-4 py-1 mt-3 border-[3px] border-primary text-white bg-primary rounded-full font-semibold"
            >
              Back to Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
