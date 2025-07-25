import React from "react";
import AnimatedUnderline from "../AnimatedUnderline/AnimatedUnderline";

const SideBySidePortrait = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-12 bg-white">
      {/* Heading at the top */}
      <div className="w-full text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-5xl font-normal mb-4 text-customBrown font-times">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/dhaltalwar.png"
              alt="Left Icon"
              className="w-10 h-10"
            />
            <AnimatedUnderline>Where Legacy Meets Leadership</AnimatedUnderline>
            <img
              src="/images/dhaltalwar.png"
              alt="Right Icon"
              className="w-10 h-10"
            />
          </div>
        </h2>

        <p className="text-black text-xl leading-relaxed max-w-5xl mx-auto font-times">
          A special moment where legacy and leadership come together, showing
          mutual respect and a shared vision for the future.
        </p>
      </div>

      {/* Images side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-20">
        {/* Left Portrait */}
        <div className="w-full md:w-1/3 p-3 flex flex-col items-center">
          <img
            src="/images/IMG-20250617-WA0007.jpg"
            alt="Left Portrait"
            className="w-full h-auto object-cover rounded-xl shadow-[0_8px_30px_rgba(0,0,0,1)]"
          />
          <div className="flex-1 flex items-end mt-4">
            <h1 className="text-xl sm:text-2xl font-times text-customBrown leading-snug text-center">
              Hon. Prime Minister of India <br />
              Shri Narendra Modi
            </h1>
          </div>
        </div>

        {/* Right Portrait */}
        <div className="w-full md:w-1/3 p-3 flex flex-col items-center">
          <img
            src="/images/IMG-20250617-WA0012.jpg"
            alt="Right Portrait"
            className="w-full h-auto object-cover rounded-xl shadow-[0_8px_30px_rgba(0,0,0,1)]"
          />
          <div className="flex-1 flex items-end mt-4">
            <h1 className="text-xl sm:text-2xl font-times text-customBrown leading-snug text-center">
              Hon. NCP Party Chief <br />
              Shri Sharad Pawar
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBySidePortrait;
