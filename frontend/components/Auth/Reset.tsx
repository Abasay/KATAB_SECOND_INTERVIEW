'use client'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import toast from 'react-hot-toast';
import { encryptSymmetric } from '@/middlewares/encrypt';
import { URLS } from '@/lib/urls';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import Footer from '../Footer';

const salt = genSaltSync(10)

const minimumLength = 12

const Reset = () => {
   const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

   const email = Cookies.get("c&m-userEmail");
  const isLoggedIn = Cookies.get("c&m-isLoggedIn");
  const token = Cookies.get("c&m-token");
  const [err, setErr] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
 

  //Image URL state

  const [isSaving, setIsSaving] = useState(false);
  const [showCam, setShowCam] = useState(false)

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

function validatePassword(password: any) {
  if (password.length < minimumLength) {
    return false
  }

  if (!regex.test(password)) {
    return false;
  }

  return true;
}

  const router = useRouter();

 

  // Use effect to check if the user is already logged in and redirect to home page
  useEffect(() => {
    if (email && isLoggedIn && token) {
      toast.error("You are logged in...");
      router.push("/");
    }
  });

  // Use effect to redirect to home page after successful sign-up
  useEffect(() => {
    if (success) {
      router.push("/auth/signin");
    }
  }, [success]);

  const params = useSearchParams()

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (data.password.length < 12) {
      toast.error("Password must be at least 12 characters long");
      return;
    }
    if (
      !data.password ||
      !data.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if(!validatePassword(data.password)){
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.')
      return
    }

    setErr(false);
    setIsSigningIn(true);
    setSuccess(false);
    try {
      // Sending a POST request to the server with user registration details
       const {
    ciphertext,
    iv
} = await encryptSymmetric(hashSync(data.password, salt), String(process.env.NEXT_PUBLIC_CRYPTOKEY));
      const uploadUserDetails = new Promise(async (resolve, reject) => {
        const uploadRequest = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/resetpassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${params.get('token')}`,
            },
            body: JSON.stringify({
              data: {passwordNew: ciphertext,iv:iv, token: params.get('token')}
            }),
          },
        );

        const response = await uploadRequest.json();
        setMsg(response.data);
        //console.log(response);
        if (response.success) {
          setSuccess(true);
          setIsSigningIn(false);
          setData({
            password: "",
            confirmPassword: "",
          });

          resolve(response);
        } else {
          setErr(true);
          setIsSigningIn(false);
          setMsg(response.data.message);
          reject(response);
        }
      });

      // Displaying toast notifications based on form submission result
      await toast.promise(uploadUserDetails, {
        loading: "Resetting Password...",
        success: <b>Password successfully changed.</b>,
        error: <b>An error occured while resetting password.</b>,
      });
    } catch (error) {
      //console.log(error);
    } finally{
      setShowCam(true)
    }
  };

   useEffect(() => {
    if (err) {
      toast.error(msg);
    }
  }, [err]);

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
              <h2 className="mb-5 text-center text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Reset Your Password              </h2>
            

              <form className=' pb-11'>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                  
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e)=>{
                    handleFormSubmit(e) 
                  }}
                  className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-80"
                >
                  {isSigningIn ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>
            </motion.div>
            
          
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Reset