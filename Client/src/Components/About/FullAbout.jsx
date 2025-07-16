import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Card animation variants
const cardFade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const FullAbout = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative py-12 bg-gradient-to-b from-amber-50 to-amber-100 font-times">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Hero Section - Centered */}
        <div className="flex flex-col items-center text-center mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h1 className="mb-6 text-5xl sm:text-6xl font-normal text-customBrown">
              Chhatrapati's Legacy in Every Creation
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                India's premier studio for authentic statues of Chhatrapati
                Shivaji Maharaj and Maratha weapons. Specializing in miniatures,
                statues, and historical replicas.
              </p>

              <div className="p-4 bg-neutral-100 rounded-lg border-l-4 border-orange-500 inline-block">
                <p className="text-sm font-semibold text-orange-600">
                  Managing Director
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  Satyajeet Arun Vaidya
                </h3>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 w-full max-w-2xl"
          >
            <div className="min-h-[300px] w-full bg-gray-100 rounded-xl overflow-hidden">
              <img
                src="/images/IMG-20250617-WA0027.jpg"
                alt="Chhatrapati Legacy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Mission Section - Centered */}
        <div className="mb-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade} className="mb-8">
              <h2 className="text-4xl font-normal text-gray-900 mb-4">
                Our Mission
              </h2>
              <div className="h-1 w-20 bg-orange-500 rounded-full mx-auto" />
            </motion.div>

            <motion.div variants={cardFade} className="max-w-3xl mx-auto">
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-lg text-gray-700">
                  To preserve the warrior ethos through historically accurate
                  recreations of the weapons, armor, and artifacts that shaped
                  our heritage.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values - Centered */}
        <div className="mb-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade} className="mb-12">
              <h2 className="text-4xl font-normal text-gray-900 mb-2">
                The <span className="text-orange-500">Spirit</span> Behind Our
                Work
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Historical Precision",
                  desc: "Every detail follows documented accounts of Maratha warriors' equipment.",
                },
                {
                  title: "Warrior's Spirit",
                  desc: "Infusing each creation with the dedication of our ancestors.",
                },
                {
                  title: "Cultural Continuity",
                  desc: "Connecting modern generations with martial traditions.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-4 mx-auto text-2xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-normal mb-4 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Craftsmanship - Centered */}
        <div className="mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade} className="mb-12 text-center">
              <h2 className="text-4xl font-normal text-gray-900 mb-2">
                Authentic <span className="text-orange-500">Craftsmanship</span>
              </h2>
            </motion.div>

            <motion.div
              variants={cardFade}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Text Content - Left Side */}
              <div className="flex-1 max-w-2xl">
                <p className="text-xl text-black mb-6 ">
                  Our artisans employ traditional techniques passed down through
                  generations.
                </p>
                <ul className="space-y-3">
                  {[
                    "Hand-Forged Metals",
                    "Traditional Joinery",
                    "Historical Accuracy",
                    "Artisanal Detailing",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-3"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image - Right Side */}
              <div className="flex-1 min-h-[400px] w-full bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src="/images/bts21.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Offerings - Centered */}
        <div className="mb-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <motion.div variants={cardFade} className="mb-12">
              <h2 className="text-4xl font-normal text-gray-900 mb-2">
                Inspired by <span className="text-orange-500">History</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Warrior Weapons",
                  desc: "Faithful recreations of traditional arms used by Maharashtra's forces.",
                },
                {
                  title: "Legends Statues",
                  desc: "Handcrafted sculptures capturing iconic warriors.",
                },
                {
                  title: "Historical Artifacts",
                  desc: "Meticulously crafted replicas from our glorious history.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
                >
                  <h3 className="text-2xl font-normal mb-4 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{item.desc}</p>
                  <Link
                    to="/products"
                    className="text-orange-500 hover:underline font-medium inline-flex items-center"
                  >
                    Explore collection
                    <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-orange-50 rounded-lg text-center"
        >
          <h2 className="text-3xl font-normal text-gray-900 mb-6">
            Carrying Forward the Warrior Ethos
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            These creations embody the courage, strategy, and resilience that
            defined our legacy.
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-orange-500 text-white rounded-lg font-medium text-lg"
            >
              Discover the Legacy
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FullAbout;
