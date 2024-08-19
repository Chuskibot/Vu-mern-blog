import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500 bg-gradient-to-r from-gray-800 to-gray-900 text-white'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 sm:flex justify-between items-center py-8'>
          <motion.div 
            className='mt-5'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-2xl font-semibold dark:text-white'
            >
              <span className='px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white shadow-lg'>
                VU
              </span>
              Blog
            </Link>
          </motion.div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  VU Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/Chuskibot'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#' className='hover:underline'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#' className='hover:underline'>Privacy Policy</Footer.Link>
                <Footer.Link href='#' className='hover:underline'>Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </motion.div>
          </div>
        </div>
        <Footer.Divider className='border-teal-500' />
        <div className='w-full sm:flex sm:items-center sm:justify-between py-6'>
          <Footer.Copyright
            href='#'
            by='ChuskiBot'
            year={new Date().getFullYear()}
            className='text-sm sm:text-base'
          />
          <motion.div 
            className='flex gap-6 sm:mt-0 mt-4 justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Footer.Icon href='https://www.facebook.com/profile.php?id=100091277072421' icon={BsFacebook} className='hover:scale-110 transition-transform' />
            <Footer.Icon href='#' icon={BsInstagram} className='hover:scale-110 transition-transform' />
            <Footer.Icon href='#' icon={BsTwitter} className='hover:scale-110 transition-transform' />
            <Footer.Icon href='https://github.com/Chuskibot' icon={BsGithub} className='hover:scale-110 transition-transform' />
            <Footer.Icon href='#' icon={BsDribbble} className='hover:scale-110 transition-transform' />
          </motion.div>
        </div>
      </div>
    </Footer>
  );
}
