import { useRef, useState } from "react";
import Like from "./Like";
import EditForm from "./EditForm";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase-config";
import { useAuthContext } from "../hooks/useAuthContext";
import useClickOutside from "../hooks/useClickOutside";
import { useListContext } from "../hooks/useListContext";

const Blog = ({ blog }) => {
  const { user } = useAuthContext();

  const { blogsList, setBlogsList } = useListContext();

  // Show State For Blog Menu
  const [show, setShow] = useState(false);

  const blogMenuRef = useRef(null);

  useClickOutside(blogMenuRef, () => {
    setShow(false);
  });

  // Alert Message For Deleting a Blog
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this blog?",
      text: "Blogs you delete can't be restored.",
      showCancelButton: true,
      background: "var(--form-color)",
      color: "var(--main-text)",
      confirmButtonColor: "var(--primary-color)",
      cancelButtonColor: "#b6bbc4",
      confirmButtonText: "Delete",
      animation: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "blogs", id));
      }
    });

    setShow(false);
  };

  // Handle Edit Blog
  const handleEdit = (id) => {
    setBlogsList(
      blogsList.map((blog) => {
        return {
          ...blog,
          editing: blog.id === id && !blog.editing,
        };
      })
    );

    setShow(false);
  };

  return (
    <>
      <div className="p-5 bg-form mb-7 rounded-xl shadow-md dark:shadow-dark w-[400px] md:w-[600px] relative">
        <h1 className="text-4xl font-bold">
          {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}{" "}
        </h1>
        {user.uid === blog.author.id && (
          <div className="absolute top-2 right-4" ref={blogMenuRef}>
            <button onClick={() => setShow(!show)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 rotate-90 rounded-full cursor-pointer md:hover:bg-gray-500/30"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
            {show && (
              <ul className="absolute top-8 right-0 bg-zinc-100 shadow-xl dark:bg-zinc-700 dark:shadow-dark rounded-lg w-32">
                <li
                  className="p-2 rounded-lg m-1 cursor-pointer md:hover:bg-gray-500/20 dark:md:hover:bg-neutral-500/50 flex items-center"
                  onClick={() => handleEdit(blog.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  Edit
                </li>
                <li
                  className="p-2 rounded-lg m-1 cursor-pointer md:hover:bg-neutral-500/20 dark:md:hover:bg-gray-500/50 flex items-center"
                  onClick={() => handleDelete(blog.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete
                </li>
              </ul>
            )}
          </div>
        )}

        <span className="text-gray-500 text-sm">
          {blog.time.day} {blog.time.month} {blog.time.year}
        </span>
        <p className="text-lg my-3 h-auto max-h-[400px] overflow-auto">
          {blog.blog}
        </p>
        <p className="font-semibold text-gray-500">By: {blog.author.name}</p>
        <Like blog={blog} />
      </div>
      <EditForm blog={blog} />
    </>
  );
};

export default Blog;
