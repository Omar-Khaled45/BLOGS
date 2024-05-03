import Blog from "./Blog";
import Skeleton from "./Skeleton";

const AuthHome = ({ blogsList, loading }) => {
  return (
    <div className="my-12">
      {blogsList.map((blog) => {
        return loading ? (
          <Skeleton key={blog.id} />
        ) : (
          <Blog key={blog.id} blog={blog} />
        );
      })}
    </div>
  );
};

export default AuthHome;
