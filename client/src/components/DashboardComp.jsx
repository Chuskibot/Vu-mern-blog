import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className='p-6 md:mx-auto'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {/* Total Users Card */}
        <div className='flex flex-col p-4 bg-gray-800 text-white gap-4 md:w-80 w-full rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-400 text-lg uppercase'>Total Users</h3>
              <p className='text-3xl font-bold'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-6xl p-4 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-400'>Last month</div>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className='flex flex-col p-4 bg-gray-800 text-white gap-4 md:w-80 w-full rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-400 text-lg uppercase'>Total Comments</h3>
              <p className='text-3xl font-bold'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600 text-white rounded-full text-6xl p-4 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-400'>Last month</div>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className='flex flex-col p-4 bg-gray-800 text-white gap-4 md:w-80 w-full rounded-lg shadow-lg transition-transform transform hover:scale-105'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-400 text-lg uppercase'>Total Posts</h3>
              <p className='text-3xl font-bold'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-6xl p-4 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-400'>Last month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 py-6 mx-auto justify-center'>
        {/* Recent Users Section */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-800 text-white'>
          <div className='flex justify-between p-4 text-sm font-semibold'>
            <h1 className='text-center'>Recent Users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=users'}>See All</Link>
            </Button>
          </div>
          <div className='overflow-x-auto'>
            <ul className='divide-y divide-gray-700'>
              {users.map((user) => (
                <li key={user._id} className='flex items-center p-3 hover:bg-gray-700 transition-colors'>
                  <img
                    src={user.profilePicture}
                    alt='user'
                    className='w-12 h-12 rounded-full bg-gray-500'
                  />
                  <span className='ml-4 text-lg'>{user.username}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Comments Section */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-800 text-white'>
          <div className='flex justify-between p-4 text-sm font-semibold'>
            <h1 className='text-center'>Recent Comments</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=comments'}>See All</Link>
            </Button>
          </div>
          <div className='overflow-x-auto'>
            <ul className='divide-y divide-gray-700'>
              {comments.map((comment) => (
                <li key={comment._id} className='flex items-center p-3 hover:bg-gray-700 transition-colors'>
                  <p className='line-clamp-2'>{comment.content}</p>
                  <span className='ml-auto'>{comment.numberOfLikes} Likes</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-800 text-white'>
          <div className='flex justify-between p-4 text-sm font-semibold'>
            <h1 className='text-center'>Recent Posts</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>See All</Link>
            </Button>
          </div>
          <div className='overflow-x-auto'>
            <ul className='divide-y divide-gray-700'>
              {posts.map((post) => (
                <li key={post._id} className='flex items-center p-3 hover:bg-gray-700 transition-colors'>
                  <img
                    src={post.image}
                    alt='post'
                    className='w-16 h-12 rounded-md bg-gray-500'
                  />
                  <div className='ml-4'>
                    <h3 className='font-semibold'>{post.title}</h3>
                    <span className='text-gray-400'>{post.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
