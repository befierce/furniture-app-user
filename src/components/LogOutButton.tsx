import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import styles from "./CartButton.module.css";
const LogOutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log("log out button clicked");

    localStorage.clear();
    dispatch(logout());
    alert("user logged out success");
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={logoutHandler}>Logout</button>
        </span>
      </div>
    </>
  );
};

export default LogOutButton;
