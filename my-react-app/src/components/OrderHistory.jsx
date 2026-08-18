import React, { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

export function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (userId) {
      getUserOrders(userId).then(setOrders);
    }
  }, [userId]);

  return (
    <div>
      <h2 style={{ color: "#1e293b", margin: "0 0 20px 0" }}>
        📦 Your Order Receipts
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>You haven't placed any orders yet!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#ffffff",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontWeight: "bold",
                    color: "#334155",
                  }}
                >
                  Order #{order.id.slice(0, 8)}
                </p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#d97706",
                  }}
                >
                  ${order.totalPrice.toFixed(2)}
                </span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup for Details */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#white",
              backgroundColor: "#ffffff",
              padding: "25px",
              borderRadius: "16px",
              maxWidth: "450px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#1e293b" }}>Order Details</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              ID: {selectedOrder.id}
            </p>

            <div
              style={{
                margin: "15px 0",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "10px",
              }}
            >
              {selectedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>
                    {item.title} (x{item.quantity || 1})
                  </span>
                  <strong>
                    $
                    {(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "2px solid #e2e8f0",
                paddingTop: "10px",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textAlign: "right",
                  margin: "0 0 15px 0",
                }}
              >
                Total: ${selectedOrder.totalPrice.toFixed(2)}
              </p>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#475569",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
