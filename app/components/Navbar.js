"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                {/* <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="h-8 w-8 mr-2" /> */}
                <span className="font-bold text-indigo-600 text-4xl">
                  BubbleChat
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/forums"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-600 transition duration-300"
              >
                Forums
              </Link>
              <Link
                href="/chat"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-indigo-600 transition duration-300"
              >
                Chat
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {currentUser.isSignedIn ? (
              <UserButton />
            ) : (
              <>
                {/* <Link
                  href="/login"
                  className="py-2 px-2 font-medium text-gray-500 rounded-xl hover:bg-indigo-600 hover:text-white transition duration-300"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="py-2 px-2 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition duration-300"
                >
                  Sign Up
                </Link> */}
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="">
          <li>
            <Link
              href="/"
              className="block text-sm px-2 py-4 text-white bg-indigo-500 font-semibold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/forums"
              className="block text-sm px-2 py-4 hover:bg-indigo-500 transition duration-300"
            >
              Forums
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className="block text-sm px-2 py-4 hover:bg-indigo-500 transition duration-300"
            >
              Chat
            </Link>
          </li>
          {currentUser.isSignedIn ? (
            <UserButton />
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
