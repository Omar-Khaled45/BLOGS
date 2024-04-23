import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useListContext } from "../hooks/useListContext";

const AddBlogPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { setLoading } = useListContext();

  const [title, setTitle] = useState("");

  const [blog, setBlog] = useState("");

  // Add Blog to FireStore
  const createBlog = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "blogs"), {
      title,
      blog,
      author: { name: user.displayName, id: user.uid },
      time: {
        day: new Date().toLocaleString("en-US", {
          day: "numeric",
        }),
        month: new Date().toLocaleString("en-US", {
          month: "short",
        }),
        year: new Date().toLocaleString("en-US", {
          year: "numeric",
        }),
      },
      liked: false,
      likes: [],
    });

    setLoading(true);

    // Change Loading State
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    navigate("/");
  };

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-[calc(100vh-72px)] bg-secBackground flex items-center transition-all duration-300 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="w-[500px] bg-form rounded-lg shadow-lg dark:shadow-dark px-7 py-5">
          <h1 className="text-center text-4xl font-bold mb-10 relative after:content=[''] after:w-[50px] after:h-[5px] after:bg-primary after:absolute after:bottom-[-20px] after:left-[50%] after:-translate-x-2/4 ">
            Create Blog
          </h1>
          <form className="w-full" onSubmit={createBlog}>
            <div className="flex flex-col justify-center mb-3">
              <label htmlFor="title" className="block mb-3">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="p-4 rounded-md bg-secBackground  caret-primary focus:outline-none"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value.trim())}
              />
            </div>
            <div className="flex flex-col justify-center mb-6 ">
              <label htmlFor="blog" className="block mb-3">
                Blog
              </label>
              <textarea
                name="blog"
                className="p-4 rounded-md bg-secBackground  caret-primary resize-none h-52 focus:outline-none"
                placeholder={`What's on your mind, ${
                  user?.displayName?.split(" ")[0].charAt(0).toUpperCase() +
                  user?.displayName?.split(" ")[0].slice(1)
                }?`}
                onChange={(e) => setBlog(e.target.value.trim())}
                required
              ></textarea>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-white font-semibold w-full"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;
