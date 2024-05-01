import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const token = Cookies.get("c&m-token");
  const userEmail = Cookies.get("c&m-userEmail");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [signupMethod, setSignupMethod] = useState("Email");
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
        setName(response.data.user.name);
        setSignupMethod(response.data.user.signInMethod);
      }
    })();
  }, []);
  return (
    <>
      <div className="w-[700px pl-20">
        <div className="mx-auto w-full py-8">
          <div className="rounded-lg bg-white ">
            <h2 className="flex flex-row items-center gap-4 p-7 text-3xl font-bold tracking-wider text-black">
              <span>
                <svg
                  width="100px"
                  height="100px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    opacity="0.34"
                    d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="flex flex-col gap-2 ">
                Your Profile
                <span className=" text-xs font-medium">
                  Your Profile Details are here.
                </span>
              </span>
            </h2>

            <div className="mb-10 w-full px-4 py-6">
              <div className="mb-10 flex justify-between pr-10">
                <div className="mr-4 ">
                  <img
                    src={image}
                    alt="Profile Image"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Full Name</h2>
                  <p className="text-gray-600">{name}</p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-lg font-semibold">Email</h2>
                <p className="text-gray-600">{userEmail}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold">Sign-In Method</h2>
                <p className="text-gray-600">{signupMethod}</p>
              </div>

              <div className="text-right">
                <button className="focus:shadow-outline rounded bg-red-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
