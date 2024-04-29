"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ThemeToggler from "./ThemeToggler";
import ToasterContext from "@/app/context/ToastContext";
import { check } from "prettier";
import toast from "react-hot-toast";
import { signOut } from "../SignOut/signOut";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [image, setImage] = useState("");

  const pathUrl = usePathname();
  const router = useRouter();

  const checkSignedIn = (item) => {
    return item.title !== "Sign Up" && item.title !== "Sign In"
      ? true
      : Cookies.get("c&m-token")
      ? false
      : true;
  };

  const checkIsAdmin = (item) => {
    return item.title === "Admin Panel" && isAdmin ? true : false;
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  const userEmail = Cookies.get("c&m-userEmail");
  const [isAdmin, setIsAdmin] = useState(false);
  const token = Cookies.get("c&m-token");
  console.log(userEmail);

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (request.status === 401) {
        Cookies.remove("c&m-token");
        Cookies.remove("c&m-userEmail");
        Cookies.remove("c&m-isLoggedIn");
      }
      const response = await request.json();
      console.log(response.data);
      if (response.success) {
        setIsAdmin(response.data.user.isAdmin);
        console.log(isAdmin);
      }
    })();
  }, [pathUrl]);

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (request.status === 401) {
        Cookies.remove("c&m-token");
        Cookies.remove("c&m-userEmail");
        Cookies.remove("c&m-isLoggedIn");
      }
      const response = await request.json();
      console.log(response.data);
      if (response.success) {
        setImage(response.data.user.profileImg);
        setIsAdmin(response.data.user.isAdmin);
        console.log(isAdmin);
      }
    })();
  }, []);
  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full bg-transparent bg-opacity-60 bg-[url(/images/hero/bus_7.jpg)] py-5 ${
        stickyMenu
          ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between overflow-hidden px-4 md:flex  md:px-8 2xl:px-0">
        <div className="flex w-full items-center justify-between md:w-1/4">
          <a href="/" className="flex flex-row items-center gap-1">
            <img
              src="/images/logo/logo.png"
              alt="logo"
              className=" h-[40px] w-[40px] rounded-full dark:hidden"
            />
            <span className="max-w-[200px] text-xl font-bold text-white">
              {" "}
              C&M SERVICES
            </span>
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
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
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible  h-0 w-full items-center justify-between overflow-hidden md:visible md:flex md:h-auto md:w-full ${
            navigationOpen &&
            "navbar !visible  h-auto  overflow-hidden   bg-[url(/images/hero/bus_7.jpg)]  dark:bg-blacksection  xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="flex gap-5 xl:flex-row xl:items-center xl:gap-10"></ul>
          </nav>

          <div className=" flex gap-6 overflow-hidden text-white max-md:ml-4 max-md:mt-5 max-md:flex-col ">
            {!token && (
              <Link
                href={`/auth/signup`}
                className={
                  pathUrl === "/auth/signup"
                    ? "rounded-md border border-slate-300 bg-white px-2 text-black "
                    : `hover:translate-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                        navigationOpen &&
                        "rounded-md shadow-solid-2 transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                      }`
                }
              >
                Create An Account
              </Link>
            )}

            <Link
              href={`/about`}
              className={
                pathUrl === "/about"
                  ? "rounded-md border border-slate-300 bg-white px-2 text-black "
                  : `hover:translate-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                      navigationOpen &&
                      "rounded-md shadow-solid-2 transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                    }`
              }
            >
              About
            </Link>

            <Link
              href={`/support`}
              className={
                pathUrl === "/support"
                  ? "rounded-md border border-slate-300 bg-white px-2 text-black "
                  : `hover:translate-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                      navigationOpen &&
                      "rounded-md shadow-solid-2 transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                    }`
              }
            >
              Support
            </Link>
            {!token && (
              <Link
                href={`/auth/signin`}
                className={
                  pathUrl === "/auth/signin"
                    ? "rounded-md border border-slate-300 bg-white px-2 text-black "
                    : `hover:translate-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                        navigationOpen &&
                        "rounded-md shadow-solid-2 transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                      }`
                }
              >
                Sign In
              </Link>
            )}
            {token && userEmail && (
              <Link
                href={`/dashboard`}
                className={
                  pathUrl === "/dashboard"
                    ? "flex flex-row items-center gap-2 rounded-md border border-slate-300 bg-white px-2 text-black "
                    : `hover:translate-2 flex flex-row items-center gap-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                        navigationOpen &&
                        "rounded-md shadow-solid-2  transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                      }`
                }
              >
                <img
                  src={image}
                  alt="User Image"
                  className="h-4 w-4 rounded-full"
                />
                Dashboard
              </Link>
            )}

            {token && userEmail && (
              <button
                onClick={() => signOut(router, Cookies)}
                className={
                  pathUrl === ""
                    ? "flex flex-row items-center gap-2 rounded-md border border-slate-300 bg-white px-2 text-black "
                    : `hover:translate-2 flex flex-row items-center gap-2 rounded-md px-2 transition hover:animate-pulse hover:bg-white hover:text-black ${
                        navigationOpen &&
                        "rounded-md shadow-solid-2  transition hover:w-[90%] hover:translate-x-4 hover:bg-white hover:px-3"
                      }`
                }
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
      <ToasterContext />
    </header>
  );
};

// w-full delay-300

export default Header;
