import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Settings from "../components/Settings";
import { Suspense } from "react";
import Loading from "../components/Loading";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Settings />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
