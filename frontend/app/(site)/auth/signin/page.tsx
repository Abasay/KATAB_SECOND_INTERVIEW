//IMPORTS
import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page - C&M Services",
  description:
    "This is Login page to get access to the enticing features of C&M Services",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
      {/* The Sign In Component */}
      <Signin />
    </>
  );
};

export default SigninPage;
