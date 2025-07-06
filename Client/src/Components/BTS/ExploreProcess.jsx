import React from "react";
import { motion } from "framer-motion";
import {
  GiStoneCrafting,
  GiChisel,
  GiWireCoil,
  GiRoyalLove,
} from "react-icons/gi";
import { FaScroll } from "react-icons/fa";

const processSteps = [
  {
    icon: (
      <GiStoneCrafting
        className="group-hover:rotate-6 transition-transform"
        size={30}
      />
    ),
    title: "Raw Material Selection",
    description:
      "Every creation begins by handpicking the finest metals, stones, and woods with utmost reverence for tradition.",
    historicalNote:
      "Since 12th century, artisans have sourced materials from the same quarries and forests",
  },
  {
    icon: (
      <GiChisel
        className="group-hover:rotate-6 transition-transform"
        size={30}
      />
    ),
    title: "Traditional Crafting",
    description:
      "Using age-old tools and time-honored techniques, artisans breathe life into each form with unmatched skill.",
    historicalNote:
      "Techniques passed down through 8 generations of master craftsmen",
  },
  {
    icon: (
      <GiWireCoil
        className="group-hover:rotate-6 transition-transform"
        size={30}
      />
    ),
    title: "Detail & Embellishment",
    description:
      "Miniature weapons, frames, and figures are etched with meticulous detail that echoes historical grandeur.",
    historicalNote: "Inspired by royal armories of medieval Europe",
  },
  {
    icon: (
      <GiRoyalLove
        className="group-hover:rotate-6 transition-transform"
        size={30}
      />
    ),
    title: "Final Inspection & Blessing",
    description:
      "Before completion, every piece undergoes quality checks and is treated as a tribute to legacy.",
    historicalNote:
      "A tradition dating back to guild practices of the Renaissance",
  },
];

const ExploreProcess = () => {
  return (
    <section className="relative bg-[#f5f0e6] py-20 px-4 font-serif overflow-hidden mt-10">
      {/* Historical parchment background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <FaScroll className="w-full h-full text-amber-900" />
      </div>

      {/* Wax seal decorative element */}
      <div className="hidden lg:block absolute -left-20 top-1/3 w-40 h-40 rounded-full bg-amber-700 opacity-10 filter blur-xl"></div>
      <div className="hidden lg:block absolute -right-20 bottom-1/4 w-40 h-40 rounded-full bg-amber-600 opacity-10 filter blur-xl"></div>

      <div className="max-w-7xl mx-auto text-center relative">
        {/* Heading with decorative elements */}
        <div className="relative inline-block">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative z-10"
          >
            <span className="relative">
              Explore Our Process
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-700/30 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
            </span>
          </motion.h2>
          <div className="absolute -top-4 -right-6 text-amber-800/20 text-6xl">
            <FaScroll />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-amber-700 italic mb-12 max-w-xl mx-auto relative px-8 py-2 border-t border-b border-amber-200"
        >
          "A journey of soul, skill, and centuries — every creation whispers
          history."
        </motion.p>

        {/* Steps with historical reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 hover:bg-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md p-6 flex items-start gap-6 border border-amber-100 hover:border-amber-200"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 p-3 bg-amber-50 rounded-full text-amber-800 group-hover:text-amber-900 group-hover:bg-amber-100 transition-all">
                  {step.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-amber-900 mb-2 relative inline-block">
                  <span className="relative z-10">{step.title}</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-200 z-0 group-hover:h-2 transition-all duration-300"></span>
                </h3>
                <p className="text-amber-700 text-sm mb-3">
                  {step.description}
                </p>
                <div className="mt-4 pt-3 border-t border-amber-100 group-hover:border-amber-200 transition-colors">
                  <div className="flex items-center text-xs text-amber-600">
                    <FaScroll className="mr-2 opacity-70" />
                    <span className="font-medium italic">
                      {step.historicalNote}
                    </span>
                  </div>
                </div>
              </div>
              {/* Step number with historical style */}
              <div className="absolute top-4 right-4 text-amber-800/20 text-3xl font-serif font-bold">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Button with wax seal effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <button className="relative px-8 py-3 bg-amber-700 text-white rounded-full hover:bg-amber-800 transition-all group overflow-hidden">
            <span className="relative z-10 flex items-center">
              View Workshop Gallery
              <span className="ml-2 opacity-80 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-amber-900/20 rounded-full blur-sm"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreProcess;
