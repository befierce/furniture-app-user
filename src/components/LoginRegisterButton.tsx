
import styles from "./CartButton.module.css";
const LoginRegisterButton = (props: any) => {
  console.log("props", props.loginHandler);
  const loginHandlerFunction = props.loginHandler;
  const loginHandler = () => {
    console.log("log inclicked");
    loginHandlerFunction();
    localStorage.clear();
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={loginHandler}>Login / Register</button>
        </span>
      </div>
    </>
  );
};

export default LoginRegisterButton;
