import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - NUESA SIGN UP PAGE",
  description: "This is Sign Up page for NUESA website",
  // other metadata
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
