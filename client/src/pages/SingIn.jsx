import { Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return dispatch(
          signInFailure(data.message || "Sign in failed. Please try again.")
        );
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(
        signInFailure("An error occurred during sign in. Please try again.")
      );
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="lg" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In" // Corrected text
                )}
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

            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center py-4 px-6 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    d="M19.6 10.23c0-.65-.06-1.28-.17-1.89H10v3.58h5.4c-.23 1.16-.91 2.15-1.93 2.81v2.35h3.11c1.82-1.67 2.86-4.12 2.86-6.85z"
                    fill="#4285F4"
                  />
                  <path
                    d="M13.47 15.73a6.22 6.22 0 01-8.93-1.33l-3.05 2.35a10 10 0 0014.45-.01 7.88 7.88 0 01-2.47-5.01z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.54 11.35a6.22 6.22 0 01-.24-1.73c0-.6.09-1.19.24-1.73l-3.05-2.34a10 10 0 000 9.41l3.05-2.34z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M13.47 4.55a5.96 5.96 0 014.22 1.69l3.05-2.35A9.94 9.94 0 0013.47 0c-3.95 0-7.34 2.28-9.22 5.67l3.05 2.34a6.22 6.22 0 015.17-3.46z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Dont Have an account?{" "}
              <Link
                to="/sing-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
            {errorMessage && (
              <Alert className="mt-5 bg-red-600 text-white rounded-2xl">
                {typeof errorMessage === "string"
                  ? errorMessage
                  : errorMessage.message}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
