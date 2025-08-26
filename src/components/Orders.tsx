import { useEffect, useState } from "react";
import Modal from "./Modal";
import { firebaseConfig } from "../firebaseConfig";
// import { useSelector } from "react-redux";
import "./Order.css";
interface orderProps {
  uid: string;
  onClose: () => void;
}
interface OrderItem {
  status: string;
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
        const formatDataStage1 = data.filter((doc: any) => doc.document);

        console.log("format data stage 1", formatDataStage1);

        const formatDataStage2 = formatDataStage1.map((order: any) => {
          return {
            status: order.document.fields.status.stringValue,
            items: order.document.fields.items.arrayValue.values,
          };
        });

        console.log("format data stage 2", formatDataStage2);
        const formatDataStage3 = formatDataStage2.map((i: any) => {
          return {
            status: i.status,
            productDetails: i.items.map((f: any) => {
              return {
                quantityInCart: f.mapValue.fields.quantityInCart.integerValue,
                title: f.mapValue.fields.title.stringValue,
                price: f.mapValue.fields.price.integerValue || f.mapValue.fields.price.stringValue,
                imageUrl: f.mapValue.fields.imageUrl.stringValue,
              };
            }),
          };
        });
        console.log("format data stage 3", formatDataStage3);

        const formattedData = formatDataStage3.flatMap((order: any) =>
          order.productDetails.map((p: any) => ({
            status: order.status,
            ...p,
          }))
        );

        console.log("format data final", formattedData);
        setOrderItems(formattedData);
      } catch (error) {}
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    console.log("updated item details", orderItems);
  }, [orderItems]);
  return (
    <>
      <Modal onClose={props.onClose}>
        <div className="modal">
          <div className="modal-header">
            <span>Your Orders</span>
            <button
              className="modal-close"
              aria-label="Close"
              onClick={props.onClose}
            >
              ×
            </button>
          </div>

          <div className="orders">
            <h2 className="orders-title">Recent items</h2>

            {orderItems.length === 0 ? (
              <div className="empty">No orders found.</div>
            ) : (
              <ul className="orders-list">
                {orderItems.map((item, idx) => (
                  <li className="order-item" key={idx}>
                    <img
                      className="order-thumb"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <div className="order-info">
                      <div className="order-title">{item.title}</div>
                      <div className="order-meta">
                        <span>
                          Qty: <strong>{item.quantityInCart}</strong>
                        </span>
                        <span>
                          Price: <strong>₹{item.price}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="order-side">
                      <span
                        className={`status-badge ${
                          (
                            {
                              pending: "status-pending",
                              paid: "status-paid",
                              shipped: "status-shipped",
                              delivered: "status-delivered",
                              cancelled: "status-cancelled",
                            } as Record<string, string>
                          )[String(item.status).toLowerCase()] ||
                          "status-pending"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="order-price">₹{item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Orders;
