import axios from "axios";

const Base_Url = "https://api.jikan.moe/v4";


export const getAllAnime = async(page,limit=8)=>{
    try{
        const res = await axios.get(`${Base_Url}/anime`,{
            params:{
                page,
                limit
            },
        });
        console.log(res.data)
        return {
            data:res.data.data || [],
            pagination : res.data.pagination,
        };
    }catch(error) {
        console.error("Error fetching all anime:", error);
        throw error // Return an empty array in case of error
    }
}


export const getPagination = async(page,limit)=>{
    try {
        const res = await axios.get(`${Base_Url}/anime`,{
            params:{
                page,
                limit
            }
        });
        return res.data.pagination
    } catch (error) {
        console.error("error fetching pagination data",error)
        throw error
    }
}

export const searchAnime = async (query , page =1 , limit =18)=>{
    try{
        const response = await axios.get(`${Base_Url}/anime`,{
            params:{
                q: query,
                page,
                limit
            }
        });

        const filtered = response.data.data.filter((anime)=>
         anime.title.toLowerCase().includes(query.toLowerCase())
        )
        return filtered

    }catch(error) {
        console.error("Error fetching anime data:", error);
        throw error;
    }
};


export const GetRandomAnime = async (limit = 1) => {
    try {
        const response = await axios.get(`${Base_Url}/random/anime`,{
            params:{
                limit
            }
        });
        console.log(response.data)
        return response.data.data
    } catch (error) {
        console.log("Error fetching random anime",error)
        throw error
    }
}