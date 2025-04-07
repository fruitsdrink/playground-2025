import React from "react";
import BGImage from "@/assets/images/motion/coffee-home/bg-slate.png";
import CoffeeMain from "@/assets/images/motion/coffee-home/black.png";
import "@/assets/styles/motion/coffee-home.css";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const bgImage: React.CSSProperties = {
  backgroundImage: `url(${BGImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export function Hero() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <main style={bgImage}>
      <section className="relative min-h-[750px] w-full">
        <div className="container mx-auto p-[2rem] md:p-[1rem]">
          {/* Navbar section */}
          <Navbar toggleMenu={toggleMenu} />
          {/* Hero section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-[850px]">
            {/* text content section */}
            <div className="text-[#f1dabf] mt-[100px] md:mt-0 p-4 space-y-28">
              <motion.h1
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 1,
                }}
                className="text-7xl font-bold leading-tight ml-14"
              >
                Blvck Tumbler
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 1.2,
                }}
                className="relative"
              >
                <div className="z-10 space-y-4 relative">
                  <h1 className="text-2xl">Black Lifestyle Lovers,</h1>
                  <h1 className="text-sm opacity-55 leading-loose">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    eligendi beatae, eum modi et repellendus nostrum in ipsam
                    ipsum quia, possimus laudantium nesciunt molestiae ratione
                    esse aperiam, odit facere animi!
                  </h1>
                </div>
                <div className="absolute -top-6 -left-10 w-[250px] h-[190px] bg-gray-700/25"></div>
              </motion.div>
            </div>

            {/* Hero Image section */}
            <div className="relative">
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.4,
                }}
                src={CoffeeMain}
                alt="hero"
                className="relative z-40 h-[400px] md:h-[700px] img-shadow"
              />
              {/* orange circle ring */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.8,
                }}
                className="absolute top-24 -right-16 border-[#f19509] rounded-full border-[20px] w-[180px] h-[180px] text-white z-10"
              ></motion.div>
              {/* big text section */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.8,
                }}
                className="absolute -top-20 left-[200px] z-[1]"
              >
                <h1 className="text-[140px] scale-150 font-bold text-[#1a1f25]/40 leading-none">
                  Blvck Tumbler
                </h1>
              </motion.div>
            </div>
            {/* third div section */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 1.2,
              }}
              className="text-[#f1dabf] mt-[100px] md:mt-0 p-4 space-y-28"
            >
              <h1 className="opacity-0 text-7xl font-bold leading-tight ml-14">
                Blvck Tumbler
              </h1>
              <div className="relative">
                <div className="z-10 space-y-4 relative">
                  <h1 className="text-2xl">Blvck Tumbler</h1>
                  <h1 className="text-sm opacity-55 leading-loose">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus quidem eveniet odio placeat quo similique sed
                    ipsum nisi ea in?
                  </h1>
                </div>
                <div className="absolute -top-6 -right-10 w-[250px] h-[190px] bg-[#1a1f25]/50"></div>
              </div>
            </motion.div>
            <div></div>
          </div>
        </div>

        {/* sidebar Menu section */}
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            whileInView={{ x: 0 }}
            className="absolute top-0 right-0 w-[140px] h-full bg-gradient-to-b from-[#f19509]/80 to-[#e86f00]/80 backdrop-blur-sm z-10"
          >
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col gap-6 items-center justify-center text-white">
                {/* line */}
                <div className="w-[1px] h-[70px] bg-white"></div>
                {/* social icons */}
                <div className="inline-block p-2 rounded-full cursor-pointer border-white border">
                  <FaFacebookF className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border-white border">
                  <FaTwitter className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border-white border">
                  <FaInstagram className="text-2xl" />
                </div>
                <div className="w-[1px] h-[70px] bg-white"></div>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
