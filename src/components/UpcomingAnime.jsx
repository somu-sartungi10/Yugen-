import AnimeCard from "./UI/AnimeCard";
import { useGetUpcomingAnimeQuery } from "../features/api/apiSlice";
import GridLayout from "./GridLayout";
import Loader from "./UI/Loader";
import { motion as fm } from "framer-motion";

const UpcomingAnime = () => {
  const Motion = fm.div;
  const { data, isLoading, isError, error } = useGetUpcomingAnimeQuery();
  const UpcomingData = data?.data || [];
  console.log(data);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError) return <div>{error?.message}</div>;
  return (
    <div className="mt-20">
      <div className="flex gap-2 text-text justify-between px-6 items-center">
        <h1 className="text-2xl font-bold ">Upcoming Animes</h1>

        <Motion
          className="border border-primary rounded-lg"
          whileHover={{
            backgroundColor: "#82bceb",
          }}
          whileTap={{ scale: 0.8 }}
        >
          <button className="px-2 py-1 font-semibold border-1 ">
            View All
          </button>
        </Motion>
      </div>
      <GridLayout>
        {UpcomingData.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </GridLayout>
    </div>
  );
};

export default UpcomingAnime;
