import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useListContext } from "../hooks/useListContext";

const EditForm = ({ blog }) => {
  const { setBlogsList, blogsList } = useListContext();

  const [editTitle, setEditTitle] = useState(blog.title);

  const [editBlog, setEditBlog] = useState(blog.blog);

  const handleClick = (id) => {
    setBlogsList(
      blogsList.map((blog) => {
        return {
          ...blog,
          editing: blog.id === id && !blog.editing,
        };
      })
    );
  };

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
      {blog.editing && (
        <div
          className="bg-black/40 fixed inset-0 z-30 flex items-center justify-center"
          onClick={() => handleClick(blog.id)}
        >
          <div
            className="bg-form w-[400px] rounded-lg p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center font-bold pb-3 relative after:content=[''] after:w-[50px] after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Edit Blog
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center mb-3">
                <label htmlFor="title" className="block mb-3">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="p-4 rounded-md bg-secBackground  caret-primary focus:outline-none"
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center mb-6 ">
                <label htmlFor="blog" className="block mb-3">
                  Blog
                </label>
                <textarea
                  name="blog"
                  className="p-4 rounded-md bg-secBackground  caret-primary resize-none h-52 focus:outline-none"
                  value={editBlog}
                  onChange={(e) => setEditBlog(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary text-white font-semibold w-full"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditForm;
