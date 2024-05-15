import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SigninPage from "@/app/(site)/auth/signin/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  promise: jest.fn(),
}));

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: jest.fn(),
}));

describe("Signin Component", () => {
  const mockPush = jest.fn();
  const mockGoogleLogin = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useGoogleLogin as jest.Mock).mockReturnValue(mockGoogleLogin);
    (Cookies.get as jest.Mock).mockImplementation((key) => {
      if (key === "c&m-userEmail") return "test@example.com";
      if (key === "c&m-isLoggedIn") return "true";
      if (key === "c&m-token") return "test-token";
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Signin component", () => {
    render(<SigninPage />);

    expect(screen.getByText("Login to Your Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login with email and password/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /signin using google/i }),
    ).toBeInTheDocument();
  });

  test("handles email and password login", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue({ success: true, data: { token: "test-token" } }),
    } as any);

    render(<SigninPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /login with email and password/i }),
    );

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith(
        "c&m-userEmail",
        "test@example.com",
      );
      expect(Cookies.set).toHaveBeenCalledWith("c&m-isLoggedIn", true);
      expect(Cookies.set).toHaveBeenCalledWith("c&m-token", "test-token");
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(toast.promise).toHaveBeenCalled();
    });

    mockFetch.mockRestore();
  });

  test("handles Google login", async () => {
    mockGoogleLogin.mockImplementation(({ onSuccess }) => {
      onSuccess({ access_token: "google-access-token", token_type: "Bearer" });
    });

    const mockFetch = jest
      .spyOn(global, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              email: "google@example.com",
              picture: "pic-url",
              name: "Google User",
            }),
        } as any),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({ success: true, data: { token: "google-token" } }),
        } as any),
      );

    render(<SigninPage />);

    fireEvent.click(
      screen.getByRole("button", { name: /signin using google/i }),
    );

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith(
        "c&m-userEmail",
        "google@example.com",
      );
      expect(Cookies.set).toHaveBeenCalledWith("c&m-isLoggedIn", true);
      expect(Cookies.set).toHaveBeenCalledWith("c&m-token", "google-token");
      expect(mockPush).toHaveBeenCalledWith("/");
    });

    mockFetch.mockRestore();
  });

  test("shows error toast if already logged in", () => {
    render(<SigninPage />);

    expect(toast.error).toHaveBeenCalledWith("You are logged in...");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("shows error toast on login failure", async () => {
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        success: false,
        data: { message: "Login failed" },
      }),
    } as any);

    render(<SigninPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /login with email and password/i }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login failed");
    });

    mockFetch.mockRestore();
  });
});
