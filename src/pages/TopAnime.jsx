import { Navbar } from "../components/UI/Navbar";
import AnimeCard from "../components/UI/Anicard/AnimeCard";
import GridLayout from "../components/GridLayout";
import Loader from "../components/UI/Loader";
import { PaginationOutline } from "../components/PaginationOutline";
import Footer from "../components/UI/footer";
import { useState } from "react";
import { useGetTopAnimeQuery } from "../features/api/apiSlice";
import SkelCard from "../components/UI/Anicard/SkelCard";

export const TopAnime = () => {
  const [param, setParam] = useState({
    limit: 24,
    page: 1,
    type: "",
    rating: "",
    filter: "",
    sfw: false,
  });

  const { data, isLoading, isError, error } = useGetTopAnimeQuery(param);

  const TopAnimeData = data?.data || [];
  const pagination = data?.pagination;

  console.log(TopAnimeData);

  const onPageChange = (newpage) => {
    setParam((param) => ({
      ...param,
      page: newpage,
    }));
  };

  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className="text-text font-bold  px-6 text-2xl mt-4">Top Anime</div>

      <div className="flex justify-center items-center min-h-svh">
        <GridLayout>
          {isLoading
            ? Array.from({ length: param.limit }).map((_, i) => (
                <SkelCard key={i} />
              ))
            : TopAnimeData.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
        </GridLayout>
      </div>
      <PaginationOutline
        count={pagination?.last_visible_page}
        current_page={pagination?.current_page}
        animeList={TopAnimeData}
        isLoading={status === "loading"}
        onPageChange={onPageChange}
      />
      <Footer />
    </div>
  );
};
