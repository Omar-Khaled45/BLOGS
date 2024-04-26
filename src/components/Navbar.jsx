import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useClickOutside from "../hooks/useClickOutside";
import { useListContext } from "../hooks/useListContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, userSignOut } = useAuthContext();

  // Show State For Nav Menu
  const [showMenu, setShowMenu] = useState(false);

  // Sign Out Function
  const handleSignOut = () => {
    userSignOut().then(() => navigate("/login"));

    setShowMenu(false);
  };

  const navMenuRef = useRef(null);

  useClickOutside(navMenuRef, () => setShowMenu(false));

  const { reload } = useListContext();

  return (
    <header className="bg-form transition-all duration-300">
      <nav className="container h-[72px] flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl md:text-3xl text-primary font-bold transition-all duration-300"
          onClick={reload}
        >
          BLOGS
        </Link>
        {!user ? (
          <ul className="flex justify-between">
            <li>
              <Link
                to="/signup"
                className="px-3 py-1.5 md:px-5 md:py-2 text-[14px] md:text-base border-[3px] border-primary text-primary rounded-full font-semibold transition-all duration-300 md:hover:bg-primary md:hover:text-white"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="px-3 py-1.5 md:px-5 md:py-2 ml-3 text-[14px] md:text-base border-[3px] border-primary text-white rounded-full bg-primary font-semibold"
              >
                Log In
              </Link>
            </li>
          </ul>
        ) : (
          user.emailVerified && (
            <div className="flex items-center">
              <div className="me-3 text-sm md:text-base dark:text-white">
                Welcome, {user.displayName && user?.displayName?.split(" ")[0]}
              </div>
              <div ref={navMenuRef} className="relative">
                <button
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full md:hover:bg-gray-500/20 dark:md:hover:bg-gray-500/50 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    type="submit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-5 h-5 text-mainText cursor-pointer transition-all duration-300 ${
                      showMenu && "rotate-180"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {showMenu && (
                  <ul className="nav-menu w-[150px] bg-form rounded-lg shadow-lg dark:shadow-dark absolute top-12 right-0 z-10">
                    <li>
                      <Link
                        to="/add"
                        className="text-mainText p-2 m-1 flex items-center rounded-lg cursor-pointer md:hover:bg-gray-200 dark:md:hover:bg-gray-500/50"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-mainText me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Add Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="text-mainText p-2 m-1 flex items-center rounded-lg cursor-pointer md:hover:bg-gray-200 dark:md:hover:bg-gray-500/50"
                        onClick={handleSignOut}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-mainText me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )
        )}
      </nav>
    </header>
  );
};

export default Navbar;
