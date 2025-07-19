import { motion } from "framer-motion";

const InformationCards = () => {
  const cardData = [
    {
      id: 1,
      title: "अश्वारूढ महाराज",
      description:
        "निकोलाओ मनुची हा इटालियन प्रवासी छत्रपती शिवाजी महाराजांच्या काळात भारतामध्ये आला होता. त्याने छत्रपती शिवाजी महाराजांचे एक चित्र तयार करून घेतले होते. घोड्यावर स्वार असणारे शिवाजी महाराजांचे हे एकमेव समकालीन चित्र आहे. याच चित्राचा आधार घेत आणि अस्सलतेच्या जवळ जाणारी ही प्रतिमा आम्ही निर्माण केली. यामध्ये शिवाजी महाराजांचे कपडे, त्यावर असणारी नक्षी, घोड्याचे अलंकार, शुभलक्षणी कुंकू आणि केशराने भरवण्यात आलेले पाय अशा सर्व गोष्टी जशा आहेत तशाच निर्माण केल्या.",
      image: "/images/ashwapatiMaharaj12.jpg",
    },
    {
      id: 2,
      title: "गजपती महाराज",
      description:
        "छत्रपती शिवाजी महाराज हत्तीवर आरुढ झाल्याच्या केवळ दोनच अस्सल नोंदी इतिहासात उपलब्ध आहेत. पहिली नोंद म्हणजे छत्रपतींचा राज्याभिषेक विधी पार पडल्यानंतर ते जगदीश्वर मंदिराकडे दर्शनासाठी जात असताना आणि दुसरी नोंद म्हणजे दक्षिण दिग्विजय मोहिमेच्या प्रसंगी. या नोंदीचा आधार घेत, मध्ययुगीन काळातील उपलब्ध असणाऱ्या हत्तींच्या अस्सल चित्रांचा आधार घेत आणि महाराजांच्या अस्सल समकालीन प्रतिमांचा अभ्यास करून आम्ही जगातील सर्वात पहिली गजारूढ छत्रपती शिवाजी महाराजांची प्रतिमा निर्माण केली आहे. राज्याभिषेक प्रसंगी आलेल्या वर्णनानुसार, छत्रपती शिवाजी महाराजांच्या हत्तीचे सारथ्य सरसेनापती हंबीरराव मोहिते यांनी केले होते.",
      image: "/images/gajapatiMaharaj12.jpg",
    },
    {
      id: 3,
      title: "युगनिर्माते महाराज",
      description:
        "छत्रपती शिवाजी महाराजांची अकरा अस्सल समकालीन चित्रे आज उपलब्ध आहेत. या सर्व चित्रांचा अभ्यास करून छत्रपती शिवाजी महाराजांचा चेहरा, त्यांचे कपडे, त्यावरील नक्षीकाम, त्यांचे अलंकार, मंदिल, त्यांची मोजडी, हातातील शस्त्रे एवढेच काय तर त्यांची उभा राहण्याची पद्धत याचाही सखोल अभ्यास केला आणि वास्तवाच्या जवळ जाणारी छत्रपती शिवाजी महाराजांची ही प्रतिमा आम्ही निर्माण केली. यासाठी जगभरात उपलब्ध असणाऱ्या सर्व अस्सल चित्रांचा आधार आम्ही घेतला.",
      image: "/images/yugnirmateMaharaj21.jpg",
    },
    {
      id: 4,
      title: "प्रजापती महाराज",
      description:
        "छत्रपती शिवाजी महाराज म्हणजे प्रजेचे पालन करणारे महान राजे. या छत्रपती शिवाजी महाराजांची गादीरूढ आसनस्थ प्रतिमा निर्माण आम्ही निर्माण केली. इतिहास अभ्यासकांच्या मते, छत्रपती शिवाजी महाराज वीरासनात गादीवर बसत असत. त्याचाच आधार घेत आम्ही ही प्रतिमा सत्य परिस्थितीच्या जास्तीत जास्त जवळ नेण्यासाठी प्रयत्न केला.",
      image: "/images/prajapatiMaharaj.jpg",
    },
  ];

  const cardVariants = {
    offscreen: {
      opacity: 0,
      y: 50,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="mx-auto font-amita px-4 sm:px-6 lg:px-8 py-12 mt-20 bg-gradient-to-b from-amber-50 to-amber-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold font-amita text-amber-800 mb-4 pt-10">
          छत्रपती शिवाजी महाराज प्रतिमा
        </h2>
        <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
      </motion.div>

      <div className="space-y-24 max-w-6xl mx-auto bg-gradient-to-b from-amber-50 to-amber-100">
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 md:gap-12 items-center`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative flex justify-center">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="rounded-lg shadow-xl border-4 border-customBrown inline-block"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="max-h-72 md:max-h-96 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2">
              <div className="space-y-6">
                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-3xl font-bold text-amber-700 border-b-2 border-amber-400 pb-2"
                >
                  {card.title}
                </motion.h3>
                <p className="text-gray-700 font-bold text-justify leading-relaxed text-lg">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InformationCards;
