import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import { LoginSignupProvider } from "./context/LoginSignupContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginSignupProvider>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </LoginSignupProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: (
      <LoginSignupProvider>
        <SignUp />
      </LoginSignupProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <LoginSignupProvider>
        <Login />
      </LoginSignupProvider>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
