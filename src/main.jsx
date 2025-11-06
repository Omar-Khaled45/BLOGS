import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./contexts/AuthProvider.jsx";
import ListContextProvider from "./contexts/ListProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ListContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ListContextProvider>
  </AuthContextProvider>,
);
