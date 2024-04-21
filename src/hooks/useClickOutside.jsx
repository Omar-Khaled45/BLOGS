import { useEffect } from "react";

export const useClickOutside = (ref, clickOutside) => {
  return useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        clickOutside();
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        clickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ref, clickOutside]);
};

export default useClickOutside;
