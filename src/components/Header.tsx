import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import CartButton from "./CartButton";
import OrdersButton from "./OrdersButton";
import LogOutButton from "./LogOutButton";
import LoginRegisterButton from "./LoginRegisterButton";
const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const loginHandler = () => {
    setShowLoginForm(true);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
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
        {!isLoggedIn && (
          <div className={styles.loginRegisterContainer}>
              <LoginRegisterButton loginHandler={loginHandler} />
          </div>
        )}
        <>
          {isLoggedIn && (
            <div className={styles.buttonsWrapper}>
              <div className={styles.loginRegisterContainer}>
                <span className={styles.loginRegisterText}>
                  <CartButton />
                </span>
              </div>
              <div className={styles.loginRegisterContainer}>
                {/* <span className={styles.loginRegisterText}> */}
                  <OrdersButton />
                {/* </span> */}
              </div>
              <div className={styles.logoutContainer}>
                <span className={styles.logout}>
                  <LogOutButton />
                </span>
              </div>
            </div>
          )}
        </>
      </div>
      {/* </div> */}
      {showLoginForm && <LoginForm onClose={closeLoginForm}></LoginForm>}
    </>
  );
};

export default Header;
