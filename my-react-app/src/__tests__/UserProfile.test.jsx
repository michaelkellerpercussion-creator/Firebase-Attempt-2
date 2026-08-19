import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserProfile } from "../components/UserProfile";

vi.mock("../services/userService", () => ({
  getUserProfile: vi
    .fn()
    .mockResolvedValue({ name: "Alex", address: "123 Main St" }),
  updateUserProfile: vi.fn().mockResolvedValue(),
  deleteUserAccount: vi.fn().mockResolvedValue(),
}));

describe("UserProfile Component Unit Tests", () => {
  const mockUser = { email: "alex@example.com", uid: "user_123" };

  it("fetches and populates profile inputs correctly", async () => {
    render(<UserProfile currentUser={mockUser} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Alex")).toBeInTheDocument();
      expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
    });
  });

  it("allows updating input values", async () => {
    render(<UserProfile currentUser={mockUser} />);

    await waitFor(() => screen.getByDisplayValue("Alex"));

    const nameInput = screen.getByDisplayValue("Alex");
    fireEvent.change(nameInput, { target: { value: "Alex Smith" } });

    expect(nameInput.value).toBe("Alex Smith");
  });
});
