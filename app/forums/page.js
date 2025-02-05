"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
// import fs from "fs";
// import path from "path";

const page = () => {
  const [bubbles, setBubbles] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // try {
  //   const filePath = path.join(process.cwd(), `${process.env.NEXT_JSON_CONFIG_FILE}`);
  //   const jsonData = await new Promise((resolve, reject) => {
  //     fs.readFile(filePath, "utf8", (err, data) => {
  //       if (err) reject(err);
  //       resolve(data);
  //     });
  //   });
  //   const data = JSON.parse(jsonData);
  //   bubbles = data.bubbles;
  // } catch (error) {
  //   if (error.code === "ENOENT") {
  //     errorMessage = "Bubbles configuration file not found.";
  //   } else {
  //     errorMessage = "An error occurred while loading bubbles.";
  //   }
  // }

  useEffect(() => {
    fecthData();
  }, [isDeleted]);

  async function fecthData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/getBubble`
      );
      setBubbles(response.data.result);
      // console.log("bubbles:- ", bubbles);
    } catch (error) {
      setErrorMessage("An error occurred while fetching bubbles.");
      toast.error("Error occured while fetching bubbles");
    }
  }

  async function handleDelete(bubbleID) {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this bubble? This action cannot be undone."
    );

    if (userConfirmed) {
      try {
        // Make API call to delete endpoint
        setLoading(true);
        const response = await axios.delete(
          `http://localhost:3000/api/deleteBubble?id=${bubbleID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle successful response
        if (response.data.success) {
          setIsDeleted(true);
          setLoading(false)
          toast.success("Bubble deleted");
          return {
            success: true,
            error: null,
            message: response.data.message,
          };
        } else {
          // Handle API error response
          toast.error("Failed to delete bubble");
          return {
            success: false,
            error: response.data.message || "Failed to delete bubble",
            message: null,
          };
        }
      } catch (error) {
        // Handle network errors
        if (error.response) {
          // Server responded with non-2xx status
          toast.error("Server error");
          return {
            success: false,
            error: error.response.data.message || "Server error",
            message: null,
          };
        }

        // Generic error for network issues
        toast.error("Network error - failed to connect to server");
        return {
          success: false,
          error: "Network error - failed to connect to server",
          message: null,
        };
      }
    }
    else{
      toast.warning("Deletion cancelled by user")
    }
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="min-h-screen container mx-auto p-4 py-2 relative">
        <h1 className="font-bold text-center text-4xl my-4 text-indigo-600">
          Bubbles
        </h1>
        <Link href={"/createBubble"}>
          <Button className="md:absolute top-5 right-2 m-2 text-white text-lg">
            Create new Bubble
          </Button>
        </Link>
        {errorMessage ? (
          <div className="flex items-center justify-center mt-48">
            <h1 className="text-center text-2xl text-red-600">
              {errorMessage}
            </h1>
          </div>
        ) : bubbles && bubbles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-5">
            {bubbles.map((bubble, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center gap-3"
              >
                {bubble.image ? (
                  <Image
                    src={bubble.image}
                    width={150}
                    height={150}
                    alt="bubble_img"
                  />
                ) : (
                  <span className="font-bold text-indigo-600 text-lg">
                    BubbleChat
                  </span>
                )}
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition hover:cursor-pointer"
                  onClick={() => handleDelete(bubble._id)}
                  disabled={loading}
                >
                  <Trash2 size={18} />
                </button>
                <h2 className="font-bold text-2xl">{bubble.groupName}</h2>
                <p className="px-3">{bubble.description}</p>
                <Link href={`/forum/${bubble.groupName}`}>
                  <Button className="px-4 border border-slate-300">
                    Discuss now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-center text-2xl text-black">
              No <span className="text-indigo-600">Bubbles</span> Found
            </h1>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
