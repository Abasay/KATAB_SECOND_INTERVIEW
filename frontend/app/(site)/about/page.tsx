import Image from "next/image";
import { Metadata } from "next";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is the About Page",
  // other metadata
};

export const AboutPage = () => {
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
              Your Transport is dedicated to providing convenient and efficient
              transportation services for all our customers. Whether you're
              commuting to work, exploring a new city, or planning a trip with
              friends, we've got you covered.
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

        <section className="mb-12">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Team member 1 */}
              <div className="flex flex-col items-center">
                <Image
                  src="/team_member_1.jpg"
                  alt="Team Member 1"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white md:text-2xl lg:text-3xl">
                  John Doe
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
                  CEO & Co-founder
                </p>
              </div>
              {/* Team member 2 */}
              <div className="flex flex-col items-center">
                <Image
                  src="/team_member_2.jpg"
                  alt="Team Member 2"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white md:text-2xl lg:text-3xl">
                  Jane Smith
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
                  CTO & Co-founder
                </p>
              </div>
              {/* Team member 3 */}
              <div className="flex flex-col items-center">
                <Image
                  src="/team_member_3.jpg"
                  alt="Team Member 3"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white md:text-2xl lg:text-3xl">
                  Emily Brown
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
                  Head of Operations
                </p>
              </div>
            </div>
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
                info@yourtransport.com
              </a>{" "}
              or give us a call at{" "}
              <a href="tel:+1234567890" className="text-blue-500">
                +1 (234) 567-890
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
