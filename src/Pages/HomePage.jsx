import Skeleton from "../components/Skeleton";
import Blog from "../components/Blog";
import { useAuthContext } from "../hooks/useAuthContext";
import { useListContext } from "../hooks/useListContext";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const { user } = useAuthContext();

  const { loading, blogsList } = useListContext();

  if (user && !user.emailVerified) {
    return <Navigate to="/email-verification" />;
  }

  return (
    <div
      className={
        !user
          ? "min-h-[calc(100vh-72px)] transition-all duration-300 dark:text-mainText relative bg-homeLight dark:bg-homeDark bg-no-repeat bg-cover"
          : "min-h-[calc(100vh-72px)] bg-secBackground transition-all duration-300 dark:text-mainText relative"
      }
    >
      <div className="container flex justify-center">
        {!user ? (
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
              className="w-4/6 md:w-3/5 text-2xl md:text-4xl font-bold leading-relaxed md:leading-relaxed"
            >
              Welcome to <span className="text-primary">BLOGS</span> – Your
              Gateway to Insightful and Engaging Content!
            </motion.h1>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="mt-5 text-lg md:text-2xl font-semibold text-gray-500 leading-relaxed md:leading-relaxed"
            >
              Explore a world of captivating content, share your thoughts, and
              embark on a journey of discovery.
            </motion.h3>
          </motion.div>
        ) : (
          <div className="my-12">
            {blogsList.map((blog) => {
              return loading ? (
                <Skeleton key={blog.id} />
              ) : (
                <Blog key={blog.id} blog={blog} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
