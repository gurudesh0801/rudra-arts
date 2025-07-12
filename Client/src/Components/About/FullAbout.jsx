import { useEffect } from "react";
import { motion } from "framer-motion";
import weaponsBg from "/images/border.jpg";
import aboutbg1 from "/images/IMG-20250617-WA0027.jpg";
import aboutbg2 from "/images/bts21.jpg";
import { Link } from "react-router-dom";

// Modern card animation variants
const cardFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
    <div className="relative py-12 md:py-16 pt-16 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 ">
      {/* Background image with reduced opacity for better readability */}
      <div
        className="absolute top-0 right-0 w-full h-full bg-cover bg-center z-0 opacity-90"
        style={{ backgroundImage: `url(${weaponsBg})` }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Stacked on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8 md:mb-16 pt-8 md:pt-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 font-serif text-left"
          >
            <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight text-left md:text-left">
              <span className="relative inline-block text-customBrown">
                Chhatrapati's Legacy Etched in Every Stone
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-6 ml-2 text-left md:text-left">
              India's 1st Historic Studio of Authentic Statues of Chhatrapati
              Shivaji Maharaj and Maratha Weapons. Manufacturer of Miniatures,
              Statues, Mavala Idols.
            </p>

            <div className="flex items-center gap-4 mt-6 p-4 bg-white rounded-lg border-l-4 border-customBrown dark:border-orange-300  mx-auto md:mx-0">
              <div>
                <p className="text-sm font-semibold text-customBrown">
                  Managing Director
                </p>
                <h3 className="text-2xl font-bold text-customBrown ">
                  Satyajeet Arun Vaidya
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 relative min-h-[250px] md:min-h-[400px] w-full mt-4 md:mt-0"
          >
            <div
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${aboutbg1})` }}
            />
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="mb-12 md:mb-24 font-serif">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
              <motion.div variants={cardFade}>
                <h2 className="text-3xl md:text-5xl leading-tight text-center md:text-left text-customBrown">
                  Our Mission
                </h2>
              </motion.div>

              <motion.div variants={cardFade} className="flex-1">
                <div className="h-1 w-24 md:w-full mx-auto md:mx-0 bg-gradient-to-r from-customBrown rounded-full" />
              </motion.div>
            </div>

            <motion.div variants={cardFade}>
              <div className="p-6 md:p-8 rounded-xl bg-customBrown backdrop-blur-lg shadow-md border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <p className="text-lg md:text-xl leading-relaxed text-gray-900 dark:text-gray-100 relative z-10">
                  To preserve the warrior ethos of the Sahyadri mountains
                  through historically accurate recreations of the weapons,
                  armor, and artifacts once wielded by the legendary forces that
                  shaped our heritage.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values Section - Single column on mobile */}
        <div className="mb-12 md:mb-24">
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
            <motion.div variants={cardFade}>
              <h2 className="text-3xl md:text-5xl font-normal font-times text-center mb-8 text-customBrown">
                The{" "}
                <span className="bg-gradient-to-r from-customBrown to-orange-500 bg-clip-text text-transparent">
                  Spirit
                </span>{" "}
                Behind Our Work
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  ),
                  title: "Historical Precision",
                  desc: "Every curve of our wagh nakh replicas and every detail in our armor recreations follows documented accounts of the Maratha warriors' equipment.",
                  color: "text-customBrown dark:text-orange-300",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  ),
                  title: "Warrior's Spirit",
                  desc: "We infuse each creation with the same dedication shown by the mountain warriors who defended our land.",
                  color: "text-customBrown dark:text-orange-300",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  title: "Cultural Continuity",
                  desc: "Connecting modern generations with the martial traditions that defined our history.",
                  color: "text-customBrown dark:text-orange-300",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div className="h-full p-6 rounded-xl bg-customBrown backdrop-blur-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-400 hover:shadow-lg hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-customBrown dark:from-orange-300 to-transparent" />

                    <div
                      className={`w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center ${item.color} mb-4 border border-orange-200 dark:border-orange-800`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Craftsmanship Section - Stacked on mobile */}
        <div className="mb-12 md:mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex flex-col gap-8"
          >
            <motion.div variants={cardFade}>
              <h2 className="text-3xl md:text-5xl font-normal font-times text-center mb-8 text-customBrown">
                <span className="bg-gradient-to-r from-customBrown to-orange-500 bg-clip-text text-transparent">
                  Authentic
                </span>{" "}
                Craftsmanship
              </h2>
            </motion.div>

            <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
              <motion.div variants={cardFade} className="flex-1">
                <div className="p-6 md:p-8 rounded-xl bg-customBrown backdrop-blur-lg shadow-md border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                  <p className="text-lg md:text-xl leading-relaxed text-gray-900 dark:text-gray-100 relative z-10">
                    Our artisans employ traditional techniques passed down
                    through generations to recreate the weapons and artifacts
                    that once defended the Sahyadri forts.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {[
                      "Hand-Forged Metals",
                      "Traditional Joinery",
                      "Historical Accuracy",
                      "Artisanal Detailing",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-customBrown dark:bg-orange-300" />
                        <p className="text-gray-700 dark:text-gray-300">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardFade}
                custom={1}
                className="flex-1 relative h-64 md:h-96 w-full"
              >
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${aboutbg2})` }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Offerings Section - Single column on mobile */}
        <div className="mb-12 md:mb-24">
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
            <motion.div variants={cardFade}>
              <h2 className="text-3xl md:text-5xl font-normal font-times text-center mb-8 text-customBrown">
                Inspired by{" "}
                <span className="bg-gradient-to-r from-customBrown to-orange-500 bg-clip-text text-transparent">
                  History
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                  ),
                  title: "Warrior Weapons",
                  desc: "Faithful recreations of traditional arms including Maratha Dhoop(talwars), Katyar, and dand patta swords used by Maharashtra's forces.",
                  color: "text-customBrown dark:text-orange-300",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Legends Statues",
                  desc: "Handcrafted sculptures capturing the dynamic poses and iconic armor of our legendary warriors.",
                  color: "text-customBrown dark:text-orange-300",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v4m0 4h.01M12 12v.01M4.93 19.07a10 10 0 1114.14 0M12 12h.01"
                      />
                    </svg>
                  ),
                  title: "Historical Artifacts",
                  desc: "Meticulously crafted replicas of coins, seals, and royal insignia from Maharashtra’s glorious history.",
                  color: "text-customBrown dark:text-orange-300",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={cardFade}
                  custom={i}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div className="h-full p-6 rounded-xl bg-customBrown backdrop-blur-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-400 hover:shadow-lg hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-customBrown dark:from-orange-300 to-transparent" />

                    <div
                      className={`w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center ${item.color} mb-4 border border-orange-200 dark:border-orange-800`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 mt-2 font-semibold text-customBrown dark:text-orange-300 hover:underline"
                    >
                      Explore collection
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Legacy Section - Full Width */}
        <div className="mb-8 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardFade}
          >
            <div className="p-8 md:p-12 rounded-xl bg-gradient-to-br from-customBrown to-orange-800 shadow-xl text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10 mix-blend-overlay"
                style={{ backgroundImage: `url(${weaponsBg})` }}
              />

              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                  Carrying Forward the Warrior Ethos
                </h2>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                  These creations are more than artifacts — they embody the
                  courage, strategy, and resilience that defined a golden era in
                  our warrior legacy.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white font-semibold transition-all hover:bg-white/20">
                    Discover the Legacy
                    <span className="transition-transform duration-300">→</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FullAbout;
