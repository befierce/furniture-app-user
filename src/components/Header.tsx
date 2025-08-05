import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoWrapper}>
        <img
          src="/glory-furniture-logo.jpg"
          alt="Store Logo"
          className={styles.storeLogo}
        />
        <span className={styles.logoText}>......Glory Furnitures</span>
      </div>
      <div className={styles.headerSearchFieldContainer}>
        <input type="search" className={styles.searchInput}></input>
      </div>
      <div className={styles.loginRegisterContainer}>
        <span className={styles.loginRegisterText}>Login / Register</span>
      </div>
    </div>
  );
};

export default Header;
