import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import { lazy } from "react";

// Pages
const LogIn = lazy(() => import("./Pages/LogIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const AddPostPage = lazy(() => import("./Pages/AddPostPage"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const EmailVerification = lazy(() => import("./Pages/EmailVerification"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="add" element={<AddPostPage />} />
      <Route path="email-verification" element={<EmailVerification />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
