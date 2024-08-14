import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500">
          VU
        </span>
        Blog
      </Link>

      <form className="hidden lg:flex items-center">
  <div className="relative">
    <TextInput
      type="text"
      placeholder="Search..."
      className="pl-10 pr-4 py-2 border rounded-full"
    />
    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  </div>
</form>


      <Button className="w-12 h-10 flex  text-gray-500 lg:hidden" color="gray">
        <AiOutlineSearch className="text-1xl" />
      </Button>

      <div className="flex gap-3 md:order-2">
        <Button
          className="w-12 h-10 flex items-center justify-center text-gray-500" // Adjusted height and centering
          color="gray"
        >
          <FaMoon className="text-xl" /> {/* Adjust icon size */}
        </Button>

        <Link to="/sing-in">
          <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white font-medium py-2 px-4 rounded  transition-colors duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-black">
            Sign in
          </button>
        </Link>
      </div>

      <Navbar.Link
        active={currentPath === "/"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/">Home</Link>
      </Navbar.Link>
      <Navbar.Link
        active={currentPath === "/about"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/about">About</Link>
      </Navbar.Link>
      <Navbar.Link
        active={currentPath === "/projects"}
        as={"div"}
        className="bg-gradient-to-r from-purple-300 to-orange-300 text-black font-medium px-2 rounded inline-flex transition-colors duration-300 hover:text-purple-600"
      >
        <Link to="/projects">Projects</Link>
      </Navbar.Link>
    </Navbar>
  );
}
