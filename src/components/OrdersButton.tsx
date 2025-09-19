import styles from "./CartButton.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Orders from "./Orders";

const OrdersButton = () => {
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
       <div className={styles.buttonContainer}>
        <span className={styles.cartButtonSpan}>
          <button onClick={showOrdersHandler}>
            orders 
          </button>
        </span>
      </div>
      {showOrders && <Orders onClose={closeOrders} uid={uid} />}
    </>
  );
};

export default OrdersButton;
