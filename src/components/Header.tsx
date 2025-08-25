import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import CartButton from "./CartButton";
import OrdersButton from "./OrdersButton";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const loginHandler = () => {
    setShowLoginForm(true);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };
  const logoutHandler = () => {
    console.log("log out button clicked");
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
          <span className={styles.loginRegisterText}>
            {!isLoggedIn && (
              <button onClick={loginHandler}>Login / Register</button>
            )}
          </span>
        </div>
        <div className={styles.loginRegisterContainer}>
          <span className={styles.loginRegisterText}>
            {isLoggedIn && <CartButton/>}
          </span>
        </div>
        <div className={styles.loginRegisterContainer}>
          <span className={styles.loginRegisterText}>
            {isLoggedIn && <OrdersButton/>}
          </span>
        </div>
        <div className={styles.logoutContainer}>
          <span className={styles.logout}>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </span>
        </div>
      </div>
      {showLoginForm && <LoginForm onClose={closeLoginForm}></LoginForm>}
    </>
  );
};

export default Header;
