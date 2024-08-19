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
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'> 
          VU
        </span>
        Blog
      </Link>

      <form className="hidden lg:flex items-center" onSubmit={handleSearchSubmit}>
        <div className="relative">
          <TextInput
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </form>

      <Button className="w-12 h-10 flex text-gray-500 lg:hidden" color="gray" onClick={handleSearchSubmit}>
        <AiOutlineSearch className="text-1xl" />
      </Button>

      <div className="flex gap-3 md:order-2">
        <Button
          className="w-12 h-10 flex items-center justify-center text-gray-500"
          color="gray"
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
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium py-2 px-4 rounded transition-colors duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-black">
              Sign in
            </button>
          </Link>
        )}
      </div>

      <Navbar.Link
        active={location.pathname === "/"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/">Home</Link>
      </Navbar.Link>
      <Navbar.Link
        active={location.pathname === "/about"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/about">About</Link>
      </Navbar.Link>
      <Navbar.Link
        active={location.pathname === "/projects"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/projects">Projects</Link>
      </Navbar.Link>
    </Navbar>
  );
}
