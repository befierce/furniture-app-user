import { useEffect, useState } from "react";
import Modal from "./Modal";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "./Cart.module.css";
interface cartProps {
  uid: string;
  onClose: () => void;
}
interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantityInCart: number;
  imageUrl: string;
}
const Cart = (props: cartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const uid = props.uid;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRef = doc(db, "users", uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log("data in the cart", data);
          const items = (data.cart || []) as CartItem[];
          setCartItems(items);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const removeItemHandler = async (productId: string) => {
    console.log(productId);
    const userRef = doc(db, "users", uid);
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    try {
      await updateDoc(userRef, { cart: updatedCart });
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={styles.heading}>Cart</div>
      <div className={styles.cartItemsWrapper}>
        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>No items in your cart.</p>
        ) : (
          <ul>
            {cartItems.map((item, id) => (
              <div className={styles.cartItemContainer}>
                <li key={id}>
                  <div className={styles.upperDivision}>
                    <div className={styles.productImageContainer}>
                      <img src={item.imageUrl}></img>
                    </div>

                    <div className={styles.itemDataContainer}>
                      <div
                        className={styles.itemTitlePriceAndQuantityContainer}
                      >
                        <div className={styles.itemTitleContainer}>
                          {item.title}
                        </div>
                        <div className={styles.itemPriceAndQuantityContainer}>
                          <div className={styles.priceContainer}>
                            ₹{item.price}
                          </div>
                          {"\u00D7"}
                          <div className={styles.quantityContainer}>
                            {item.quantityInCart}
                          </div>
                        </div>
                      </div>
                      <div className={styles.totalPriceContainer}>
                        <div>Total</div>
                        <div className={styles.totalPrice}>
                          {item.price * item.quantityInCart}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.lowerDivision}>
                    <div className={styles.removeButtonContainer}>
                      <button
                        className={styles.removeButton}
                        onClick={() => {
                          removeItemHandler(item.productId);
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.quantityContainer}>
                      <button className={styles.quantityButton}>-</button>
                      <div className={styles.lowereSectionQuantity}>
                        {item.quantityInCart}
                      </div>
                      <button className={styles.quantityButton}>+</button>
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
