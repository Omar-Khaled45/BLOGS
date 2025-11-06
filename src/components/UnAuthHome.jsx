import { motion } from "framer-motion";

const UnAuthHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="will-change-opacity mt-[100px] flex flex-col items-center justify-center text-center tracking-wider will-change-transform"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="will-change-opacity w-5/6 text-2xl font-bold leading-relaxed will-change-transform md:w-3/5 md:text-4xl md:leading-relaxed"
      >
        Welcome to <span className="text-primary">BLOGS</span> – Your Gateway to
        Insightful and Engaging Content!
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="will-change-opacity mt-5 text-lg font-semibold leading-relaxed text-gray-500 will-change-transform md:w-3/5 md:text-2xl md:leading-relaxed"
      >
        Explore a world of captivating content, share your thoughts, and embark
        on a journey of discovery.
      </motion.h3>
    </motion.div>
  );
};

export default UnAuthHome;
