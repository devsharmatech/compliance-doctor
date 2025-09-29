import { baseApi } from "./baseApi";

const navigationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNavigation: builder.query({
            query: ()=> ({
                url: `/cms/navitem/navigation`
            })
        })
    })
});
export const { useGetNavigationQuery } = navigationApi;
export const { endpoints } = navigationApi;