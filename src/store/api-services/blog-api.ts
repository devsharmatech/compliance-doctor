import { Blog, BlogSection } from "@/types/Blog";
import { baseApi } from "./baseApi";


export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogSection[], void>({
      query: () => '/cms/blog-cards',
    }),
    getBlogBySlug: builder.query<BlogSection, string>({
      query: (slug) => `/cms/blog-cards/slug/${slug}`,
    }),
  }),
});

export const { useGetBlogsQuery , useGetBlogBySlugQuery} = blogApi;