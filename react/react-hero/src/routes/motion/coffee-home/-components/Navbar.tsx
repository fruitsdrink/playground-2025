import { motion } from "motion/react";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
  toggleMenu: () => void;
}
export default function Navbar({ toggleMenu }: Props) {
  return (
    <nav className="absolute top-0 left-0 w-full pt-10 text-white z-[9999]">
      <div className="container mx-auto p-[2rem] md:p-[1rem]">
        <div className="flex justify-between items-center">
          {/* logo section */}
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
            className="text-2xl font-semibold uppercase"
          >
            <span className="text-[#f19509]">Coders</span> Coffee.
          </motion.h1>
          {/* Hamburger Menu section */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
            onClick={toggleMenu}
          >
            <GiHamburgerMenu className="cursor-pointer text-3xl" />
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
