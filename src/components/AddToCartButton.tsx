import styles from "./AddToCartButton.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddToCartButton = (props: any) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const productId = props.product.id;
  const productDetails = props.product.product;
  const uid = useSelector((state: any) => state.auth.user?.uid);
  console.log("uid of user", uid);
  const addToCartHandler = async () => {
    if (!isLoggedIn) {
      setShowLoginForm(true);
      return;
    }
    console.log("button clicked", productId, productDetails);
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        let cart = userData.cart || [];

        const existingIndex = cart.findIndex(
          (item: any) => item.productId === productId
        );

        if (existingIndex !== -1) {
          cart[existingIndex].quantityInCart += 1;
        } else {
          cart.push({ productId, ...productDetails, quantityInCart: 1 });
        }
        await updateDoc(userRef, { cart });
        console.log("✅ Cart updated successfully");
        window.alert("cart updated");
      }
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      window.alert("cart updation failed");
    }
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <span className={styles.addToCartButtonSpan}>
          <button onClick={addToCartHandler}>
            Add to cart
            <img src="/add-product_12457780.png" alt="Add to cart" />
          </button>
        </span>
      </div>

      {showLoginForm && <LoginForm onClose={closeLoginForm} />}
    </>
  );
};

export default AddToCartButton;
