import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignupContext = createContext();

function LoginSignupProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const BASE_URL =
    "http://bd-userservice-lb-staging-233784656.us-east-1.elb.amazonaws.com/api/v1";

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) return;
    try {
      setIsLoading(true);
      const loginResponse1 = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const loginData1 = await loginResponse1.json();
      if (!loginData1.error) {
        setIsAuth(true);
        navigate("/");
      } else {
        setIsAuth(false);
        setErrorMessage(loginData1.message);

        navigate("/login");
      }
      const loginResponse2 = await fetch(
        "http://3.84.171.136:5000/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            role: "app",
            usertype: "app",
          }),
        }
      );
      const loginData2 = await loginResponse2.json();

      if (loginData2.status === "200") {
        setIsAuth(true);
        navigate("/");
      } else {
        setIsAuth(false);
        setErrorMessage(loginData2.message);
        setUsername("");
        setPassword("");
        navigate("/login");
      }

      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  async function handleSignup(e) {
    e.preventDefault();
    const userData = { firstname, lastname, username, email, password };
    if (!username || !firstname || !email || !password) return;
    try {
      setIsLoading(true);
      const signupResponse1 = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const signupData1 = await signupResponse1.json();

      const signupResponse2 = await fetch("http://3.84.171.136:5000/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          usertype: "app",
          role: "user",
          status: "active",
        }),
      });
      const signupData2 = await signupResponse2.json();
      if (
        signupData1.message === "user created successfully" ||
        signupData2.status === "200"
      ) {
        setIsAuth(true);
        navigate("/");
      } else {
        setIsAuth(false);
        setErrorMessage(signupData1.message || signupData2.message);
        navigate("/signup");
      }

      setIsLoading(false);
      setIsAuth(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setEmail("");
  }

  return (
    <LoginSignupContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        errorMessage,
        setErrorMessage,
        isAuth,
        setIsAuth,
        isLoading,
        firstname,
        setFirstName,
        lastname,
        setLastName,
        email,
        setEmail,
        handleLogin,
        handleSignup,
      }}
    >
      {children}
    </LoginSignupContext.Provider>
  );
}

function useLoginSignup() {
  const context = useContext(LoginSignupContext);
  if (context === undefined)
    throw new Error("Context used outside of the provider ");
  return context;
}

export { LoginSignupProvider, useLoginSignup };
