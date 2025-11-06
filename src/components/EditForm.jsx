import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const EditForm = ({ blog, handleClick }) => {
  const [editTitle, setEditTitle] = useState(blog.title);

  const [editBlog, setEditBlog] = useState(blog.blog);

  // Function to Submit Edited Title & Blog
  const handleSubmit = (e) => {
    e.preventDefault();

    updateDoc(doc(db, "blogs", blog.id), {
      title: editTitle.trim(),
      blog: editBlog.trim(),
    });
  };

  return (
    <>
      {
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40"
          onClick={() => handleClick(blog.id)}
        >
          <div
            className="relative w-[350px] rounded-lg bg-form p-5 md:w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="after:content=[''] relative pb-3 text-center font-bold after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-[50px] after:-translate-x-1/2 after:bg-primary">
              Edit Blog
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 flex flex-col justify-center">
                <label htmlFor="title" className="mb-3 block">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="mb-6 flex flex-col justify-center">
                <label htmlFor="blog" className="mb-3 block">
                  Blog
                </label>
                <textarea
                  name="blog"
                  className="h-52 resize-none rounded-md bg-secBackground p-4 caret-primary focus:outline-none"
                  value={editBlog}
                  onChange={(e) => setEditBlog(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-5 py-2 font-semibold text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default EditForm;
