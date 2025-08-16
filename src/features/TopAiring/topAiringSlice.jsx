import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopAiring = createAsyncThunk(
    "topAiring/fetchTopAiring",
    async({limit, page =1}) =>{
        const { data } = await axios.get("https://api.jikan.moe/v4/top/anime",
            {
                params: { filter : "airing", sfw:false,limit,page}
            }
        );
        console.log(data)
        return data;
    }
);

const topAiringSlice = createSlice({
    name: 'topAiring',
    initialState:{
        data:[],
        pagination: {},
        status : "idle",
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
         .addCase(fetchTopAiring.pending, (state)=>{
            state.status = "loading"
         })
         .addCase(fetchTopAiring.fulfilled, (state,action)=>{
            state.data = action.payload.data;
            state.pagination=action.payload.pagination;
            state.status = "success"
         })
         .addCase(fetchTopAiring.rejected,(state,action)=>{
            state.status = "error"
            state.error=action.error.message
         })
    }
})

export default topAiringSlice.reducer