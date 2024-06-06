"use client";
import Image from "next/image";
// import { useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  // const [email, setEmail] = useState("");

  let image = "/images/hero/bus_7.jpg";
  let div_styling = {
    height: '130vh',
    background: `url('${image}')`,
    backgroundSize: '100%',
    backgroundPosition: 'center',
    // filter: `brightness('10%')`,
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pt-20 ">
        <div style={div_styling} className="relative mx-auto w-full ">
          {/* <img src="/images/hero/bus_7.jpg" alt="" className="" /> */}
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
            className="animate_top  absolute top-[50%] mx-auto block h-10  w-full text-2xl "
          >
            <p style={{textAlign: 'center'}} className="max-w-[100%] border-red-400 text-center font-bold  text-white">
              Maximize Rewards: Cashback & Miles Transport Services
            </p>
          </motion.a>
        </div>
      </section>
    </>
  );
};

export default Hero;
