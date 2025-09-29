import { baseApi } from "./baseApi";

export const subscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => ({
        url: '/cms/subscription-plan',
        method: 'GET',
      }),
    }),

    getPlansByState: builder.query({
      query: (identifier: string) => ({
        url: `/cms/subscription-plan/state/${identifier}`,
        method: 'GET',
      }),
    }),

    getPlanById: builder.query({
      query: ({id,type}) => ({
        url: `/cms/subscription-plan/${id}?type=${type}`,
        method: 'GET',
      }),
    }),

 getStates: builder.query({
  query: () => ({
    url: `/cms/state`,
    method: 'GET',
  }),
}),

  getPlansByServiceIdAndType: builder.query({
    query: ({serviceId, type}) => ({
      url:`/cms/subscription-plan/service/${serviceId}/type/${type}`,
      method: 'GET'
    })
  })
  }),
});

export const {
  useGetAllPlansQuery,
  useGetPlansByStateQuery,
  useGetPlanByIdQuery,
    useGetStatesQuery,
    useGetPlansByServiceIdAndTypeQuery
} = subscriptionPlanApi;
