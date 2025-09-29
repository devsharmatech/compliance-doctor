import { baseApi } from "./baseApi";

export const featureApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        getFeatures : builder.query({
            query:({limit,page})=>({
                url:`/cms/feature?limit=${limit}&page=${page}`
            })
        })
    })
})

export const { useGetFeaturesQuery } = featureApi
export const { endpoints } = featureApi