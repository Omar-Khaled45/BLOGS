import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Settings from "../components/Settings";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <Settings />
      <Outlet />
    </div>
  );
};

export default RootLayout;
