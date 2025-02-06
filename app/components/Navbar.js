"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

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
              <Link href="/" className="flex items-center py-4 px-2 gap-2">
                <span className="font-bold text-indigo-600 text-4xl">
                  BubbleChat
                </span>
                <Image
                  src={"/bubble_chat.png"}
                  width={50}
                  height={50}
                  alt="bubble_chat_logo"
                ></Image>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {currentUser.isSignedIn ? (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    href="/forums"
                    className="py-4 px-2 text-gray-500 font-semibold md:hover:text-indigo-600 transition duration-300"
                  >
                    Chat
                  </Link>
                </div>

                <UserButton />
              </>
            ) : (
              <>
                <div className="flex justify-center items-center py-5 gap-4">
                  <Link
                    href={process.env.NEXT_PUBLIC_CLERK_LOGIN_URL}
                    className="py-2 px-2 font-medium text-gray-500 rounded-xl md:hover:bg-indigo-600 md:hover:text-white transition duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
                    className="py-2 px-2 font-medium text-white bg-indigo-600 rounded-xl md:hover:bg-indigo-500 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* menu toggel button */}
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

      {/* mobile view */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        {currentUser.isSignedIn ? (
          <>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/forums"
                className="py-4 px-2 text-gray-500 font-semibold md:hover:text-indigo-600 transition duration-300"
              >
                Chat
              </Link>
            </div>

            <UserButton />
          </>
        ) : (
          <div className="flex justify-center items-center py-5 gap-4">
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_LOGIN_URL}
              className="py-2 px-2 font-medium text-gray-500 rounded-xl md:hover:bg-indigo-600 md:hover:text-white transition duration-300"
            >
              Log In
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
              className="py-2 px-2 font-medium text-white bg-indigo-600 rounded-xl md:hover:bg-indigo-500 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
