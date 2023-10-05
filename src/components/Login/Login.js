import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useLoginSignup } from "../../context/LoginSignupContext";
function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    errorMessage,
    isLoading,
  } = useLoginSignup();

  return (
    <div className={styles.loginSection}>
      <form className={styles.loginBox} onSubmit={handleLogin}>
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}

        <input
          type="text"
          placeholder="Username"
          className={styles.loginInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.loginBtn}>
          {isLoading ? "Logging In" : "Login"}
        </button>

        <div className={styles.createAccBox}>
          <p className={styles.createAccText}>Create new account?</p>
          <Link to="/signup">
            <p className={styles.signupText}>Sign Up</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
