import React from "react";
import { motion } from "framer-motion";
import weaponsBg from "../../assets/images/Weponsbg.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Meera Sharma",
      title: "Interior Designer, Artisan Spaces",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
      quote:
        "Rudra Arts' handcrafted pieces bring unmatched authenticity to every space I design. Their attention to detail and traditional techniques are truly admirable.",
    },
    {
      name: "Meena Patel",
      title: "Founder, Cultural Curations Gallery",
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200",
      quote:
        "Every artifact from Rudra Arts tells a story. The craftsmanship reflects deep cultural roots and the quality is museum-worthy. A trusted name in the industry.",
    },
    {
      name: "Saurabh Rathi",
      title: "Lifestyle Blogger & Art Collector",
      img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200",
      quote:
        "My home feels more soulful with Rudra Arts' metal and wood handicrafts. Each piece is timeless and adds a heritage touch to modern interiors.",
    },
  ];

  return (
    <div className="relative py-24 px-6 sm:px-8 lg:px-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={weaponsBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-5xl font-normal mb-20  text-customBrown font-times"
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative pt-20 pb-6 px-6 bg-white rounded-xl shadow-xl text-center h-full flex flex-col items-center justify-between"
            >
              {/* Profile Image */}
              <div className="absolute -top-12">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>

              <div className="flex flex-col flex-grow justify-between">
                {/* Quote */}
                <p className="text-gray-700 italic mb-6 px-2 leading-relaxed">
                  <span className="text-amber-500 text-xl mr-1 font-serif">
                    “
                  </span>
                  {testimonial.quote}
                  <span className="text-amber-500 text-xl ml-1 font-serif">
                    ”
                  </span>
                </p>

                {/* Name & Title */}
                <div className="mt-auto">
                  <h3 className="text-orange-600 text-lg font-bold">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 italic text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
