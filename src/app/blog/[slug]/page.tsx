'use client';

import { useParams } from 'next/navigation';
import { useGetBlogBySlugQuery } from '@/store/api-services/blog-api';
import { useState, useEffect } from 'react';

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

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: blog, isLoading, isError } = useGetBlogBySlugQuery(slug as string, {
    skip: !slug,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-700 mx-auto mb-6"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-blue-100 mx-auto"></div>
        </div>
        <p className="text-blue-800 text-xl font-semibold mb-2">Loading Article...</p>
        <p className="text-blue-600 text-sm">Crafting your reading experience</p>
      </div>
    </div>
  );

  if (isError || !blog) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl text-red-600">⚠️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The blog post you're looking for doesn't exist or may have been moved to a different location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            ← Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/blog'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse All Blogs
          </button>
        </div>
      </div>
    </div>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      full: date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time, full } = formatDate(blog.createdAt);
  const updatedDate = formatDate(blog.updatedAt);

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150 ease-out shadow-lg"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[300px] md:min-h-[350px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white mb-16 flex flex-col items-center justify-center px-6 py-8 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600 rounded-full opacity-10 animate-pulse delay-500"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-32 w-6 h-6 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-20 w-4 h-4 bg-white/10 rounded-full animate-bounce delay-700"></div>

        {/* Content */}
        <div className={`relative z-10 max-w-4xl transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
         
          
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 tracking-tight leading-tight">
            Read <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Blog</span>
          </h1>

          <span className="text-xl md:text-2xl lg:text-xl font-light mb-8 leading-relaxed max-w-3xl mx-auto text-blue-100">
            Discover insightful articles, latest updates, and valuable resources from our team
          </span>
          
          <div className="flex justify-center gap-4">
            <div className="w-24 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

        {/* Article Header */}
        <header className="text-center mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm mb-8 border border-green-200">
            <div className={`w-3 h-3 rounded-full animate-pulse ${blog.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            <span className="text-sm font-semibold text-gray-700">
              {blog.isActive ? '📢 Published' : '📝 Draft'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-500 font-medium me-2">Published</span>
                <span className="text-sm font-semibold text-gray-800">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-500 font-medium me-2">Time</span>
                <span className="text-sm font-semibold text-gray-800">{time}</span>
              </div>
            </div>

            {blog.updatedAt !== blog.createdAt && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs text-blue-600 font-medium">Last Updated</p>
                  <p className="text-sm font-semibold text-gray-800">{updatedDate.date}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-2xl text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            Featured Image
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-4 lg:p-4 mb-16 border border-gray-100 hover:shadow-2xl transition-all duration-500">
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gray-100
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-10
              prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-8
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:leading-relaxed prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:shadow-inner
              prose-blockquote:text-gray-700 prose-blockquote:italic
              prose-table:border-collapse prose-table:w-full prose-table:shadow-lg prose-table:rounded-2xl prose-table:overflow-hidden
              prose-th:bg-gradient-to-r prose-th:from-blue-600 prose-th:to-blue-700 prose-th:text-white prose-th:px-6 prose-th:py-4 prose-th:font-semibold
              prose-td:border prose-td:border-gray-200 prose-td:px-6 prose-td:py-4
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-gray-200 prose-img:mx-auto
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-gray-800
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:p-6
              prose-hr:border-gray-200 prose-hr:my-12"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>

        {/* Article Footer */}
        <footer className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-2xl p-4 text-center border border-gray-200 mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-2xl text-white">💫</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Enjoyed this article?</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Share your thoughts and explore more insightful content in our blog section. 
              Your journey to knowledge continues here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="px-10 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blogs
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Back to Top
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}