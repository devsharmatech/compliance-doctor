// serviceApi.ts
import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: `/cms/about`,
      }),
    }),
  }),
});

export const { useGetAboutUsQuery } = serviceApi;
export const { endpoints } = serviceApi;
