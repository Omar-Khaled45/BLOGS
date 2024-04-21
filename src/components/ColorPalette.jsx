import { useState } from "react";

const ColorPalette = () => {
  // Selected Color State
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem("primaryColor") || "#ff6363"
  );

  // Colors Array
  const colors = ["#ff6363", "#4caf50", "#7F27FF", "#03a9f4"];

  // Update Primary Color in Root Element
  const updatePrimaryColor = (color) => {
    setSelectedColor(color);

    document.documentElement.style.setProperty("--primary-color", color);

    localStorage.setItem("primaryColor", color);
  };

  // Get Primary Color Form Local Storage
  if (localStorage.getItem("primaryColor")) {
    document.documentElement.style.setProperty(
      "--primary-color",
      localStorage.getItem("primaryColor")
    );
  }

  return (
    <>
      <h4 className="font-bold mb-3 text-lg dark:text-gray-400">
        Color Palette
      </h4>
      <ul className="flex">
        {colors.map((color, index) => (
          <li
            key={index}
            className={`w-[24px] h-[24px] rounded-full me-6 cursor-pointer ${
              selectedColor === color
                ? "opacity-100 border-[3px] border-[#aaa]"
                : "opacity-50"
            } transition-opacity duration-300`}
            style={{ backgroundColor: color }}
            onClick={() => updatePrimaryColor(color)}
          ></li>
        ))}
      </ul>
    </>
  );
};

export default ColorPalette;
