import { motion } from "framer-motion";
import aboutBg from "../../assets/images/about-bg.jpg";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center py-16 px-4 sm:px-6 md:py-24 text-center bg-gradient-to-b from-amber-50 to-amber-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-times text-customBrown mb-4">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/images/dhaltalwar.png"
              alt="Left Icon"
              className="w-10 h-10"
            />
            <AnimatedUnderline>
              The Story Behind Rudra Arts & Handicrafts
            </AnimatedUnderline>
            <img
              src="/images/dhaltalwar.png"
              alt="Right Icon"
              className="w-10 h-10"
            />
          </div>
        </h1>

        <p className="text-base sm:text-lg font-times md:text-xl text-black mt-2">
          A Journey Through Time: Building Innovation, Preserving Tradition
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
        {["The Beginning", "The Evolution", "Legacy of Art", "Our Mission"].map(
          (title, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-amber-50 border-l-4 md:border-l-8 border-customBrown shadow-lg p-4 sm:p-6 h-auto text-left font-times rounded-l-xl opacity-90"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#3e3228] mb-2">
                {title}
              </h3>
              <p className="text-[#5e4d3f] text-sm sm:text-base md:text-lg leading-relaxed">
                {title === "The Beginning"
                  ? "Rooted in deep cultural passion, Rudra Arts & Handicrafts began its journey to revive the legacy of traditional weaponry—fusing timeless craftsmanship with a modern outlook."
                  : title === "The Evolution"
                  ? "With time, our vision expanded. We now craft cultural artifacts and regal creations that reflect both artistic integrity and historical authenticity."
                  : title === "Legacy of Art"
                  ? "Each piece reflects the soul of Indian heritage—carefully curated with precision, pride, and the timeless skills passed through generations."
                  : "We aim to preserve and promote this cultural heritage globally, offering handcrafted excellence while embracing evolving aesthetics."}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default AboutUs;
