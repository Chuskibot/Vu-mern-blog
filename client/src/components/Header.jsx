import { Button, Navbar, TextInput, Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('query');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    
    if (searchTerm.trim()) {
      params.set('query', searchTerm);  // Set the searchTerm in the URL
    } else {
      params.delete('query'); // Remove 'query' if searchTerm is empty
    }
    
    // Navigate with updated URL parameters
    navigate({
      pathname: '/search',
      search: params.toString(),
    });
  };

  return (
    <Navbar className="bg-transparent border-b-4 border-teal-500 shadow-lg px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl sm:text-2xl font-bold dark:text-white transition-transform transform hover:scale-105"
      >
        <span className='px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white shadow-md'> 
          VU
        </span>
        Blog
      </Link>

      <form className="hidden lg:flex items-center" onSubmit={handleSearchSubmit}>
        <div className="relative">
          <TextInput
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      <Button className="w-12 h-10 flex items-center justify-center text-white lg:hidden" color="gray" onClick={handleSearchSubmit}>
        <AiOutlineSearch className="text-xl" />
      </Button>

      <div className="flex gap-4 md:order-2">
        <Button
          className="w-12 h-10 flex items-center justify-center text-white bg-gradient-to-r from-yellow-400 to-red-500 rounded-full hover:from-red-500 hover:to-yellow-400 transition-colors duration-300"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture || "path/to/default-image.png"}
                rounded
                className="shadow-lg"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="text-gray-700 bg-white hover:bg-gray-200">Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} className="text-gray-700 bg-white hover:bg-gray-200">Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sing-in">
            <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-black">
              Sign in
            </button>
          </Link>
        )}
      </div>

      <Navbar.Link
        active={location.pathname === "/"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-3 py-2 rounded-lg inline-flex transition-colors duration-300 hover:text-white hover:from-purple-500 hover:to-orange-500"
      >
        <Link to="/">Home</Link>
      </Navbar.Link>
      <Navbar.Link
        active={location.pathname === "/about"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-3 py-2 rounded-lg inline-flex transition-colors duration-300 hover:text-white hover:from-purple-500 hover:to-orange-500"
      >
        <Link to="/about">About</Link>
      </Navbar.Link>
      <Navbar.Link
        active={location.pathname === "/projects"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-3 py-2 rounded-lg inline-flex transition-colors duration-300 hover:text-white hover:from-purple-500 hover:to-orange-500"
      >
        <Link to="/projects">Projects</Link>
      </Navbar.Link>
    </Navbar>
  );
}
