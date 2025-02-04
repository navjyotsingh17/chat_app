import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

const page = async () => {
  let bubbles = null;
  let errorMessage = null;

  try {
    const filePath = path.join(process.cwd(), `${process.env.NEXT_JSON_CONFIG_FILE}`);
    const jsonData = await new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    const data = JSON.parse(jsonData);
    bubbles = data.bubbles;
  } catch (error) {
    if (error.code === "ENOENT") {
      errorMessage = "Bubbles configuration file not found.";
    } else {
      errorMessage = "An error occurred while loading bubbles.";
    }
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="min-h-screen container mx-auto p-4 py-2 relative">
        <h1 className="font-bold text-center text-4xl my-4 text-indigo-600">
          Bubbles
        </h1>
        <Link href={"/createBubble"}>
          <Button className="md:absolute top-3 right-0 m-2 text-white text-lg">
            Create new Bubble
          </Button>
        </Link>
        {errorMessage ? (
          <div className="flex items-center justify-center mt-48">
            <h1 className="text-center text-2xl text-red-600">{errorMessage}</h1>
          </div>
        ) : bubbles && bubbles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-5">
            {bubbles.map((bubble, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center gap-3"
              >
                {bubble.img ? (
                  <Image
                    src={bubble.img}
                    width={100}
                    height={100}
                    alt="bubble_img"
                  />
                ) : (
                  <span className="font-bold text-indigo-600 text-lg">
                    BubbleChat
                  </span>
                )}
                <h2 className="font-bold text-2xl">{bubble.title}</h2>
                <p className="px-3">{bubble.description}</p>
                <Link href={`/forum/${bubble.slug}`}>
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
    </div>
  );
};

export default page;
