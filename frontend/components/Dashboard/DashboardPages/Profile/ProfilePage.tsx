// Importing necessary modules from React and other libraries
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Define a functional component named ProfilePage
const ProfilePage = () => {
  // Retrieving token and user email from cookies
  const token = Cookies.get("c&m-token");
  const userEmail = Cookies.get("c&m-userEmail");

  // Declaring state variables for profile image, name, and sign-up method
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [signupMethod, setSignupMethod] = useState("Email");

  // useEffect hook to fetch user data when component mounts
  useEffect(() => {
    (async () => {
      // Fetch user data from the server
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Handling unauthorized access
      if (request.status === 401) {
        Cookies.remove("c&m-token");
        Cookies.remove("c&m-userEmail");
        Cookies.remove("c&m-isLoggedIn");
      }

      // Parsing the response JSON
      const response = await request.json();
      //console.log(response.data);

      // Updating state variables with user data if request is successful
      if (response.success) {
        setImage(response.data.user.profileImg);
        setName(response.data.user.name);
        setSignupMethod(response.data.user.signInMethod);
      }
    })();
  }, []); // Empty dependency array to ensures useEffect  only run  once after initial render

  // The JSX markup for the profile page UI
  return (
    <>
      <div className="w-[700px pl-20">
        <div className="mx-auto w-full py-8">
          <div className="rounded-lg bg-white ">
            <h2 className="flex flex-row items-center gap-4 p-7 text-3xl font-bold tracking-wider text-black">
              <span>
                {/* SVG icon for profile */}
                <svg
                  width="100px"
                  height="100px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG paths for icon */}
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
                  {/* Displaying profile image */}
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
                {/* Button to delete account */}
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

// Exporting the ProfilePage component as default
export default ProfilePage;
