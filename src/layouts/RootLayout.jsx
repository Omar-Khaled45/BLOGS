import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Settings from "../components/Settings";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Settings />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
