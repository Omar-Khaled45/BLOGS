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
      <h4 className="font-bold mb-3 text-lg dark:text-gray-400">Dark Mode</h4>
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
            className={`w-20 h-8 rounded-full cursor-pointer relative ${
              checked ? "bg-primary" : "bg-gray-500"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full absolute top-1/2 -translate-y-1/2 bg-white dark:bg-[#2d2f30] transition-all duration-300 ${
                checked ? "left-[53px]" : "left-1"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </>
  );
};

export default DarkModeToggle;
