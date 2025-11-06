import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { useAuthContext } from "../contexts/AuthProvider";
import { useListContext } from "../contexts/ListProvider";

const UnAuthHome = lazy(() =>
  wait().then(() => import("../components/UnAuthHome")),
);

const AuthHome = lazy(() => import("../components/AuthHome"));

const wait = () => {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
};

const HomePage = () => {
  const { user } = useAuthContext();

  const { loading, blogsList } = useListContext();

  if (user && !user.emailVerified) {
    return <Navigate to="/email-verification" />;
  }

  return (
    <div
      className={
        !user
          ? "relative min-h-[calc(100vh-72px)] bg-homeLight bg-cover bg-no-repeat transition-all duration-300 dark:bg-homeDark dark:text-mainText"
          : "relative min-h-[calc(100vh-72px)] bg-secBackground transition-all duration-300 dark:text-mainText"
      }
    >
      <div className="container flex justify-center">
        {!user ? (
          <UnAuthHome />
        ) : (
          <AuthHome blogsList={blogsList} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
