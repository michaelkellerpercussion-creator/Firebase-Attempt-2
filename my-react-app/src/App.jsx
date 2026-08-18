import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Auth } from "./components/Auth";
import { UserProfile } from "./components/UserProfile";
import { ProductManager } from "./components/ProductManager";
import { Cart } from "./components/Cart";
import { OrderHistory } from "./components/OrderHistory";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.3rem",
          fontWeight: "bold",
          color: "#d97706",
        }}
      >
        ✨ Loading your Firebase shop...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff7ed 0%, #fde68a 100%)", // Bright warmth gradient
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1e293b",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.85)", // Semi-transparent glass container
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(217, 119, 6, 0.15)",
        }}
      >
        {/* App Header */}
        <header style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "2.8rem",
              color: "#d97706",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            🔥 Firebase Shop
          </h1>
          <p
            style={{
              margin: 0,
              color: "#78350f",
              fontSize: "1.15rem",
              fontWeight: "500",
            }}
          ></p>
        </header>

        {/* Auth Banner */}
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)",
            borderRadius: "16px",
            marginBottom: "25px",
            boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)",
          }}
        >
          <Auth currentUser={currentUser} />
        </div>

        {currentUser ? (
          <>
            {/* Friendly Navigation */}
            <nav
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "25px",
                flexWrap: "wrap",
              }}
            >
              {[
                { id: "products", label: "Storefront" },
                {
                  id: "cart",
                  label: `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`,
                },
                { id: "orders", label: "Past Orders" },
                { id: "profile", label: "Account & Prefarences" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "12px 22px",
                    borderRadius: "20px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    transition: "all 0.2s ease",
                    backgroundColor:
                      activeTab === tab.id ? "#d97706" : "#ffffff",
                    color: activeTab === tab.id ? "#ffffff" : "#78350f",
                    boxShadow:
                      activeTab === tab.id
                        ? "0 6px 16px rgba(217, 119, 6, 0.35)"
                        : "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Active View */}
            <main
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "18px",
                border: "1px solid #fef3c7",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              {activeTab === "products" && (
                <ProductManager onAddToCart={addToCart} />
              )}
              {activeTab === "cart" && (
                <Cart
                  cartItems={cart}
                  userId={currentUser.uid}
                  onClearCart={clearCart}
                />
              )}
              {activeTab === "orders" && (
                <OrderHistory userId={currentUser.uid} />
              )}
              {activeTab === "profile" && (
                <UserProfile currentUser={currentUser} />
              )}
            </main>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#ffffff",
              borderRadius: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <h2 style={{ color: "#78350f", marginTop: 0 }}>Welcome! 👋</h2>
            <p style={{ color: "#92400e" }}>
              Sign in or register above to explore items, manage your bag, and
              view past orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
