import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const selectedTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(selectedTheme || "light");

  // State to manage the current mode (true for dark mode, false for light mode)
  const [checked, setChecked] = useState(selectedTheme === "dark" || false);

  if (selectedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", theme);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme((e) => (e === "light" ? "dark" : "light"));
    setChecked(!checked);
  };

  return (
    <>
      <h4 className="mb-3 text-lg font-bold dark:text-gray-400">Dark Mode</h4>
      <div>
        <label htmlFor="toggle">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            defaultChecked={checked}
            onChange={handleTheme}
          />
          <div
            className={`relative h-8 w-20 cursor-pointer rounded-full ${
              checked ? "bg-primary" : "bg-gray-500"
            }`}
          >
            <div
              className={`absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white transition-all duration-300 dark:bg-[#2d2f30] ${
                checked ? "translate-x-[53px]" : "translate-x-1"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </>
  );
};

export default DarkModeToggle;
