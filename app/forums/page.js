import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const topic = [
    {
      title: "Python",
      description:
        "Python is a programming language that lets you work quickly and integrate systems more effectively.",
      img: "/python.png",
      slug: "python-new",
    },
    {
      title: "Javascript",
      description:
        "JavaScript is a versatile language commonly used for web development.",
      img: "/javascript.png",
      slug: "javascript-new",
    },
    {
      title: "Java",
      description:
        "Java is a high-level, class-based, object-oriented programming language.",
      img: "/java.png",
      slug: "java-new",
    },
    {
      title: "C++",
      description:
        "C++ is a general-purpose programming language created as an extension of the C programming language.",
      img: "/cpp.png",
      slug: "cpp-new",
    },
    {
      title: "Ruby",
      description:
        "Ruby is a dynamic, open source programming language with a focus on simplicity and productivity.",
      img: "/ruby.png",
      slug: "ruby-new",
    },
    {
      title: "React",
      description:
        "React is a JavaScript library for building user interfaces.",
      img: "/react.png",
      slug: "react-new",
    },
    {
      title: "NextJS",
      description:
        "Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.",
      img: "/nextjs.png",
      slug: "nextjs-new",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="min-h-screen container mx-auto p-4 py-2 relative">
        {/* <Link href={"/createBubble"}>
          <Button className="absolute top-3 right-0 m-4 text-white text-lg">
            Create new Bubble
          </Button>
        </Link> */}
        <h1 className="font-bold text-center text-4xl my-4 text-indigo-600">
          Bubbles
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-5">
          {topic.map((topic, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center gap-3"
            >
              <Image src={topic.img} width={100} height={100} alt="card img" />
              <h2 className="font-bold text-2xl">{topic.title}</h2>
              <p className="px-3">{topic.description}</p>
              <Link href={`/forum/${topic.slug}`}>
                <Button className="px-4 border border-slate-300">
                  Discuss now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
