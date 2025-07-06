import React from "react";
import {
  FaCrown,
  FaShieldAlt,
  FaChartLine,
  FaHandsHelping,
} from "react-icons/fa";
import { GiRoyalLove } from "react-icons/gi";

const TeamComponent = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Satyajeet Vaidya",
      role: "Founder & Visionary",
      description:
        "Descendant of traditional artisans, carrying forward 5 generations of craftsmanship",
      image: "/images/satyajeet.jpg",
      historicalNote:
        "His ancestors crafted artifacts for royal courts in the 18th century",
    },
    {
      id: 2,
      name: "Mam",
      role: "Co-Founder & Curator",
      description:
        "Preserver of ancient techniques with a modern aesthetic vision",
      image: "/images/owner2.jpg",
      historicalNote:
        "Her family's designs were featured in the Great Exhibition of 1851",
    },
    {
      id: 3,
      name: "Reshma Tupe",
      role: "Team Leader",
      description:
        "Trained in the traditional Guru-Shishya parampara since age 12",
      image: "/images/teammember1.jpg",
      historicalNote: "Last apprentice of the legendary craftsman Laxman Bhatt",
    },
    {
      id: 4,
      name: "Yash Indalkar",
      role: "QC & Sales Assistant",
      description:
        "Ensures each piece meets our 300-year-old quality standards",
      image: "/images/teammember2.jpg",
      historicalNote:
        "Uses techniques documented in the 17th century 'Shilpa Ratnakara'",
    },
    {
      id: 5,
      name: "Sanika Indalkar",
      role: "Sales Assistant",
      description: "Bridges ancient artistry with contemporary collectors",
      image: "/images/teammember3.jpg",
      historicalNote:
        "Continues the tradition of merchant families who traded along the Silk Road",
    },
  ];

  // Split team members into two groups: first 2 and last 3
  const topRowMembers = teamMembers.slice(0, 2);
  const bottomRowMembers = teamMembers.slice(2);

  return (
    <div className="bg-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Historical Header */}
        <div className="text-center mb-16 mt-10">
          <h2 className="text-3xl font-serif font-bold text-amber-800 mb-4 relative inline-block">
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-600"></span>
            The Keepers of Tradition
          </h2>
          <p className="text-lg italic text-amber-700 max-w-3xl mx-auto">
            "Since 1721, our guild has preserved the sacred art forms passed
            down through generations of master craftsmen"
          </p>
          <div className="mt-6">
            <img
              src="/images/rudralogo.png"
              alt="Historical artisans at work"
              className="h-24 object-cover rounded-lg opacity-90 mx-auto"
            />
          </div>
        </div>

        {/* Top Row - 2 Cards */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {topRowMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-amber-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative pt-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-customBrown">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain w-full h-full p-4"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-amber-200 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-700 mb-4 flex-grow">
                    {member.description}
                  </p>

                  {/* Historical Note */}
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400">
                    <p className="text-xs italic text-amber-800">
                      <span className="font-bold">Historical Legacy:</span>{" "}
                      {member.historicalNote}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-400"
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-amber-600 font-medium">
                      Since {member.id % 2 === 0 ? "1754" : "1721"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - 3 Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {bottomRowMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-amber-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative pt-[100%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-customBrown">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain w-full h-full p-4"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-amber-200 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-gray-700 mb-4 flex-grow">
                    {member.description}
                  </p>

                  {/* Historical Note */}
                  <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400">
                    <p className="text-xs italic text-amber-800">
                      <span className="font-bold">Historical Legacy:</span>{" "}
                      {member.historicalNote}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-amber-400"
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-amber-600 font-medium">
                      Since {member.id % 2 === 0 ? "1754" : "1721"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Footer */}
        <div className="mt-16 text-center border-t border-customBrown pt-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-amber-800 mb-6">
              "The hands that craft today, honor the masters of yesterday"
            </h3>
            <p className="text-amber-700 mb-8">
              Our team continues the unbroken lineage of artisans who have
              served royal courts, temples, and collectors for over three
              centuries. Each member is initiated into the traditional methods
              while innovating for modern connoisseurs.
            </p>
            <img
              src="/images/rudralogo.png"
              alt="Founder's signature"
              className="h-12 object-contain opacity-80 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
