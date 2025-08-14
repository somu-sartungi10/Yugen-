import { useGetTopAnime } from "../hooks/useAnime";
import { Navbar } from "../components/UI/Navbar";
import AnimeCard from "../components/UI/AnimeCard";
import { useState } from "react";
import GridLayout from "../components/GridLayout";
import Loader from "../components/UI/Loader";
import { PaginationOutline } from "../components/PaginationOutline";
import Footer from "../components/UI/footer";

export const TopAnime = () => {
  const [param, setParam] = useState({
    limit: 24,
    page: 1,
    type: "",
    rating: "",
    filter: "",
    sfw: true,
  });

  const onPageChange = (newpage)=>{
    setParam((param)=>({
      ...param,
      page:newpage
    }))
  }

  const {
    data: TopAnime,
    isLoading,
    isError,
    error,
  } = useGetTopAnime(
    param.type,
    param.filter,
    param.rating,
    param.sfw,
    param.page,
    param.limit
  );

  const TopAnimeData = TopAnime?.data;
  const PaginationData = TopAnime?.pagination
  console.log(PaginationData)
  console.log(TopAnimeData);

  return (
    <div>
      <Navbar />
      <div className="text-text font-bold  px-6 text-2xl mt-4">
        Top Anime
      </div>

      <div className="flex justify-center items-center min-h-svh">
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <div>data error {error.message}</div>
      ) : (
        <GridLayout
        children={TopAnimeData.map((anime)=>(
          <AnimeCard
          key={anime.mal_id}
          anime={anime}
          />
        ))}
        />
      )}
      </div>
      <PaginationOutline
      count={PaginationData?.last_visible_page}
      current_page={PaginationData?.current_page}
      animeList={TopAnimeData}
      isLoading={isLoading}
    onPageChange={onPageChange}
      />
      <Footer/>
    </div>
  );
};
