import React from "react";
import { motion } from "framer-motion";

// Import your single weapon image
import weaponBg from "/weapons/weapon1.png";
import weaponBg2 from "/weapons/weapon2.png";

const Testimonials = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const weaponVariants = {
    hover: {
      y: -10,
      rotate: -5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const testimonials = [
    {
      name: "Donald Jackman",
      title: "Arms Historian",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      weaponAlt: "Historic weapon",
      quote:
        "The craftsmanship displayed here rivals the royal armories of 15th century Europe.",
    },
    {
      name: "Richard Nelson",
      title: "Museum Guide",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      weaponAlt: "Historic weapon",
      quote:
        "A magnificent collection that preserves not just weapons, but the honor of their wielders.",
    },
    {
      name: "James Washington",
      title: "Antique Collector",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200",
      weaponAlt: "Historic weapon",
      quote:
        "Each piece tells a story. This collection brings history's warriors back to life.",
    },
  ];

  // Background elements with different weapon angles
  const backgroundElements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotation: `${Math.random() * 360}deg`,
    opacity: 0.05 + Math.random() * 0.05,
    size: `${30 + Math.random() * 70}px`,
    flip: Math.random() > 0.5 ? "scaleX(-1)" : "scaleX(1)",
  }));

  return (
    <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center overflow-hidden bg-black">
      {/* Parallax weapon background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundElements.map((item) => (
          <motion.img
            key={item.id}
            src={weaponBg2}
            alt="background-weapon"
            className="absolute invert"
            style={{
              top: item.top,
              left: item.left,
              width: item.size,
              height: "auto",
              transform: `rotate(${item.rotation}) ${item.flip}`,
            }}
            initial={{ y: 0 }}
            whileInView={{
              y: [0, 20, 0],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" /> */}

      <div className="relative z-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
            Armory Chronicles
          </h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6" />
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            Hear from collectors and historians about these legendary weapons
            that shaped history.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 px-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="w-full sm:w-[350px] relative group"
            >
              {/* Weapon display - using the same weaponBg image */}
              <motion.div
                className="absolute -top-16 left-[7rem] z-10"
                whileHover="hover"
                variants={weaponVariants}
              >
                <img
                  src={weaponBg}
                  alt={testimonial.weaponAlt}
                  className="h-28 object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                />
              </motion.div>

              {/* Testimonial card */}
              <div className="pt-20 pb-8 px-6 rounded-lg border border-amber-900/50 bg-gradient-to-b from-gray-900/80 to-gray-900/50 backdrop-blur-sm shadow-lg">
                <div className="flex flex-col items-center">
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: 0.1 * idx,
                    }}
                    className="h-16 w-16 rounded-full border-2 border-amber-500/80 mb-4"
                    src={testimonial.img}
                    alt={testimonial.name}
                  />
                  <h3 className="text-xl font-medium text-amber-400 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-amber-200/80 mb-4">
                    {testimonial.title}
                  </p>
                </div>

                <p className="text-gray-300 italic mb-6 relative">
                  <span className="absolute -left-4 top-0 text-amber-500 text-2xl">
                    "
                  </span>
                  {testimonial.quote}
                  <span className="absolute -right-4 bottom-0 text-amber-500 text-2xl">
                    "
                  </span>
                </p>

                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.3 }}
                      className="mx-1"
                      width="18"
                      height="18"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                        fill="#F59E0B"
                      />
                    </motion.svg>
                  ))}
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
