import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.containerFooterMenuWrap}>
        <div className={styles.oneFifthColumn}>
          <div className={styles.footerMenu}>
            <h6 className={styles.myFooterTitle}>Furniture</h6>
            <div className={styles.toggleContent}>
              <ul>
                <li>
                  <p>Home Furniture</p>
                </li>
                <li>
                  <p>Office Furniture</p>
                </li>
                <li>
                  <p>Mattress</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.oneFifthColumn}>
          <div className={styles.footerMenu}>
            <h6 className={styles.myFooterTitle}>About Us</h6>
            <div className={styles.toggleContent}>
              <ul>
                <li>
                  <p>Home Furniture</p>
                </li>
                <li>
                  <p>Office Furniture</p>
                </li>
                <li>
                  <p>Mattress</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.oneFifthColumn}>
          <div className={styles.footerMenu}>
            <h6 className={styles.myFooterTitle}>Help</h6>
            <div className={styles.toggleContent}>
              <ul>
                <li>
                  <p>Home Furniture</p>
                </li>
                <li>
                  <p>Office Furniture</p>
                </li>
                <li>
                  <p>Mattress</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.oneFifthColumn}>
          <div className={styles.footerMenu}>
            <h6 className={styles.myFooterTitle}>Support</h6>
            <div className={styles.toggleContent}>
              <ul>
                <li>
                  <p>Home Furniture</p>
                </li>
                <li>
                  <p>Office Furniture</p>
                </li>
                <li>
                  <p>Mattress</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.oneFifthColumn}>
          <div className={styles.footerMenu}>
            <h6 className={styles.myFooterTitle}>Follow us</h6>
            <div className={styles.toggleContent}>
              <ul>
                <li>
                  <p>Home Furniture</p>
                </li>
                <li>
                  <p>Office Furniture</p>
                </li>
                <li>
                  <p>Mattress</p>
                </li>   
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}></div>
      <div className={styles.footerBottom}></div>
    </div>
  );
};

export default Footer;
