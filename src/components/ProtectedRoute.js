import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginSignup } from "../context/LoginSignupContext";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useLoginSignup();

  useEffect(
    function () {
      if (!isAuth) navigate("/login");
    },
    [isAuth, navigate]
  );
  return isAuth ? children : null;
}

export default ProtectedRoute;
