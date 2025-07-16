import React from "react";

const SideBySidePortrait = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-12 bg-white">
      {/* Heading at the top */}
      <div className="w-full text-center mb-12">
        <h2 className="text-6xl font-normal mb-4 text-customBrown font-times">
          Inspiring Collaboration
        </h2>
        <p className="text-black text-xl leading-relaxed max-w-4xl mx-auto font-times">
          Our vision brings people together to create impactful solutions.
          Combining passion and innovation.
        </p>
      </div>

      {/* Images side by side */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-20">
        {/* Left Portrait */}
        <div className="w-full md:w-2/5 p-3 bg-customBrown">
          <img
            src="/images/IMG-20250617-WA0007.jpg"
            alt="Left Portrait"
            className="w-full h-auto object-cover shadow-lg"
          />
        </div>

        {/* Right Portrait */}
        <div className="w-full md:w-2/5 p-3 bg-customBrown">
          <img
            src="/images/IMG-20250617-WA0012.jpg"
            alt="Right Portrait"
            className="w-full h-auto object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBySidePortrait;
