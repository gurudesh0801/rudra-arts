import { motion } from "framer-motion";

const AnimatedUnderline = ({ children }) => {
  return (
    <div style={{ display: "inline-block", textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        {children}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            height: "3px",
            backgroundColor: "#8C391B",
            marginTop: "6px",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedUnderline;
