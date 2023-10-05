/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useLoginSignup } from "../../context/LoginSignupContext";
function Home() {
  const navigate = useNavigate();
  const { setIsAuth, setUsername, setPassword } = useLoginSignup();

  function handleLogout() {
    setIsAuth(false);
    navigate("/login");
    setUsername("");
    setPassword("");
  }
  return (
    <div className={styles.home}>
      <div className={styles.homeBox}>
        <h1 className={styles.homeText}>You're in! Let's get started.</h1>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
