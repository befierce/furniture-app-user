import styles from "./CartButton.module.css";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { useState } from "react";
// import LoginForm from "./LoginForm";
// import { getDoc, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import Modal from "./Modal";
const CartButton = (props: any) => {
  const [showCart, setShowCart] = useState(false);
  const uid = useSelector((state: any) => state.auth.user.uid);
  console.log(uid);
  const showCartHandler = () => {
    setShowCart(true);
  };
  const closeCart = () => {
    setShowCart(false);
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={showCartHandler}>
            cart
            <img src="/add-product_12457780.png" alt="Add to cart" />
          </button>
        </span>
      </div>
      {showCart && <Cart onClose={closeCart} uid={uid} />}
    </>
  );
};

export default CartButton;
