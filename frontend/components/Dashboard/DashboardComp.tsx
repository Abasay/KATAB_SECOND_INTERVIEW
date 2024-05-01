"use client";
// import "../../globals.css";
import Link from "next/link";
// import { User } from "./user";

import {
  Logo,
  SettingsIcon,
  UsersIcon,
  VercelLogo,
} from "@/public/images/icons/icons";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import PaymentPage from "./DashboardPages/PaymentPage";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import TransactionHistory from "./DashboardPages/TransactionHistory/TransactionHistory";
import RewardsAndCashbackHistory from "./DashboardPages/Rewards&Cashbacks/Rewards&Cashbacks";
import ProfilePage from "./DashboardPages/Profile/ProfilePage";

const DashboardComp = () => {
  const pathname = usePathname();
  const router = useRouter();

  const userEmail = Cookies.get("c&m-userEmail");
  const token = Cookies.get("c&m-token");
  const isLoggedIn = Cookies.get("c&m-isLoggedIn");
  // if (!isLoggedIn || !token || !userEmail) router.push("/auth/signin");

  const [activeSideBar, setActiveSideBar] = useState("");
  const handleLinkClick = (hash: string) => {
    setActiveSideBar(hash);
  };

  useEffect(() => {
    setActiveSideBar(window.location.hash);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-row gap-10 pt-20">
      <div className="fixed top-18 hidden h-[100vh] border-r bg-gray-100/40 dark:bg-gray-800/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[90px] items-center border-b px-5">
            <Link
              onClick={() => setActiveSideBar(window.location.hash)}
              className="flex items-center gap-2 pb-2 pt-4 font-semibold"
              href="/"
            >
              <img
                src="/images/logo/logo.png"
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <span className="">C&M Services</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-[16px] font-medium">
              <Link
                onClick={() => handleLinkClick("")}
                href={"/dashboard"}
                className={clsx(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50",
                  {
                    "bg-gray-300 hover:bg-gray-200 dark:bg-gray-800":
                      activeSideBar === "",
                  },
                )}
              >
                Profile
              </Link>
              <Link
                onClick={() => handleLinkClick("#payment")}
                href={"#payment"}
                className={clsx(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50",
                  {
                    "bg-gray-300 dark:bg-gray-800":
                      activeSideBar === "#payment",
                  },
                )}
              >
                Pay For Your Transport
              </Link>
              <Link
                onClick={() => handleLinkClick("#transaction-history")}
                href={"#transaction-history"}
                className={clsx(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50",
                  {
                    "bg-gray-300 hover:bg-gray-200 dark:bg-gray-800":
                      activeSideBar === "#transaction-history",
                  },
                )}
              >
                Transaction History
              </Link>
              <Link
                onClick={() => handleLinkClick("#rewards&cashbacks")}
                href={"#rewards&cashbacks"}
                className={clsx(
                  "flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50",
                  {
                    "bg-gray-300 dark:bg-gray-800":
                      activeSideBar === "#rewards&cashbacks",
                  },
                )}
              >
                Cashbacks & Miles Points
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className=" md:ml-60 md:overflow-hidden">
        {activeSideBar === "" && <ProfilePage />}
        {activeSideBar === "#payment" && <PaymentPage />}
        {activeSideBar === "#transaction-history" && (
          <div className=" w-full overflow-hidden">
            <TransactionHistory />
          </div>
        )}
        {activeSideBar === "#rewards&cashbacks" && (
          <RewardsAndCashbackHistory />
        )}
      </div>
    </div>
  );
};

export default DashboardComp;
