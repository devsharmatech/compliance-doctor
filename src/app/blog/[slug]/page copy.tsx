'use client';

import { useParams } from 'next/navigation';
import { useGetBlogBySlugQuery } from '@/store/api-services/blog-api';
import Image from 'next/image';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: blog, isLoading, isError } = useGetBlogBySlugQuery(slug as string, {
    skip: !slug,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !blog) return <p className="text-center py-10 text-red-600">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
        // layout='responsive'
      />
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: blog.description || blog.description }}
      />
    </div>
  );
}
