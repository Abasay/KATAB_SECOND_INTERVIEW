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
  const [navigationOpen, setNavigationOpen] = useState(false);

  const userEmail = Cookies.get("c&m-userEmail");
  const token = Cookies.get("c&m-token");
  const isLoggedIn = Cookies.get("c&m-isLoggedIn");
  if (!isLoggedIn || !token || !userEmail) router.push("/auth/signin");

  const [activeSideBar, setActiveSideBar] = useState("");
  const handleLinkClick = (hash: string) => {
    setActiveSideBar(hash);
  };

  useEffect(() => {
    setActiveSideBar(window.location.hash);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-row gap-10 pt-20 max-md:flex-col">
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
      <div className="fixed top-18 max-h-[100px]  w-full border-r  bg-gray-100/40 dark:bg-gray-800/40 md:hidden">
        <div className="flex h-full max-h-screen flex-col gap-0">
          <div className="flex h-[90px] items-center border-b px-5 max-md:justify-between">
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

            <button
              aria-label="hamburger Toggler"
              className="block md:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="absolute right-0 block h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !navigationOpen ? "!w-full delay-300" : "w-0"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !navigationOpen ? "delay-400 !w-full" : "w-0"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !navigationOpen ? "!w-full delay-500" : "w-0"
                    }`}
                  ></span>
                </span>
                <span className="du-block absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>
          <div
            className={
              navigationOpen
                ? "flex-1 overflow-auto "
                : "hidden flex-1 overflow-auto "
            }
          >
            <nav className="grid items-start text-[16px] font-medium max-md:bg-gray-400">
              <Link
                onClick={() => handleLinkClick("")}
                href={"/dashboard"}
                className={clsx(
                  "flex items-center gap-3 rounded-md  px-3 py-2 text-gray-900  transition-all hover:bg-gray-400  dark:text-gray-50 dark:hover:text-gray-50",
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
      <div className=" max-md:mt-25 md:ml-60 md:overflow-hidden">
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
