import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full max-w-sm border rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-teal-600 bg-white dark:bg-gray-800'>
      <Link to={`/post/${post.slug}`} className='block'>
        <img
          src={post.image}
          alt='post cover'
          className='w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-110'
        />
      </Link>
      <div className='absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'>
        <div className='flex flex-col gap-3'>
          <p className='text-lg font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300'>
            {post.title}
          </p>
          <span className='italic text-sm text-gray-300'>{post.category}</span>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className='inline-block py-2 px-4 border border-teal-500 rounded-full text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-y-1'
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}
