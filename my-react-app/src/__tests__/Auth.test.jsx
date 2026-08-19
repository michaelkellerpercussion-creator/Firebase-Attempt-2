import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Auth } from "../components/Auth";

// Mock Firebase services to maintain test determinism
vi.mock("../services/userService", () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
}));

describe("Auth Component Unit Tests", () => {
  it("renders login form by default for unauthenticated users", () => {
    render(<Auth currentUser={null} />);

    expect(screen.getByText(/Welcome Back:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it("switches between Sign In and Registration modes on button click", () => {
    render(<Auth currentUser={null} />);

    const switchBtn = screen.getByRole("button", {
      name: /Need an account\?/i,
    });
    fireEvent.click(switchBtn);

    expect(screen.getByText(/Join Us:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i }),
    ).toBeInTheDocument();
  });

  it("displays user email and logout button when logged in", () => {
    const mockUser = { email: "test@example.com", uid: "123" };
    render(<Auth currentUser={mockUser} />);

    expect(
      screen.getByText(/Welcome back, test@example.com!/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Out/i }),
    ).toBeInTheDocument();
  });
});
