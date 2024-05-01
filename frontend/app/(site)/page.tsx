import { Metadata } from "next";
import Hero from "@/components/Hero";

import Contact from "@/components/Contact";

import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "C&M Transport Services - Reliable Transportation Services",
  description:
    "C&M Transport Services offers convenient and efficient transportation services for all your needs. Book your ride today!",
  keywords: ["transportation", "transit", "ride sharing", "travel", "commute"],
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />

      <Features />
      <Footer />
      {/* <Contact /> */}
    </main>
  );
}
