import { useState } from "react";

export const useAuthErrorHandling = () => {
  const [error, setError] = useState("");

  const handleAuthError = (error) => {
    let errorMessage = null;

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address.";
        break;

      case "auth/email-already-in-use":
        errorMessage =
          "This email address is already in use by another account.";
        break;

      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;

      case "auth/invalid-credential":
        errorMessage = "Invalid email or password.";
        break;

      case "auth/user-not-found":
        errorMessage = "User not found. Please sign up.";
        break;

      case "auth/weak-password":
        errorMessage = "Provide a strong password";
        break;

      case "auth/wrong-password":
        errorMessage = "Incorrect password.";
        break;

      default:
        errorMessage = "An error occurred. Try again later.";
        break;
    }

    setError(errorMessage);
  };

  return { setError, error, handleAuthError };
};
