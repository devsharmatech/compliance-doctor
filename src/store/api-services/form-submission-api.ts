import { baseApi } from './baseApi';

export const formSubmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit a new form
    submitForm: builder.mutation({
      query: (body) => ({
        url: '/form-submission',
        method: 'POST',
        body,
      }),
    }),

    // Get all form submissions (admin)
    getAllSubmissions: builder.query({
      query: ({ limit, page }) => ({
        url: `/form-submission?limit=${limit}&page=${page}`,
      }),
    }),

    // Get submissions by type (admin)
    getSubmissionsByType: builder.query({
      query: (type: 'service' | 'contact' | 'other') => ({
        url: `/form-submission/${type}`,
      }),
    }),
  }),
});

export const {
  useSubmitFormMutation,
  useGetAllSubmissionsQuery,
  useGetSubmissionsByTypeQuery,
} = formSubmissionApi;

export const { endpoints: formSubmissionEndpoints } = formSubmissionApi;
