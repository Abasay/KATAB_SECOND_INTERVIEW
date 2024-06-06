"use client"; // Specifies that this file is for client-side execution
import { motion } from "framer-motion"; // Import motion from Framer Motion library
import Image from "next/image"; // Import Image component from Next.js
import Link from "next/link"; // Import Link component from Next.js
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import Cookies from "js-cookie"; // Import Cookies library for handling cookies
import toast from "react-hot-toast"; // Import toast for displaying notifications
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for routing
import { useGoogleLogin } from "@react-oauth/google"; // Import useGoogleLogin hook for Google OAuth
import Swal from "sweetalert2"; // Import Swal for displaying alert messages
import Footer from "../Footer";
import { URLS } from "@/lib/urls";
import { encryptSymmetric } from "@/middlewares/encrypt";

/**
 * Signin component for handling user signin functionality.
 */
const Signin = () => {
  // State variables for email and password fields
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Retrieve user email, login status, and token from cookies
  const email = Cookies.get("c&m-userEmail");
  const isLoggedIn = Cookies.get("c&m-isLoggedIn");
  const token = Cookies.get("c&m-token");

  // State variables for success, error, and successSignIn
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successSignIn, setSuccessSignIn] = useState(false);
  const [forgetPasswd, setForgetPasswd] = useState(false)
  const [enterToken, setEnterToken] = useState(false)
   const [secret, setSecret] = useState<string>('');
  const [tokenNew, setToken] = useState<string>('');
  const [verificationMessage, setVerificationMessage] = useState<string>('');

  const [emailNew, setEmail] = useState<string>('');
  const [isLOGGEDiN, setIsLOGGEDiN] = useState<boolean>(false);
  const [tokennew, setTokenNew] = useState<string>('');
  const [enterOtp, setEnterOtp] = useState<boolean>(false);
  const [hideLogin, setHideLogin] = useState<boolean>(false);

  // Redirect user if already logged in
  useEffect(() => {
    if (email && isLoggedIn && token) {
      toast.error("You are logged in...");
      router.push("/");
    }
  }, []);

  // Redirect user after successful signin
  useEffect(() => {
    if (
      successSignIn &&
      Cookies.get("c&m-userEmail") &&
      Cookies.get("c&m-isLoggedIn") &&
      Cookies.get("c&m-token")
    ) {
      router.push("/");
    }
  }, [successSignIn]);

  // Display error toast if there's an error
  useEffect(() => {
    if (err) {
      toast.error(errMsg);
    }
  }, [err]);

  // Google login functionality
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      if (codeResponse.access_token) {
        setSuccessSignIn(false);
        await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `${codeResponse.token_type} ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          },
        ).then((response) =>
          response
            .json()
            .then(async (data) => {
              //console.log(data.picture, data.name, data.email);
              if (data.email) {
                const request = await fetch(
                  `${process.env.NEXT_PUBLIC_BASEURL}${URLS.signinWithGoogle}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: data.email,
                      image: data.picture,
                      name: data.name,
                    }),
                  },
                );

                const response = await request.json();
                //console.log(response);
                if (response.success) {
                  Cookies.set("c&m-userEmail", data.email);
                  Cookies.set("c&m-isLoggedIn", true);
                  Cookies.set("c&m-token", response.data.token);
                  setSuccessSignIn(true);
                } else {
                  Swal.fire({
                    title: "GOOGLE SignIn Error",
                    icon: "error",
                    text: response.data.message,
                  });
                }
              }
            })
            .catch((err) =>
              Swal.fire({
                title: "GOOGLE SignIn Error",
                icon: "error",
                text: err,
              }),
            ),
        );
      }
    },
    onError: (error) => toast.error("Login Failed: " + error.error_description),
  });

  const handleResetPassword = async(e)=>{
    e.preventDefault();
    const loginRequest = new Promise(async (resolve, reject) => {
        setErr(false);
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/forgetpassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
            }),
          },
        );
        const response = await request.json();
      if (response.success) {
        
          resolve(response);
        } else {
          //console.log(response);
          setErr(true);
          setErrMsg(response.data);
          reject();
        }
      });

      await toast.promise(loginRequest, {
        loading: "Requesting reset link...",
        success: <b>Link successfully sent.</b>,
        error: <b>An error occured sending you link, please try again.</b>,
      });
      
  }

    const verifyToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verify2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token:tokenNew, secret, email:emailNew }),
    });

    const data = await res.json();
    if (data.verified) {
      setSuccess(true);
      //console.log(response);
      Cookies.set("c&m-userEmail", emailNew);
      Cookies.set("c&m-isLoggedIn", true);
      Cookies.set("c&m-token", tokennew);
      setSuccessSignIn(true);
      setVerificationMessage('Token verified successfully!');
      router.push("/")
    } else {
      setVerificationMessage('Token verification failed.');
    }
  };



  const verifyOTP = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/user/verifyotp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token:tokenNew, secret, email:emailNew }),
    });

    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      //console.log(response);
      Cookies.set("c&m-userEmail", emailNew);
      Cookies.set("c&m-isLoggedIn", true);
      Cookies.set("c&m-token", tokennew);
      setSuccessSignIn(true);
      setVerificationMessage('OTP verified successfully!');
      router.push("/")
    } else {
      setVerificationMessage(data.data);
    }
  };

  // Form submission handler for email and password login
  const handleFormSubmit = async (e) => {
    e.preventDefault();
     const {
    ciphertext,
    iv
} = await encryptSymmetric(data.password, String(process.env.NEXT_PUBLIC_CRYPTOKEY));
    try {
      setSuccessSignIn(false);
      setHideLogin(false)
      const loginRequest = new Promise(async (resolve, reject) => {
        setErr(false);
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              passwordNew: ciphertext,
              iv: iv
            }),
          },
        );
        const response = await request.json();

        if (response.success) {
        
          if(response.data.isMainAdmin){
            setHideLogin(true);
              setEnterToken(true);
              setEmail(data.email);
              setIsLOGGEDiN(true);
              setTokenNew(response.data.token);
                
          }else if(response.data.isAdmin){
            setHideLogin(true);
             setEnterOtp(true);
              setEmail(data.email);
              setIsLOGGEDiN(true);
              setTokenNew(response.data.token);
              const request2 = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/otp`,{
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              
            }),
          }) 
          const response2 = await request2.json()
          console.log(response2)
          } else{
              setSuccess(true);
              //console.log(response);
              Cookies.set("c&m-userEmail", data.email);
              Cookies.set("c&m-isLoggedIn", true);
              Cookies.set("c&m-token", response.data.token);
              setSuccessSignIn(true);
          
          }

          resolve(response);
        } else {
          //console.log(response);
          setErr(true);
          setErrMsg(response.data.message);
          reject();
        }
      });

      await toast.promise(loginRequest, {
        loading: "Logging in...",
        success: <b>Login Successful</b>,
        error: <b>An error occured signing you in, please try again.</b>,
      });
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <>
      {/* SignIn Form */}
      <div
        className="bg- mb-0 flex flex-col items-center bg-[url(/images/hero/bus_5.jpg)] bg-cover bg-no-repeat pb-10"
        style={{ gridTemplateColumns: "0.5fr 0.5fr" }}
      >
        <section className="h-[100%] w-full pt-20">
          <div className="relative z-1 mx-auto max-w-c-1016 px-12 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
            <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
            <div className="absolute bottom-0 left-0 -z-1 h-1/3 w-full">
              <Image
                src="/images/shape/shape-dotted-light.svg"
                alt="Dotted"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/shape/shape-dotted-dark.svg"
                alt="Dotted"
                className="hidden dark:block"
                fill
              />
            </div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
            >
              <>
              {!hideLogin && <>
              <h2 className="mb-5 text-center text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                {forgetPasswd ? 'Reset Password' : 'Login to Your Account'}
              </h2>
              <div className="flex flex-col">
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => handleGoogleLogin()}
                    aria-label="sign with google"
                    className="text-body-color dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                  >
                    <span className="mr-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_95:967)">
                          <path
                            d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                            fill="#4285F4"
                          />
                          <path
                            d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                            fill="#34A853"
                          />
                          <path
                            d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                            fill="#EB4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_95:967">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Sign in using Google
                  </button>
                </div>
              </div>
              {!forgetPasswd && <div className="mb-10 flex items-center justify-center">
                <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
                <p className="text-body-color dark:text-body-color-dark w-full px-5 text-center text-base">
                  Or, login with your email
                </p>
                <span className="dark:bg-stroke-dark hidden h-[1px] w-full max-w-[200px] bg-stroke dark:bg-strokedark sm:block"></span>
              </div>}

              <form>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  {!forgetPasswd &&  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />}
                 
                </div>

                <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
                  <div className="flex flex-wrap gap-4 md:gap-10">
                    <a href="#" className="hover:text-primary" onClick={()=> setForgetPasswd(true)}>
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    onClick={(e)=> forgetPasswd? handleResetPassword(e) : handleFormSubmit(e)}
                    aria-label="login with email and password"
                    className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                  >
                   {forgetPasswd ? 'Reset Password' : 'Log in'} 
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                      href="/auth/signup"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
              </>}
              <>{enterToken &&  <div className="space-y-4">
              <div>
                 <h2 className="mb-5 text-center text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Enter The Token from your authenticator app
              </h2>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">Enter Token</label>
                <input
                  type="text"
                  id="tokenNew"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <button
                onClick={verifyToken}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Token
              </button>
              {verificationMessage && <p className="mt-4 text-center text-red-500">{verificationMessage}</p>}
            </div>}</>

            <>{enterOtp &&  <div className="space-y-4">
              <div>
                 <h2 className="mb-5 text-center text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Enter The OTP sent to your email
              </h2>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">Enter Token</label>
                <input
                  type="text"
                  id="tokenNew"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <button
                onClick={verifyOTP}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
              {verificationMessage && <p className="mt-4 text-center text-red-500">{verificationMessage}</p>}
            </div>}</>
              </>
            </motion.div>
            
          
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Signin; // Export Signin component as default
