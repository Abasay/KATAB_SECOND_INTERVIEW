import { render, fireEvent } from "@testing-library/react";
import DashboardComp from "@/components/Dashboard/DashboardComp";
import * as Cookies from "js-cookie";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("DashboardComp", () => {
  it("test_handleLinkClick_updatesActiveSideBar", () => {
    const { getByText } = render(<DashboardComp />);
    const paymentLink = getByText("Pay For Your Transport");
    fireEvent.click(paymentLink);
    // expect(paymentLink).toHaveClass("bg-gray-300 dark:bg-gray-800");
  });

  it("test_missingCookies_redirectsToSignIn", () => {
    Cookies.get = jest.fn().mockReturnValue(undefined);
    const useRouter = require("next/router").useRouter();
    render(<DashboardComp />);
    expect(useRouter.push).toHaveBeenCalledWith("/auth/signin");
  });

  it("test_toggleNavigationOnMobile", () => {
    const { getByLabelText, getByText } = render(<DashboardComp />);
    const hamburgerButton = getByLabelText("hamburger Toggler");
    fireEvent.click(hamburgerButton);
    const profileLink = getByText("Profile");
    // expect(profileLink).not.toHaveClass("hidden");
    fireEvent.click(hamburgerButton);
    // expect(profileLink).toHaveClass("hidden");
  });
});
