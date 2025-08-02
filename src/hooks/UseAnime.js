import { useQuery } from "@tanstack/react-query";
import { Base_Url } from "../api/jikan";
import axios from "axios";

export const getAllAnime = async ({q,type,page,limit,status, rating,order_by,sort,genres}) => {
  const params = {};
  if (q) params.q = q;
  if (type) params.type = type;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (status) params.status = status;
  if (rating) params.rating = rating;
  if (order_by) params.order_by = order_by;
  if (sort) params.sort = sort
  if (genres) params.genres = genres

  const res = await axios.get(`${Base_Url}/anime`,{ params })
  return res.data.data
}

export const useAllAnime = ({ q, type, page = 1, limit, status, rating, order_by, sort,genres }) =>
  useQuery({
    queryKey: ["animeLIst", q, type , page, limit, status,rating, order_by, sort, genres],
    queryFn: () => getAllAnime({ q, type , page, limit, status, rating, order_by, genres}),
    keepPreviousData: true,
  });





export const GetRandomAnime = async (limit) => {
  // GEt Random Anime function
  const response = await axios.get(`${Base_Url}/random/anime`, {
    params: {
      limit,
    },
  });
  return response.data.data;
};
export const useGetRandomAnime = (limit) =>
  useQuery({
    queryKey: ["randomAnime", limit],
    queryFn: () => GetRandomAnime(limit),
  });




export const getAnimeById = async (id) => {
  const res = await axios.get(`${Base_Url}/anime/${id}`);
  return res.data;
};

export const useGetAnimeById = (id) =>
  useQuery({
    queryKey: ["animeById", id],
    queryFn: () => getAnimeById(id),
  });



export const getTopAnime = async (type,filter,rating,sfw,page,limit) => {
    const res = await axios.get(
        `${Base_Url}/top/anime`,{
            params:{
                type,
                filter,
                rating,
                sfw,
                page,
                limit
            }
        }
    )
    return res.data
}

export const useGetTopAnime = (type,filter,rating,sfw,page,limit)=>
useQuery({
    queryKey:(['TopAnime',type,filter,rating,sfw,page,limit]),
    queryFn: ()=>getTopAnime(type,filter,rating,sfw,page,limit)
});





const getAnimeRecommendations = async (id,limit = 12) => {
  const res = await axios.get(
    `${Base_Url}/anime/${id}/recommendations`,{
      params:{
        limit
      }
    }
  )
  return res.data
}

export const useGetAnimeRecommendations =(id,limit = 12)=>
  useQuery({
    queryKey:['animeRecommendations',id,limit],
    queryFn: ()=>getAnimeRecommendations(id,limit)
  })



  export const getGenres = async () => {
    const res = await axios.get(
      `https://api.jikan.moe/v4/genres/anime?genres`
    )
    return res.data
  }

  export const useGetGenres = ()=>
    useQuery({
      queryKey: ['genres'],
      queryFn: ()=>getGenres()
    })