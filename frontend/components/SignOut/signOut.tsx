import toast from "react-hot-toast";

export const signOut = (router, Cookies) => {
  toast.error("You are successfully logged out.", {
    duration: 1000,
    position: "top-right",
  });
  Cookies.remove("c&m-token");
  Cookies.remove("c&m-userEmail");
  Cookies.remove("c&m-isLoggedIn");
  router.refresh();

  return true;
};

export const signOutAunthorized = (router, Cookies) => {
  toast.error("You are not authorized to perform this action.");
  Cookies.remove("c&m-token");
  Cookies.remove("c&m-userEmail");
  Cookies.remove("c&m-isLoggedIn");
  router.refresh();

  return true;
};

export const signOutUnauthorized = (router, Cookies) => {
  toast.error(
    "You are not authorized to access this page. Kindly Contact the Admin for more information",
  );
  Cookies.remove("c&m-token");
  Cookies.remove("c&m-userEmail");
  Cookies.remove("c&m-isLoggedIn");
  router.refresh();

  return true;
};
