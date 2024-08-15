import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <motion.h1
          className="text-3xl font-semibold my-7"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text px-1">
            About
          </span>
          <span className="text-gradient bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            VU Blog
          </span>
        </motion.h1>
        <div className="text-md text-gray-700 leading-relaxed space-y-6">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg"
          >
            Welcome to <span className="text-blue-600">VU Blog</span>! This blog
            was created by <span className="text-green-600">Ruhit Rahman</span>{" "}
            as a platform for students and faculty at Varendra University to
            share their thoughts, ideas, and experiences with the world. Ruhit
            is a passionate developer with a keen interest in web development,
            programming, and technology, and he created this blog to foster a
            community of learners and innovators.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg"
          >
            On this blog, you'll find weekly articles, tutorials, and insights
            on a variety of topics, including web development, software
            engineering, and programming languages. The VU Blog is a space for
            exploring new technologies, sharing knowledge, and engaging in
            meaningful discussions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg"
          >
            We encourage you to leave comments on our posts and interact with
            other readers. You can like comments, reply to them, and be part of
            a vibrant community that supports learning and growth. Whether
            you're a student, a faculty member, or just someone passionate about
            technology, VU Blog is the place for you to connect, learn, and
            share.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
