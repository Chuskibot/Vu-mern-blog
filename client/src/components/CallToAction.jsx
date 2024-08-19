import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="p-5 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between">
      <div className="flex-1 flex flex-col items-center text-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">
          Admission is now open at Varendra University!
        </h2>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-full py-2 px-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          <a
            href="https://vu.edu.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold"
          >
            Apply Online
          </a>
        </Button>
      </div>
      <div className="p-5 flex-1 flex justify-center items-center">
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipN5CZ8Pn_WkAuImtAoxqurZGVcQwpaDguzbOy--=s680-w680-h510"
            alt="Modern Design"
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 transition-opacity duration-500 ease-in-out group-hover:opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-r from-black via-transparent to-transparent">
            <h3 className="text-white text-xl font-semibold transition-transform duration-500 ease-in-out transform group-hover:translate-x-2 group-hover:translate-y-2">
              Explore Our Campus
            </h3>
            <p className="text-white text-sm mt-2 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-80">
              Discover the vibrant and inspiring environment at Varendra University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
