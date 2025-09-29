import { baseApi } from "./baseApi";

export const heroApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getHero : builder.query({
            query:()=>({
                url:'/cms/hero'
            })
        }),
        getHeroById : builder.query ({
            query: (id) =>({
                url: `/cms/hero/${id}`
            })
        })
    })
})

export const { useGetHeroQuery, useGetHeroByIdQuery } = heroApi
export const { endpoints } = heroApi