import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

import { useLoginSignup } from "../../context/LoginSignupContext";

function SignUp() {
  const {
    firstname,
    setFirstName,
    lastname,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSignup,
    isLoading,
  } = useLoginSignup();
  return (
    <div className={styles.signupSection}>
      <form className={styles.signupBox} onSubmit={handleSignup}>
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        <input
          type="text"
          placeholder="First Name"
          className={styles.signupInput}
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className={styles.signupInput}
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className={styles.signupInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.signupInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create Password"
          className={styles.signupInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.signupBtn}>
          {isLoading ? "Creating Account" : "Create Account"}
        </button>
        <div className={styles.createAccBox}>
          <p className={styles.createAccText}>Already have an account?</p>
          <Link to="/login">
            <p className={styles.signupText}>Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
