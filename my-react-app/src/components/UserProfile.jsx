import React, { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../services/userService";

export function UserProfile({ currentUser }) {
  const [profile, setProfile] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getUserProfile(currentUser.uid).then((data) => {
        if (data)
          setProfile({ name: data.name || "", address: data.address || "" });
        setLoading(false);
      });
    }
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(currentUser.uid, profile);
      alert("✨ Profile details saved!");
    } catch (err) {
      alert("Could not update details: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure? This will permanently delete your account and profile data.",
      )
    ) {
      try {
        await deleteUserAccount();
        alert("Your account has been deleted.");
      } catch (err) {
        alert("Could not remove account: " + err.message);
      }
    }
  };

  if (loading) return <div>Loading account info...</div>;

  return (
    <div style={{ maxWidth: "450px" }}>
      <h2 style={{ color: "#1e293b", margin: "0 0 20px 0" }}>
        👤 Account & Preferences
      </h2>

      <form
        onSubmit={handleUpdate}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#64748b",
              fontSize: "0.9rem",
            }}
          >
            Email
          </label>
          <input
            type="text"
            value={currentUser.email}
            disabled
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f1f5f9",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#334155",
              fontWeight: "600",
            }}
          >
            Display Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="What should we call you?"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#334155",
              fontWeight: "600",
            }}
          >
            Shipping Address
          </label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            placeholder="Where should items be sent?"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#d97706",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Save Preferences
        </button>
      </form>

      <div
        style={{
          marginTop: "40px",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={handleDeleteAccount}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Close Account Permanently
        </button>
      </div>
    </div>
  );
}
