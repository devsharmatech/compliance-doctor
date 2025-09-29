import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: ({ limit, page }) => ({
                url: `/cms/service?limit=${limit}&page=${page}`
            })
        }),
        getServiceByType: builder.query({
            query: ({ type, limit, page }) => ({
                url: `/cms/service-type/services/${type}`
            })
        }),
        getServiceByName: builder.query({
            query: ({ name }) => ({
                url: `/cms/service/identifier/${name}`
            })
        }),
        getServiceTypes: builder.query({
            query: () => ({
                url: '/cms/service-type'
            })
        }),
        searchServices: builder.query({
            query: ({ query, selectFields = ['name', 'description', 'category'] }) => ({
                url: `/cms/service/search`,
                params: {
                    query,
                    select: selectFields.join(','),
                },
            }),
        }),
    })
})

export const { useGetServicesQuery, useGetServiceTypesQuery, useGetServiceByTypeQuery, useGetServiceByNameQuery, useSearchServicesQuery } = serviceApi
export const { endpoints } = serviceApi