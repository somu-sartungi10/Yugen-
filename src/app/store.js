import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "../features/banner/bannerSlice"
import topAiringReducer from "../features/TopAiring/topAiringSlice"
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer:{
        banner:bannerReducer,
        topAiring : topAiringReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})