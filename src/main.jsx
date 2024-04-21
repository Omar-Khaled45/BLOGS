import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import ListContextProvider from "./context/ListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ListContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ListContextProvider>
  </AuthContextProvider>
);
