import { BrowserRouter, Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import RandomAnime from "./pages/RandomAnime";
import { AnimeDetail } from "./pages/AnimeDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/random" element={<RandomAnime/>} />
        <Route path="/anime/:id" element={<AnimeDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}