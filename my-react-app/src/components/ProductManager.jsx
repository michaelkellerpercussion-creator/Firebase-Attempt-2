import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export function ProductManager({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price) return;

    const productPayload = {
      title,
      price: parseFloat(price),
      description,
      imageUrl,
    };

    if (editingId) {
      await updateProduct(editingId, productPayload);
    } else {
      await createProduct(productPayload);
    }

    resetForm();
    loadProducts();
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setTitle(product.title || "");
    setPrice(product.price || "");
    setDescription(product.description || "");
    setImageUrl(product.imageUrl || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this item from the store?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div>
      {/* Add / Edit Product Form */}
      <div
        style={{
          background: "#fffbebf5",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #fde68a",
          marginBottom: "25px",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", color: "#92400e" }}>
          {editingId ? "✏️ Update Item Details" : "➕ Add a New Product"}
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {/* Row 1: Title & Price */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Item Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                flex: "3",
                minWidth: "200px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                flex: "1",
                minWidth: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          {/* Row 2: Image URL */}
          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />

          {/* Row 3: Description */}
          <textarea
            rows="3"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          {/* Form Actions */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#10b981",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {editingId ? "Save Changes" : "Post Item"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "1px solid #94a3b8",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid Display */}
      <h3 style={{ color: "#334155", marginBottom: "15px" }}>
        ✨ Available Items
      </h3>
      {products.length === 0 ? (
        <p style={{ color: "#64748b", fontStyle: "italic" }}>
          No items found yet. Add one above to get started!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "16px",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                overflow: "hidden",
              }}
            >
              <div>
                {/* Product Image */}
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "12px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "120px",
                      background: "#f1f5f9",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#94a3b8",
                      marginBottom: "12px",
                      fontSize: "0.9rem",
                    }}
                  >
                    No Image Available
                  </div>
                )}

                <h4
                  style={{
                    margin: "4px 0 6px 0",
                    fontSize: "1.15rem",
                    color: "#1e293b",
                  }}
                >
                  {p.title}
                </h4>

                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#d97706",
                    margin: "0 0 10px 0",
                  }}
                >
                  ${parseFloat(p.price).toFixed(2)}
                </p>

                {/* Description */}
                {p.description && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      margin: "0 0 15px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    {p.description}
                  </p>
                )}
              </div>

              {/* Card Actions */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <button
                  onClick={() => onAddToCart(p)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🛒 Add to Cart
                </button>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => handleEditClick(p)}
                    style={{
                      flex: 1,
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      background: "#f8fafc",
                      color: "#dc2626",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      flex: 1,
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #fecaca",
                      background: "#fef2f2",
                      color: "#dc2626",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
