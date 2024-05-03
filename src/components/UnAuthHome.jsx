import { motion } from "framer-motion";

const UnAuthHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="flex flex-col items-center justify-center tracking-wider text-center mt-[100px]"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-5/6 md:w-3/5 text-2xl md:text-4xl font-bold leading-relaxed md:leading-relaxed"
      >
        Welcome to <span className="text-primary">BLOGS</span> – Your Gateway to
        Insightful and Engaging Content!
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-5 text-lg md:text-2xl md:w-3/5 font-semibold text-gray-500 leading-relaxed md:leading-relaxed"
      >
        Explore a world of captivating content, share your thoughts, and embark
        on a journey of discovery.
      </motion.h3>
    </motion.div>
  );
};

export default UnAuthHome;
