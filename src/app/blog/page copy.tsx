'use client';

import { useGetBlogsQuery } from '@/store/api-services/blog-api';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
// import { sanitizeHtml } from '@/components/sanitizeHTML';

interface Blog {
    title: string;
    description: string;
    image: string;
    slug?: string;
    url?: string;
    buttonTitle?: string;
}


export default function BlogPage() {
    const { data, isLoading, isError } = useGetBlogsQuery();

    if (isLoading) return <p className="text-center py-10">Loading...</p>;
    if (isError || !data || data.length === 0) return <p className="text-center py-10">Failed to load blogs.</p>;

    const { title, description } = data[0];

    return (
        <>
            <div className="px-6 py-10 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                    <div
                        className="mt-4 text-lg text-[#333]"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></div>

                    {/* <p className="mt-4 text-lg text-[#333]">{description}</p> */}
                </div>
                {/* <p className="mt-4 text-lg text-[#333]">{description}</p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((blog: Blog,index) => {
                    // debugger
                    const slug = encodeURIComponent(blog.slug  || blog.title.toLowerCase().replace(/ /g, '-'));
                    console.log(slug);
                    return (
                        <div key={index}>
                            <img src={blog.image} alt={blog.title} />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{blog.title}</h2>
                                <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
                                    {blog.buttonTitle || 'Read More'}
                                </Link>
                            </div>
                        </div>
                    );
                })}
                {/* {data.map((blog: any, index: number) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
                            >
                                {blog.buttonTitle || 'Read More'}
                            </Link>

                        </div>
                    </div>
                ))} */}
            </div>
        </>
    );
}
