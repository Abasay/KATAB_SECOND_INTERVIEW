"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pt-20 ">
        <div className="mx-auto w-full relative ">
         <img src="/images/hero/bus_7.jpg" alt="" className="" />
         <motion.a
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
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
       
        className="animate_top  w-full mx-auto text-2xl absolute top-[50%]  block h-10 "
      >
        <p className="text-white border-red-400 font-bold max-w-[300px] mx-auto  text-center">
          The world&nbsp;s Number One Leading Transport Services
        </p>
        
      </motion.a>
        </div>
      </section>
    </>
  );
};

export default Hero;
