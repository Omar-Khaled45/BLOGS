import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Pages
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import AddBlogPage from "./Pages/AddPostPage";
import ResetPassword from "./Pages/ResetPassword";
import EmailVerification from "./Pages/EmailVerification";

// Layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="add" element={<AddBlogPage />} />
      <Route path="email-verification" element={<EmailVerification />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
