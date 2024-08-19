import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Modal, Button } from 'flowbite-react';

export default function DashComments() {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/comment/getcomments`);
          const data = await res.json();
          if (res.ok) {
            setComments(data.comments);
            if (data.comments.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isAdmin) {
        fetchComments();
      }
    }, [currentUser._id]);
  
    const handleShowMore = async () => {
      const startIndex = comments.length;
      try {
        const res = await fetch(
          `/api/comment/getcomments?startIndex=${startIndex}`
        );
        const data = await res.json();
        if (res.ok) {
          setComments((prev) => [...prev, ...data.comments]);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleDeleteComment = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/comment/deleteComment/${commentIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (res.ok) {
          setComments((prev) =>
            prev.filter((comment) => comment._id !== commentIdToDelete)
          );
          setShowModal(false);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className="overflow-x-auto p-6 space-y-6">
  {currentUser.isAdmin && comments.length > 0 ? (
    <>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex flex-col p-5 border border-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium tracking-wider">
              {new Date(comment.updatedAt).toLocaleDateString()}
            </span>
            <span className="text-sm bg-gray-800 px-2 py-1 rounded-lg shadow-inner">
              {comment.numberOfLikes} Likes
            </span>
          </div>
          <div className="text-base mb-2">
            <p className="font-semibold">{comment.content}</p>
          </div>
          <div className="flex justify-between items-center text-xs ">
            <span className="opacity-75">Post ID: {comment.postId}</span>
            <span className="px-3 opacity-75">User ID: {comment.userId}</span>
            <button
              onClick={() => {
                setShowModal(true);
                setCommentIdToDelete(comment._id);
              }}
              className=" font-bold text-sm text-green-500 hover:text-red-600 transition-colors px-5"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-pink-500 text-sm py-4 transform hover:scale-105 transition-transform"
        >
          Show more
        </button>
      )}
    </>
  ) : (
    <p className="text-center text-gray-500">You have no comments yet!</p>
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
          Are you sure you want to delete this comment?
        </h3>
        <div className="flex justify-center gap-4">
        <button
  onClick={handleDeleteComment}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
>
  Yes, I'm sure
</button>
<button
  onClick={() => setShowModal(false)}
  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
>
  No, cancel
</button>

        </div>
      </div>
    </Modal.Body>
  </Modal>
</div>



  );
}
