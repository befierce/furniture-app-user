import styles from "./CartButton.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Modal from "./Modal";
const CartButton = (props: any) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [showCart. setShowCart] = useState(false);
  const CartHandler = () => {
    setShowCart(true);
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={CartHandler}>
            cart
            <img src="/add-product_12457780.png" alt="Add to cart" />
          </button>
        </span>
      </div>
      {
        showCart && <Cart/>
      }
    </>
  );
};

export default CartButton;
