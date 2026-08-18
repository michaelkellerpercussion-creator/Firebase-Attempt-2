import React, { useState } from "react";
import { registerUser, loginUser, logoutUser } from "../services/userService";

export function Auth({ currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(email, password, { name });
        alert("Welcome! 🎉 Your account is ready.");
      } else {
        await loginUser(email, password);
      }
    } catch (err) {
      alert("Oops: " + err.message);
    }
  };

  if (currentUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span
          style={{ fontSize: "1.05rem", fontWeight: "600", color: "#78350f" }}
        >
          Welcome back, {currentUser.email}! 👋
        </span>
        <button
          onClick={logoutUser}
          style={{
            padding: "8px 16px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{ fontWeight: "bold", color: "#78350f", marginRight: "5px" }}
      >
        {isRegistering ? "Join Us:" : "Welcome Back:"}
      </span>
      {isRegistering && (
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={primaryButtonStyle}>
        {isRegistering ? "Create Account" : "Sign In"}
      </button>
      <button
        type="button"
        onClick={() => setIsRegistering(!isRegistering)}
        style={secondaryButtonStyle}
      >
        {isRegistering ? "Already have an account?" : "Need an account?"}
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #fcd34d",
  outline: "none",
};

const primaryButtonStyle = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#d97706",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #d97706",
  backgroundColor: "transparent",
  color: "#92400e",
  cursor: "pointer",
};
