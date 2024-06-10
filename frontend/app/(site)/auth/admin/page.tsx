//imports
import { Metadata } from "next";
import AdminSignUp from "@/components/Auth/AdminSignUp";

export const metadata: Metadata = {
  title: "Sign Up Page - Admin SIGN UP PAGE",
  description: "This is Sign Up page for C&M Transport Services website",
  // other metadata
};

export default function Register() {
  return (
    <>
      {/* The SignUp Component */}
      <AdminSignUp />
    </>
  );
}
