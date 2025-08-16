import { createSlice, } from "@reduxjs/toolkit";


const bannerSlice = createSlice({
    name: "banner",
    initialState:{
        index:0,
        showTrailer:false
    },
    reducers:{
        setIndex : (state,action) =>{
            state.index = action.payload;
        },
        nextIndex :(state,action) =>{
            const length = action.payload
            state.index = (state.index +1) % length
        },
        prevIndex : (state,action) =>{
            const length = action.payload
            state.index = (state.index -1+length)%length
        },
        setShowTrailer: (state,action) =>{
            state.showTrailer = action.payload
        }
    },
})

export const { setIndex,nextIndex,prevIndex,setShowTrailer } = bannerSlice.actions;
export default bannerSlice.reducer;