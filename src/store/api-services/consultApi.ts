import { IConsult } from '@/types/Consult';
import { baseApi } from './baseApi'; 

export const consultApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllConsults: builder.query<IConsult[], void>({
      query: () => '/cms/consult',
      providesTags: ['Consult'],
    }),

    getConsultById: builder.query<IConsult, string>({
      query: (id) => `/cms/consult/${id}`,
      providesTags: (result, error, id) => [{ type: 'Consult', id }],
    }),

    getConsultBySlug: builder.query<IConsult, string>({
      query: (slug) => `/cms/consult/slug/${slug}`, // Assuming you have this route as defined earlier
      providesTags: (result, error, slug) => [{ type: 'Consult', id: slug }], // Tag with slug or ID
    }),

    getConsultsByType: builder.query<IConsult[], string>({
      query: (consultType) => `/cms/consult/type/${consultType}`, // Assuming you have this route
      providesTags: ['Consult'],
    }),

    deleteConsult: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/cms/consult/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Consult'],
    }),

     getAllConsultType: builder.query<any[], void>({
      query: () => '/cms/consult-type',
      providesTags: ['ConsultType'],
    }),
  }),
});

export const {
  useGetAllConsultsQuery,
  useGetConsultByIdQuery,
  useGetConsultBySlugQuery,
  useGetConsultsByTypeQuery,
  useDeleteConsultMutation,
 useGetAllConsultTypeQuery,
} = consultApi;