import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
         baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            if(token){
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["Auth", "Hero", "Feature", "Service", "Testimonial", "Blog", "Category","Navigation", "ServiceType","Consult","ConsultType","Notice"],
    endpoints: () => ({})
})