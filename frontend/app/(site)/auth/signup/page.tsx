//imports
import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - User SIGN UP PAGE",
  description: "This is Sign Up page for C&M Transport Services website",
  // other metadata
};

export default function Register() {
  return (
    <>
      {/* The SignUp Component */}
      <Signup />
    </>
  );
}
