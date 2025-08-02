import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import RandomAnime from "./pages/RandomAnime";
import { TopAnime } from "./pages/TopAnime";
import { AnimeDetail } from "./pages/AnimeDetail";
import SearchAnime from "./pages/SearchAnime";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/random" element={<RandomAnime/>} />
        <Route path="/top/anime" element={<TopAnime/>}/>
        <Route path="/anime/:id" element={<AnimeDetail/>} />
        <Route path="/search" element={<SearchAnime/>}/>
      </Routes>
    </BrowserRouter>
  )
}