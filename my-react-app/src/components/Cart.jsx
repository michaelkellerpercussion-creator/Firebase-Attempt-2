import React, { useState } from "react";
import { createOrder } from "../services/orderService";

export function Cart({ cartItems, userId, onClearCart }) {
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setSubmitting(true);
    try {
      await createOrder(userId, cartItems, totalPrice);
      alert("🎉 Thanks for your order! It's saved in your order history.");
      onClearCart();
    } catch (err) {
      alert("Could not complete purchase: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#1e293b", margin: "0 0 20px 0" }}>
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
          Your cart is currently empty.
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <strong style={{ color: "#334155" }}>{item.title}</strong>
                  <span style={{ color: "#64748b", marginLeft: "10px" }}>
                    (${parseFloat(item.price).toFixed(2)} × {item.quantity})
                  </span>
                </div>
                <span style={{ fontWeight: "bold", color: "#d97706" }}>
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px dashed #e2e8f0",
              paddingTop: "15px",
            }}
          >
            <h3 style={{ margin: 0, color: "#1e293b" }}>
              Total:{" "}
              <span style={{ color: "#d97706" }}>${totalPrice.toFixed(2)}</span>
            </h3>
            <button
              onClick={handleCheckout}
              disabled={submitting}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#10b981",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
              }}
            >
              {submitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
