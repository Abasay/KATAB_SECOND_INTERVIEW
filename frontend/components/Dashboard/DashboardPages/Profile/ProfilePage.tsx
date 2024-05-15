// Importing necessary modules from React and other libraries
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { signOut } from "@/components/SignOut/signOut";

// Define a functional component named ProfilePage
const ProfilePage = () => {
  // Retrieving token and user email from cookies
  const token = Cookies.get("c&m-token");
  const userEmail = Cookies.get("c&m-userEmail");

  // Declaring state variables for profile image, name, and sign-up method
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [signupMethod, setSignupMethod] = useState("Email");

  //Router Instance
  const router = useRouter();

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
                  height="100px"
                  width="100px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 511.995 511.995"
                  xmlSpace="preserve"
                >
                  <circle
                    style={{ fill: "#006775" }}
                    cx="255.997"
                    cy="255.997"
                    r="255.997"
                  />
                  <path
                    style={{ fill: "#055661" }}
                    d="M293.428,509.223l-175.147-178.7l284.987-173.924l108.509,108.509
  c-4.443,124.502-97.735,226.346-218.349,244.005L293.428,509.223L293.428,509.223z"
                  />
                  <path
                    style={{ fill: "#FFDA45" }}
                    d="M123.724,141.938h260.331c9.108,0,16.548,7.442,16.548,16.548v153.488
  c0,9.108-7.442,16.548-16.548,16.548h-39.316l-29.099,36.428l-29.099-36.428H123.724c-9.108,0-16.548-7.442-16.548-16.548V158.487
  C107.176,149.38,114.617,141.938,123.724,141.938z"
                  />
                  <path
                    style={{ fill: "#00CC96" }}
                    d="M159.708,245.338h1.999l11.883-6.442l1.888-7.553c-2.777-2.888-5.776-7.664-8.441-13.66
  c-0.222,0-0.444,0-0.666,0c-3.11,0-6.22-3.443-6.886-7.664c-0.555-3.332,0.555-6.109,2.555-7.219
  c-2.666-13.549-4.443-34.318,18.881-39.427c13.994-3.11,18.992,7.664,19.547,8.885c8.441-4.776,13.883,2.332,15.215,6.109
  c2.555,6.775,1.666,19.436,0.444,25.1c1.444,1.333,2.11,3.776,1.666,6.553c-0.666,4.11-3.665,7.553-6.775,7.664
  c-2.444,5.442-5.887,10.107-9.219,13.549l1.888,7.553h0.111l11.55,6.442h2.221c15.215,0,27.655,11.994,27.655,26.544v21.546H131.943
  v-21.546c0-14.66,12.439-26.544,27.655-26.544L159.708,245.338z"
                  />
                  <path
                    style={{ fill: "#FFFFFF" }}
                    d="M258.11,180.255h111.841v10.439H258.11V180.255z M258.11,242.783h55.975v10.439H258.11V242.783z
   M258.11,221.904h111.841v10.439H258.11V221.904z M258.11,201.024h111.841v10.439H258.11V201.024z"
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
                <button
                  onClick={() => signOut(router, Cookies)}
                  className="focus:shadow-outline rounded bg-red-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Log Out
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
