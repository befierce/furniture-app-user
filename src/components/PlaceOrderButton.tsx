import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface PlaceOrderButtonProps {
  cartItems: any[];
  uid: string;
  onOrderPlaced: () => void;
}

const PlaceOrderButton = ({
  cartItems,
  uid,
  onOrderPlaced,
}: PlaceOrderButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const placeOrderHandler = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);
    setSuccess(false);
    try {
      await addDoc(collection(db, "orders"), {
        userId: uid,
        items: cartItems,
        status: "pending",
        createdAt: new Date(),
      });

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { cart: [] });

      setSuccess(true);
      onOrderPlaced();
    } catch (err) {
      console.error("Error placing order", err);
      alert("Something went wrong while placing the order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!success && (
        <button onClick={placeOrderHandler} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      )}

      {success && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ✅ Order placed successfully!
        </p>
      )}
    </div>
  );
};

export default PlaceOrderButton;
