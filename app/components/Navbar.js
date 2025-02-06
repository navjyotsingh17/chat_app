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
            <div className="">
              <Link href="/" className="items-center py-4 px-2 flex gap-2">
                {/* <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="h-8 w-8 mr-2" /> */}
                <span className="font-bold text-indigo-600 text-4xl">
                  BubbleChat 
                </span>
                <Image src={"/favicon.ico"} width={50} height={50} alt="bubble_chat_logo"></Image>
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
              <></>
            )}
          </div>
        </div>
      </div>
      {currentUser.isSignedIn ? (
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
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
          <ul className="">
            <li>
              <Link
                href="/forums"
                className="block text-sm px-2 py-4 md:hover:bg-indigo-500 transition duration-300"
              >
                Chat
              </Link>
            </li>
            {currentUser.isSignedIn ? (
              <>
                <div>
                  <li>
                    <Link
                      href="/forums"
                      className="block text-sm px-2 py-4 md:hover:bg-indigo-500 transition duration-300"
                    >
                      Chat
                    </Link>
                  </li>
                </div>
                <UserButton />
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
