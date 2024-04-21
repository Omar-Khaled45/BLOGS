import Skeleton from "../components/Skeleton";
import Blog from "../components/Blog";
import { useAuthContext } from "../hooks/useAuthContext";
import { useListContext } from "../hooks/useListContext";

const HomePage = () => {
  // User Context
  const { user } = useAuthContext();

  // Blog List Context
  const { loading, blogsList } = useListContext();

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
          <div className="md:w-3/5 tracking-wider mt-[100px] text-center">
            <h1 className="text-4xl font-bold leading-relaxed ">
              Welcome to <span className="text-primary">BLOGS</span> – Your
              Gateway to Insightful and Engaging Content!
            </h1>
            <h3 className="mt-5 text-2xl font-semibold text-gray-500 leading-relaxed">
              Explore a world of captivating content, share your thoughts, and
              embark on a journey of discovery.
            </h3>
          </div>
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
