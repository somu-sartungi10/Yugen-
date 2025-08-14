import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_Url } from "../../api/jikan";

export const fetchBannerAnime = createAsyncThunk(  //i'm fetching best anime airing this season
    "banner/fetchBannerAnime",
    async (_,thunkApi) =>{
        try {
            const response = await axios.get(`${Base_Url}/seasons/now`)
            console.log(response.data.data.slice(1,11))
            return response.data.data.slice(1,11);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "fetch failed")
        }
    }
)

fetchBannerAnime()

const bannerSlice = createSlice({
    name: "banner",
    initialState:{
        data:[],
        status:"idle",
        error:null,
        index: 0,
    },
    reducers:{
        setIndex : (state,action) =>{
            state.index = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBannerAnime.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchBannerAnime.fulfilled, (state,action)=>{
            state.status='success';
            state.data=action.payload
        })
        .addCase(fetchBannerAnime.rejected,(state,action)=>{
            state.status = "failed";
            state.error=action.payload || action.error.message;
        })
    }
})

export const { setIndex } = bannerSlice.actions;
export default bannerSlice.reducer;