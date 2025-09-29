// NOTICE API FILE
import { INotice, INoticePayload } from '@/types/Notice';
import { baseApi } from './baseApi';

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotices: builder.query<INotice[], void>({
      query: () => '/cms/notices',
      providesTags: ['Notice'],
    }),

    getNoticeById: builder.query<INotice, string>({
      query: (id) => `/cms/notices/${id}`,
      providesTags: (result, error, id) => [{ type: 'Notice', id }],
    }),

    getNoticeBySlug: builder.query<INotice, string>({
      query: (slug) => `/cms/notices/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Notice', id: slug }],
    }),

    createNotice: builder.mutation<INotice, Partial<INoticePayload>>({
      query: (notice) => ({
        url: '/cms/notices',
        method: 'POST',
        body: notice,
      }),
      invalidatesTags: ['Notice'],
    }),

    updateNotice: builder.mutation<INotice, { id: string; body: Partial<INoticePayload> }>({
      query: ({ id, body }) => ({
        url: `/cms/notices/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Notice', id }],
    }),

    deleteNotice: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/cms/notices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notice'],
    }),
  }),
});

export const {
  useGetAllNoticesQuery,
  useGetNoticeByIdQuery,
  useGetNoticeBySlugQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeApi;
