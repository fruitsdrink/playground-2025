import { motion, Variants } from "motion/react";
import Coffee1 from "@/assets/images/motion/coffee-home/coffee/coffee1.png";
import Coffee3 from "@/assets/images/motion/coffee-home/coffee/coffee3.png";

const servicesData = [
  {
    id: 1,
    image: Coffee1,
    title: "Black Coffee",
    subtitle: "lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    id: 2,
    image: Coffee3,
    title: "Hot Coffee",
    subtitle: "lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    id: 3,
    image: Coffee1,
    title: "Cold Coffee",
    subtitle: "lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
      ease: "easeInOut",
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.4, // delay between each child animation
    },
  },
};

export function Services() {
  return (
    <div className="container mx-auto p-[2rem] md:p-[1rem] space-y-4">
      {/* header section */}
      <div className="text-center mx-auto space-y-2 max-w-lg">
        <motion.h1
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
            delay: 0.2,
          }}
          className="text-3xl font-bold text-[#272c35]"
        >
          Fresh and <span className="text-[#f19509]">Tasty coffee</span>
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
            delay: 0.6,
          }}
          className="text-sm opacity-50 line-clamp-2"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quam
          repudiandae odit fugiat sapiente ratione at! Voluptates assumenda
          eligendi id sint doloribus reprehenderit!
        </motion.p>
      </div>
      {/* card section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {servicesData.map((service) => (
          <motion.div
            variants={cardVariants}
            key={service.id}
            className="text-center p-4 space-y-6"
          >
            <img
              src={service.image}
              alt=""
              className="img-shadow2 max-w-[200px] mx-auto hover:scale-110 duration-300 cursor-pointer"
            />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#f19509]">
                {service.title}
              </h1>
              <p className="text-[#1a1f25]">{service.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
