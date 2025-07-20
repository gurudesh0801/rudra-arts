import React from "react";
import { motion } from "framer-motion";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const AwardCard = ({ award, index }) => {
  return (
    <motion.div
      key={award.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="h-full flex flex-col"
    >
      <div className="flex-1 bg-amber-50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
        {/* Image */}
        <div className="relative w-full h-64 md:h-72 overflow-hidden">
          <img
            src={award.image}
            alt={award.title}
            className="w-full h-full object-cover"
          />
          {award.year && (
            <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded text-sm font-times">
              {award.year}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-times font-normal text-xl md:text-2xl text-brown-800 mb-3 leading-snug">
            {award.title}
          </h3>

          <p className="font-times text-gray-600 mb-4 text-base leading-relaxed">
            {award.description}
          </p>

          {award.organization && (
            <div className="mt-auto pt-3 border-t border-gray-100">
              <p className="font-times text-amber-700 text-sm">
                Presented by: {award.organization}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AwardsComponent = () => {
  const awards = [
    {
      image: "/images/award1.jpg",
      title: "Hindu Shaurya Puraskar",
      year: "2025",
      organization: "Maharashtra Art Council",
      description:
        "Awarded for our exceptional contribution to preserving and promoting India's rich cultural heritage through curated art exhibitions.",
    },
    {
      image: "/images/img18.jpg",
      title: "Shree Shambhuchhatrapati Rajyabhishek Sohala Sanman",
      year: "2025",
      organization: "Ministry of Culture",
      description:
        "Awarded for our exceptional contribution to preserving and promoting India's rich cultural heritage through curated art exhibitions.",
    },
    {
      image: "https://via.placeholder.com/400x300",
      title: "Entrepreneur of the Year",
      year: "2023",
      organization: "Pune Business Awards",
      description:
        "Honored for innovative business practices that have revolutionized the art gallery experience in Maharashtra.",
    },
  ];

  return (
    <div className="py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsComponent;
