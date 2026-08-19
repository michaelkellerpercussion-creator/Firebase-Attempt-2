import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

// Mock Firebase auth & Firestore services
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
      title: "Cozy Knit Sweater",
      price: 49.99,
      description: "Soft wool sweater",
      imageUrl: "https://example.com/sweater.jpg",
    },
  ]),
}));

vi.mock("../services/orderService", () => ({
  getUserOrders: vi.fn().mockResolvedValue([]),
}));

vi.mock("../services/userService", () => ({
  getUserProfile: vi.fn().mockResolvedValue({ name: "Shopper", address: "" }),
}));

describe("Cart Integration Test", () => {
  it('updates the Bag tab count and lists product when "Add to Bag" is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // 1. Verify initial cart bag count is 0
    const bagNavButton = await screen.findByRole("button", {
      name: /🛒 Bag \(0\)/i,
    });
    expect(bagNavButton).toBeInTheDocument();

    // 2. Locate product and click "Add to Bag"
    const addToBagButton = await screen.findByRole("button", {
      name: /🛒 Add to Bag/i,
    });
    await user.click(addToBagButton);

    // 3. Assert Bag counter increases to 1
    expect(
      screen.getByRole("button", { name: /🛒 Bag \(1\)/i }),
    ).toBeInTheDocument();

    // 4. Navigate to Cart view and verify product item details exist
    await user.click(screen.getByRole("button", { name: /🛒 Bag \(1\)/i }));
    expect(screen.getByText("Cozy Knit Sweater")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
  });
});
