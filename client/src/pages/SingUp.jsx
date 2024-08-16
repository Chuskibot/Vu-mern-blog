import { Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";



export default function SignUp() {
  const [formData, setFormData] = useState({});

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
       
      return setErrorMessage('Please fill out all fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate ('/sing-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex max-w-6xl mx-auto items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center pr-10 border-r border-gray-300">
          <Link to="/" className="text-5xl font-bold dark:text-white mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 rounded-md text-white">
              VU
            </span>
            Blog
          </Link>
          <p className="text-xl font-medium text-gray-700 mt-6 mb-8 leading-relaxed text-center max-w-prose">
            Varendra University Blogging App offers students and faculty a
            dynamic platform to share insights, experiences, and academic
            content.
          </p>
        </div>
        {/* SignUp Form Section */}
        <div className="pl-10 flex-grow">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="username"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Your password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled ={loading}
              >
                {
                  loading ? (
                    <>
                    <Spinner size='lg' />
                     <span className="pl-3">Loading...</span>
                     </>
                    ) : 'Sing Up'
                  }
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <OAuth />
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Have an account?{" "}
              <Link
                to="/sing-in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
            {
            errorMessage && (
              <Alert className="mt-5 bg-red-600 text-white rounded-2xl">
                {errorMessage}
              </Alert>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
}
