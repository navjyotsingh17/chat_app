// "use client";
import React from "react";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

export default function Home() {
  // const user = useUser();
  // console.log(user)
  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        {/* Main Hero Content */}
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Connect and Chat seamlessly on
          <span className="relative whitespace-nowrap text-indigo-600">
            <span className="relative"> BubbleChat</span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Experience real-time conversations like never before. Join thousands
          of users who trust BubbleChat for their communication needs.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-x-6">
          <Link href={"/forums"}>
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
              Get Started
              <ArrowRight className="ml-2 inline-block h-5 w-5" />
            </button>
          </Link>

          <Link href={"/about"}>
            <button className="rounded-xl bg-white px-6 py-3 text-lg font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600">
              Learn More
            </button>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
            <MessageSquare className="h-12 w-12 text-indigo-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Real-time Chat
            </h3>
            <p className="mt-2 text-slate-600">
              Instant message delivery with live typing indicators
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
            <Shield className="h-12 w-12 text-indigo-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Secure & Private
            </h3>
            <p className="mt-2 text-slate-600">
              End-to-end encryption for all your conversations
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
            <Zap className="h-12 w-12 text-indigo-600" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Lightning Fast
            </h3>
            <p className="mt-2 text-slate-600">
              Optimized performance for smooth experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Home - Bubble",
  description: "A chat app, to chat with your friends and family.",
};
