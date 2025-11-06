import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { useListContext } from "../contexts/ListProvider";

const AddPostPage = () => {
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

  if (user && !user?.emailVerified) {
    return <Navigate to="/email-verification" />;
  }

  return (
    <div className="flex h-[calc(100vh-72px)] items-center bg-secBackground transition-all duration-300 dark:text-mainText">
      <div className="container flex justify-center">
        <div className="w-[500px] rounded-lg bg-form px-7 py-5 shadow-lg dark:shadow-dark">
          <h1 className="after:content=[''] relative mb-5 text-center text-2xl font-bold after:absolute after:bottom-[-15px] after:left-1/2 after:h-[5px] after:w-[50px] after:-translate-x-1/2 after:bg-primary md:mb-10 md:text-4xl md:after:bottom-[-20px]">
            Create Blog
          </h1>
          <form className="w-full" onSubmit={createBlog}>
            <div className="mb-3 flex flex-col justify-center">
              <label htmlFor="title" className="mb-3 block">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value.trim())}
              />
            </div>
            <div className="mb-6 flex flex-col justify-center">
              <label htmlFor="blog" className="mb-3 block">
                Blog
              </label>
              <textarea
                name="blog"
                className="h-52 resize-none rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
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
                className="w-full rounded-full bg-primary px-5 py-2 font-semibold text-white"
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

export default AddPostPage;
