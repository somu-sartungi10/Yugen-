import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.jikan.moe/v4/"}),
    endpoints:(builder) =>({
        getTopAnime : builder.query({
            query:({page = 1 , limit =24 , type ="",rating="",filter="",sfw=false}={})=>({
                url:"top/anime",
                params:{page,limit,type,rating,filter,sfw},
            }),
            transformResponse:(response)=>({
                data:response.data,
                pagination:response.pagination
            })
        }),
        getTopAiring: builder.query({
            query:({page=1,limit=8}={})=>({
                url:"top/anime",
                params:{filter :"airing",sfw:false,page,limit},
            }),
            transformResponse:(response)=>({
                data:response.data,
                pagination:response.pagination
            })
        }),
        getBannerAnime:builder.query({
            query:()=> `seasons/now`,
            transformResponse:(response) =>response.data.slice(1,11)
        }),
        getUpcomingAnime:builder.query({
            query:({limit=12,page=1}={})=>({
                url:'seasons/upcoming',
                params:{limit,page}
            })
        })
    })
})


export const {
    useGetTopAnimeQuery,
    useGetTopAiringQuery,
    useGetBannerAnimeQuery,
    useGetUpcomingAnimeQuery,
}=apiSlice