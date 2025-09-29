import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        ingress: builder.mutation({
            query:(browserData) =>({
                url: '/auth/ingress',
                method: 'POST',
                body: browserData
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useIngressMutation } = authApi
export const { endpoints } = authApi