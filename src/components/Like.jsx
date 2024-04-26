import { useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuthContext } from "../hooks/useAuthContext";
import useClickOutside from "../hooks/useClickOutside";

const Like = ({ blog }) => {
  const { user } = useAuthContext();

  const [show, setShow] = useState(false);

  const likeRef = useRef(null);

  useClickOutside(likeRef, () => setShow(false));

  const handleLikes = async (id) => {
    // Get the Like State For The Desired Blog
    const { likes } = (await getDoc(doc(db, "blogs", id))).data();

    const currentUserLiked = likes.some((like) => like.userId === user.uid);

    if (!currentUserLiked) {
      // Add The User Who Likes The Blog to The Likes
      const newLike = { username: user.displayName, userId: user.uid };

      updateDoc(doc(db, "blogs", id), {
        likes: [...likes, newLike],
      });
    } else {
      // Remove The User Who Likes The Blog From The Likes
      const updatedLikes = likes.filter((like) => like.userId !== user.uid);

      updateDoc(doc(db, "blogs", id), {
        likes: updatedLikes,
      });
    }
  };

  return (
    <>
      <div className="mt-3 flex items-center" ref={likeRef}>
        <button className="cursor-pointer flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={`${
              blog?.likes?.some((like) => like.userId === user.uid)
                ? "var(--primary-color)"
                : "currentColor"
            }`}
            className={`w-5 h-5 me-1 ${
              blog?.likes?.some((like) => like.userId === user.uid) &&
              "fill-primary"
            } `}
            onClick={() => handleLikes(blog.id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span
            onClick={() =>
              blog.likes.length === 0 ? setShow(false) : setShow(!show)
            }
          >
            {blog.likes.length}
          </span>
        </button>
      </div>
      {show && (
        <div className="bg-black/40 fixed inset-0 z-30 flex items-center justify-center">
          {blog.likes.length > 0 && (
            <div
              className="bg-form rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center font-bold p-3 relative after:content=[''] after:w-[50px] after:h-[2px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
                Likes
              </h3>
              <ul className="w-[350px] md:w-[400px] max-h-[400px] overflow-auto z-40">
                {blog.likes.map((like, index) => {
                  return (
                    <li
                      key={index}
                      className={`p-3 ${
                        index !== blog?.likes?.length - 1 &&
                        "border-b border-[#bfbfbf] dark:border-[#474747]"
                      }`}
                    >
                      {like.username}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Like;
