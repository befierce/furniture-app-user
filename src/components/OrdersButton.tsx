// import styles from "./CartButton.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Orders from "./Orders";

const OrdersButton = (props: any) => {
  const [showOrders, setShowOrders] = useState(false);
  const uid = useSelector((state: any) => state.auth.user.uid);
  const showOrdersHandler = () => {
    setShowOrders(true);
  };
  const closeOrders = () => {
    setShowOrders(false);
  };
  return (
    <>
      <button onClick={showOrdersHandler}>orders button</button>
      {/* <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={showCartHandler}>
            cart
            <img src="/add-product_12457780.png" alt="Add to cart" />
          </button>
        </span>
      </div>}
      {showCart && <Cart onClose={closeCart} uid={uid} />} */}
      {showOrders && <Orders onClose={closeOrders} uid={uid} />}
    </>
  );
};

export default OrdersButton;
