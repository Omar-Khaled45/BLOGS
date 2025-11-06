import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { useAuthContext } from "../contexts/AuthProvider";
import { useListContext } from "../contexts/ListProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, userSignOut } = useAuthContext();

  const { reload } = useListContext();

  // Show State For Nav Menu
  const [showMenu, setShowMenu] = useState(false);

  // Sign Out Function
  const handleSignOut = () => {
    userSignOut().then(() => navigate("/login"));

    setShowMenu(false);
  };

  const navMenuRef = useRef(null);

  useClickOutside(navMenuRef, () => setShowMenu(false));

  return (
    <header className="bg-form transition-all duration-300">
      <nav className="container flex h-[72px] items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-primary transition-all duration-300 md:text-3xl"
          onClick={reload}
        >
          BLOGS
        </Link>
        {!user ? (
          <ul className="flex justify-between">
            <li>
              <Link
                to="/signup"
                className="rounded-full border-[3px] border-primary px-3 py-1.5 text-[14px] font-semibold text-primary transition-all duration-300 md:px-5 md:py-2 md:text-base md:hover:bg-primary md:hover:text-white"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="ml-3 rounded-full border-[3px] border-primary bg-primary px-3 py-1.5 text-[14px] font-semibold text-white md:px-5 md:py-2 md:text-base"
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
                  className="flex h-7 w-7 items-center justify-center rounded-full md:hover:bg-gray-500/20 dark:md:hover:bg-gray-500/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    type="submit"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`h-5 w-5 cursor-pointer text-mainText transition-all duration-300 ${
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
                  <ul className="nav-menu absolute right-0 top-12 z-10 w-[150px] rounded-lg bg-form shadow-lg dark:shadow-dark">
                    <li>
                      <Link
                        to="/add"
                        className="m-1 flex cursor-pointer items-center rounded-lg p-2 text-mainText md:hover:bg-gray-200 dark:md:hover:bg-gray-500/50"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="me-2 h-5 w-5 text-mainText"
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
                        className="m-1 flex cursor-pointer items-center rounded-lg p-2 text-mainText md:hover:bg-gray-200 dark:md:hover:bg-gray-500/50"
                        onClick={handleSignOut}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="me-2 h-5 w-5 text-mainText"
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
