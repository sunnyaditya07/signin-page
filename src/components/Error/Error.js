import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./Error.module.css";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className={styles.errorBox}>
      <h1 className={styles.errorText}>Something went wrong</h1>
      <p className={styles.errorMessage}>{error.data}</p>
      <button className={styles.errorBtn} onClick={() => navigate("/login")}>
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
