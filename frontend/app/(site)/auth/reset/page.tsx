import { Metadata } from "next";
import React from 'react'

import ResetpAGE from "@/components/Auth/Reset";

export const metadata: Metadata = {
  title: "Reset Password Page - C&M Services",
  description:
    "This is Reset Password page to get access to the enticing features of C&M Services",
  // other metadata
};



const Reset = () => {
  return (
    <div>
     <ResetpAGE/>
    </div>
  )
}

export default Reset