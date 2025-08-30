import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import RandomAnime from "./pages/RandomAnime";
import { TopAnime } from "./pages/TopAnime";
import { AnimeDetail } from "./pages/AnimeDetail";
import SearchAnime from "./pages/SearchAnime";
import { Provider } from "react-redux";
import { store } from "./app/store";
import React from "react";

export default function App() {
  return (

    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/random" element={<RandomAnime/>} />
        <Route path="/top/anime" element={<TopAnime/>}/>
        <Route path="/anime/:id" element={<AnimeDetail/>} />
        <Route path="/search" element={<SearchAnime/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}