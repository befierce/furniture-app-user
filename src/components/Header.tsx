import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const state = useSelector((state) => state);
  const loginHandler = ()=>{
      console.log(state)
  }
  return (
    <div className={styles.headerContainer}>
      <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={styles.logoWrapper}>
          <img
            src="/glory-furniture-logo.jpg"
            alt="Store Logo"
            className={styles.storeLogo}
          />
          <span className={styles.logoText}>......Glory Furnitures</span>
        </div>
      </Link>
      <div className={styles.headerSearchFieldContainer}>
        <input type="search" className={styles.searchInput}></input>
      </div>
      <div className={styles.loginRegisterContainer}>
        <span className={styles.loginRegisterText}><button onClick={loginHandler}>Login / Register</button></span>
      </div>
    </div>
  );
};

export default Header;
