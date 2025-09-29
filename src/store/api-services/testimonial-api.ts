import { baseApi } from "./baseApi";

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => ({
        url: `/cms/testimonials`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialApi;
export const { endpoints: testimonialEndpoints } = testimonialApi;
