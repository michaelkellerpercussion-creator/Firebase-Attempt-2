import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

// Firebase auth & Firestore services
vi.mock("../firebase", () => ({
  auth: {},
  db: {},
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ uid: "test-user-id", email: "shopper@example.com" });
    return vi.fn();
  }),
}));

vi.mock("../services/productService", () => ({
  fetchProducts: vi.fn().mockResolvedValue([
    {
      id: "prod-1",
      title: "Knit Sweater",
      price: 49.99,
      description: "wool sweater",
      imageUrl: "https://example.com/sweater.jpg",
    },
  ]),
}));

vi.mock("../services/orderService", () => ({
  getUserOrders: vi.fn().mockResolvedValue([]),
}));

vi.mock("../services/userService", () => ({
  getUserProfile: vi.fn().mockResolvedValue({ name: "Shopper", address: "" }),
  registerUser: vi.fn(),
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
}));

describe("Cart Integration Test", () => {
  it('updates the Cart tab count and lists product when "Add to Cart" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Verify initial cart count is 0
    const bagNavButton = await screen.findByRole("button", {
      name: /Cart \(0\)/i,
    });
    expect(bagNavButton).toBeInTheDocument();

    // Locate product and click "Add to Cart"
    const addToBagButton = await screen.findByRole("button", {
      name: /Add to Cart/i,
    });
    await user.click(addToBagButton);

    // Cart counter increases to 1
    expect(
      screen.getByRole("button", { name: /Cart \(1\)/i }),
    ).toBeInTheDocument();

    // 4. Navigate to CArt and verify product item exist
    await user.click(screen.getByRole("button", { name: /Cart \(1\)/i }));
    expect(screen.getByText("Knit Sweater")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
