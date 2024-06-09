"use client";
// Importing necessary dependencies
import { motion } from "framer-motion"; // For animations
import Image from "next/image"; // For displaying images
import Link from "next/link"; // For client-side navigation
import { useCallback, useEffect, useRef, useState } from "react"; // For managing side effects and state
import { UseGoogleLoginOptions, useGoogleLogin } from "@react-oauth/google"; // For Google sign-in functionality
import Cookies from "js-cookie"; // For managing cookies
import toast from "react-hot-toast"; // For displaying toast notifications
import { useRouter } from "next/navigation"; // For client-side routing
import Swal from "sweetalert2"; // For displaying custom modals
import { URLS } from "@/lib/urls";
import { imageToBase64 } from "@/app/context/imageToBase64";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { encryptSymmetric } from "@/middlewares/encrypt";
import WebCamComPonent from "../Others/WebCamComp";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import ReCAPTCHA from "react-google-recaptcha";
import PassPhrase from "./PassPhrase";
const salt = genSaltSync(10);

const minimumLength = 12;
// Signup component definition
const Signup = () => {
  // some plaintext you want to encrypt
  const plaintext = "The quick brown fox jumps over the lazy dog";

  // create or bring your own base64-encoded encryption key

  //WebCam

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isHuman, setIsHuman] = useState(false);
  const webCamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imagesrc = webCamRef?.current?.getScreenshot() ?? null;
    setImageSrc(imagesrc);
    console.log(imagesrc);
  }, [webCamRef]);

  useEffect(() => {
    const handleImage = async () => {
      if (imageSrc) {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.onload = async () => {
          const detections = await faceapi.detectAllFaces(
            img,
            new faceapi.TinyFaceDetectorOptions(),
          );
          setIsHuman(detections.length > 0);
          console.log(detections);
          console.log(isHuman);
        };
      }
    };
    handleImage();
  }, [imageSrc]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // State management
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImg: "",
    password: "",
    confirmPassword: "",
    passPhrase: "",
  });

  const email = Cookies.get("c&m-userEmail");
  const isLoggedIn = Cookies.get("c&m-isLoggedIn");
  const token = Cookies.get("c&m-token");
  const [err, setErr] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [showSetPassPhrase, setPassPhrase] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");

  //Image URL state
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [img, setImg] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showCam, setShowCam] = useState(false);

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

  function validatePassword(password: any) {
    if (password.length < minimumLength) {
      return false;
    }

    if (!regex.test(password)) {
      return false;
    }

    return true;
  }

  const router = useRouter();

  const handleImageUpload = async (e) => {
    //Upload image to get image url
    const { files } = e.target;
    if (files[0]) {
      try {
        const imgUpload = new Promise(async (resolve, reject) => {
          let image = await imageToBase64(files[0]);
          setUploading(true);
          setUploaded(false);
          const imageUploadReq = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}${URLS.uploadImage}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ image: image }),
            },
          );

          const response = await imageUploadReq.json();
          if (imageUploadReq.status === 413) {
            ////console.log("payload too much");
          }
          if (response.success) {
            setUploaded(true);
            ////console.log(response.data);
            setUploading(false);
            setImg(response.data);
            setData({ ...data, profileImg: response.data });
            e.target.files = null;
            e.target.value = null;
            image = null;
            resolve(response);
          } else {
            setUploaded(true);
            setUploading(false);
            setImg("/login.gif");
            image = null;
            e.target.files = null;
            reject();
          }
        });

        await toast.promise(imgUpload, {
          loading: "uploading Image...",
          success: <b>Image Uploaded!</b>,
          error: <b>Error uploading Image, Please try again.</b>,
        });
      } catch (error) {}
    }
  };

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

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowCam(false);
    setPassPhrase(false);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (data.password.length < 12) {
      toast.error("Password must be at least 12 characters long");
      return;
    }
    if (
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      !data.passPhrase
    ) {
      toast.error("All fields are required");
      return;
    }

    if (data.passPhrase.length < 15) {
      toast.error("Pass phrase must be at least 15 characters long");
      return;
    }

    if (!validatePassword(data.password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      );
      return;
    }

    setErr(false);
    setIsSigningIn(true);
    setSuccess(false);
    setSignUpEmail(data.email);
    try {
      // Sending a POST request to the server with user registration details
      const { ciphertext, iv } = await encryptSymmetric(
        hashSync(data.password, salt),
        String(process.env.NEXT_PUBLIC_CRYPTOKEY),
      );

      const { ciphertext: passPhraseCiphertext, iv: passPhraseIv } =
        await encryptSymmetric(
          data.passPhrase,
          String(process.env.NEXT_PUBLIC_CRYPTOKEY),
        );
      const uploadUserDetails = new Promise(async (resolve, reject) => {
        const uploadRequest = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}${URLS.userSignUp}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: data.profileImg
                ? data
                : {
                    ...data,
                    profileImg:
                      "https://th.bing.com/th/id/R.3d968cd93cde586df04d1048dfb92604?rik=7MWjxZQVy1cjsg&pid=ImgRaw&r=0",
                    passwordNew: ciphertext,
                    password: ciphertext,
                    iv: iv,
                    passPhrase: passPhraseCiphertext,
                    passPhraseIv: passPhraseIv,
                  },
            }),
          },
        );

        const response = await uploadRequest.json();
        setMsg(response.data);
        //console.log(response);
        if (response.success) {
          // setSuccess(true);
          setPassPhrase(true);

          setIsSigningIn(false);
          setData({
            firstName: "",
            lastName: "",
            email: "",
            profileImg: "",
            password: "",
            confirmPassword: "",
            passPhrase: "",
          });
          setImg("/images/about/default.gif");

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
        loading: "Signing You Up...",
        success: <b>Account successfully created.</b>,
        error: <b>An error occured while creating your account.</b>,
      });
    } catch (error) {
      //console.log(error);
    } finally {
      setShowCam(true);
    }
  };

  // Use effect to display error toast if an error occurs during form submission
  useEffect(() => {
    if (err) {
      toast.error(msg);
    }
  }, [err]);

  // Google SignUp functionality
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setSuccessSignUp(false);
      if (codeResponse.access_token) {
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
              //console.log(data.picture, data.name);
              if (data.email) {
                const request = await fetch(
                  `${process.env.NEXT_PUBLIC_BASEURL}${URLS.signupWithGoogle}`,
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
                if (response.data.email && response.data.token) {
                  Cookies.set("c&m-userEmail", data.email);
                  Cookies.set("c&m-isLoggedIn", true);
                  Cookies.set("c&m-token", response.data.token);
                  setSuccessSignUp(true);
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
    onError: (error) =>
      toast.error("An error occured while signing up with Google"),
  });

  // Rendering the signup form
  return (
    <>
      {/* Signup Form Section */}
      {!isLoggedIn && !email && !token && (
        <section className="bg-[url(/images/hero/bus_7.jpg)] bg-cover bg-no-repeat pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
          {/* Background Shapes */}
          <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
            <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
            <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
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

            {/* Signup Form */}
            {(!showCam || successSignUp) && (
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
                {/* Form Header */}
                <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                  Create an Account
                </h2>

                {/* Divider */}

                {/* Signup Form Fields */}
                <form className="pb-10">
                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                      }
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                    />
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
                  </div>

                  <div className="mb-7.5 flex  flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14"></div>

                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
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
                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                    <p>
                      This passphrase will be asked whenever you want to login.
                    </p>
                    <input
                      name="passPhrase"
                      type="text"
                      placeholder="Please enter your pass phrase"
                      value={data.passPhrase}
                      onChange={(e) =>
                        setData({ ...data, [e.target.name]: e.target.value })
                      }
                      className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo  focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                    />
                  </div>

                  {/* Signup Button */}
                  <button
                    type="submit"
                    onClick={(e) => {
                      handleFormSubmit(e);
                    }}
                    className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-80"
                  >
                    {isSigningIn ? "Signing up..." : "Sign Up"}
                  </button>
                  {/* <div>
                  <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_CAPTCHASITEKEY}
                onChange={(value:any)=>{console.log(value)}}
              />
                </div> */}
                </form>
              </motion.div>
            )}

            {/* {showCam && <motion.div
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
              <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Take A Selfie.
              </h2>
              
              <div className="mt-12 w-[80%] mx-auto">
                <img src="https://tse3.mm.bing.net/th/id/OIP.simDBt0MfUWGNq-55KzdMwHaHa?rs=1&pid=ImgDetMain" alt="User Image" className=" w-[300px] h-[300px] rounded-md" />
              </div>
              {imageSrc && <img src={imageSrc} alt="captured" />}
      <div className=" mt-10 text-center">{isHuman ? 'Human Detected' : 'No Human Detected'}</div>
               <button
                  onClick={capture}
                  className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-80"
                >
                  Capture Photo</button>

                   
              <div>
                <Webcam ref={webCamRef} screenshotFormat="image/jpeg"/>                
              </div>

              

              


              
            </motion.div>} */}

            {showSetPassPhrase && (
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
                className="animate_top rounded-lg bg-white px-7.5 pb-10 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
              >
                {/* Form Header */}
                <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                  Create a Pass Key
                </h2>
                <PassPhrase email={signUpEmail} />
              </motion.div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
