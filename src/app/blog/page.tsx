"use client";

import { useGetBlogsQuery } from "@/store/api-services/blog-api";
import Link from "next/link";
import React from "react";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  slug?: string;
  url?: string;
  buttonTitle?: string;
  createdAt: string;
  isActive: boolean;
  updatedAt: string;
}

export default function BlogPage() {
  const { data, isLoading, isError } = useGetBlogsQuery();

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-blue-800 text-lg font-medium">Loading Blogs...</p>
        </div>
      </div>
    );

  if (isError || !data || data.length === 0)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6 text-blue-600">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Blogs Available
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any blog posts at the moment. Please check back
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="min-h-screen bg-white py-12 pt-0">
      <section className="relative w-full min-h-[300px] md:min-h-[300px] bg-gradient-to-br from-blue-700 via-blue-800 to-blue-800 text-white mb-16 flex flex-col items-center justify-center px-6 py-8 md:py-8 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Our <span className="text-blue-100">Blog</span>
          </h1>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light mb-8 leading-relaxed"
            style={{ color: "#fff" }}
          >
            Discover insightful articles, latest updates, and valuable resources
            from our team
          </p>
          <div className="w-24 h-1.5 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <div className="w-16 h-1.5 bg-blue-300 mx-auto rounded-full"></div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((blog: Blog) => {
            const slug = encodeURIComponent(
              blog.slug || blog.title.toLowerCase().replace(/ /g, "-")
            );
            const { date, time } = formatDate(blog.createdAt);

            return (
              <article
                key={blog._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {blog.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date and Time */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {date}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {time}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-xl sm:text-base lg:text-xl font-bolder text-blue-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Description Excerpt */}
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.description.length > 150
                          ? blog.description.substring(0, 150) + "..."
                          : blog.description,
                    }}
                  />

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${slug}`}
                      className="inline-flex items-center px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 group/btn shadow-lg"
                    >
                      {blog.buttonTitle || "Read More"}
                      <svg
                        className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    {/* Updated Indicator */}
                    <div
                      className="text-xs text-gray-400"
                      title={`Last updated: ${new Date(
                        blog.updatedAt
                      ).toLocaleDateString()}`}
                    >
                      Updated
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
