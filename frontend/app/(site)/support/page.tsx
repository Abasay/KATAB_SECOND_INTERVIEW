import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Page - C&M Transport Services",
  description: "This is Support page for C&M Transport Services",
  // other metadata
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-40">
      {/* The Contact Page */}
      <Contact />
    </div>
  );
};

export default SupportPage;
