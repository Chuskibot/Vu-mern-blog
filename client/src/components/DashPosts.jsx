import { Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 12) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 12) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <div className="relative">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-t-lg bg-gray-500"
                  />
                </Link>
                <div className="p-4">
                  <Link
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-teal-600 transition-colors duration-300"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold mt-3 tracking-wide">
                    <span className="text-gray-500 dark:text-gray-400">
                      Department:{" "}
                    </span>
                    <span className="text-gray-900 dark:text-white">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span className="font-medium text-gray-500 dark:text-gray-300">
                      Updated on:{" "}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </span>
                  </p>

                  <div className="mt-4 flex space-x-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-500 cursor-pointer hover:underline transition-colors duration-300"
                    >
                      Delete
                    </span>
                    <Link
                      className="text-teal-500 cursor-pointer hover:underline transition-colors duration-300"
                      to={`/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full bg-teal-500 text-white text-sm py-3 rounded-lg mt-4 hover:bg-teal-600 transition-colors duration-300"
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          You have no posts yet!
        </p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 font-semibold py-2 px-4 rounded-lg"
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 font-semibold py-2 px-4 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
