import { useEffect,useState } from "react";
import Modal from "./Modal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
interface cartProps {
  uid: string;
  onClose: () => void;
}
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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

  return (
    <Modal onClose={props.onClose}>
      <h2 className="text-lg font-bold mb-2">Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - ₹{item.price} × {item.quantityInCart}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default Cart;
