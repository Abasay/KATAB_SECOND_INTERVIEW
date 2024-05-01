import Image from "next/image";
import { Metadata } from "next";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is the About Page",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      {/* Main content */}
      <Hero />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="mb-12">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
              About Us
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg lg:text-xl">
              C&M Transport Services is dedicated to providing convenient and
              efficient transportation services for all our customers. Whether
              you're commuting to work, exploring a new city, or planning a trip
              with friends, we've got you covered.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
              Our Mission
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg lg:text-xl">
              Our mission is to revolutionize the way people travel by offering
              a seamless experience from booking to arrival. We strive to make
              transportation accessible, affordable, and eco-friendly for
              everyone.
            </p>
          </div>
        </section>

        <section>
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
              Contact Us
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 md:text-lg lg:text-xl">
              Have questions or feedback? We'd love to hear from you. Contact
              our support team at{" "}
              <a href="mailto:info@yourtransport.com" className="text-blue-500">
                abdulsalamasheem@gmail.com
              </a>{" "}
              or give us a call at{" "}
              <a href="tel:+2348064611398" className="text-blue-500">
                +234 (806) 461 1398
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
