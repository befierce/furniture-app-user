import { useEffect, useState } from "react";
import Modal from "./Modal";
import { firebaseConfig } from "../firebaseConfig";
// import { useSelector } from "react-redux";
interface orderProps {
  uid: string;
  onClose: () => void;
}
interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantityInCart: number;
  imageUrl: string;
}
const Orders = (props: orderProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const uid = props.uid;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery`;
        const body = {
          structuredQuery: {
            from: [{ collectionId: "orders" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "userId" },
                op: "EQUAL",
                value: { stringValue: uid },
              },
            },
          },
        };
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log("orders fetched", data);
        const formattedData: OrderItem[] = data
          .filter((doc: any) => doc.document)
          .map((order: any) => {
            console.log("status", order.document.fields.status.stringValue);    
            console.log(
              "quantity in cart",
              order.document.fields.items.arrayValue.values[0].mapValues.fields.quantityInCart
            );
          });
        console.log("format data", formattedData);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Modal onClose={props.onClose}>"here are your orders"</Modal>
    </>
  );
};

export default Orders;
