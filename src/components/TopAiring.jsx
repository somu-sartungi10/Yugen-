import { useGetTopAiringQuery } from "../features/api/apiSlice";
import Loader from "./UI/Loader";
import AnimeCard from "./UI/AnimeCard";
import GridLayout from "./GridLayout";
import { motion as fm } from "framer-motion";
import MovingIcon from "@mui/icons-material/Moving";

const TopAiring = () => {
  const Motion = fm.div;

  const { data, isError, error, isLoading } = useGetTopAiringQuery({
    limit: 12,
  });

  const TopData = data?.data || [];
  console.log(TopData);

  return (
    <div className="mt-10">
      <div className="flex gap-2 text-text justify-between px-6 items-center">
        <div className="flex items-center gap-4">
          <div className="bg-card-bg rounded-md p-2 text-accent">
            <MovingIcon fontSize="large" />
          </div>
          <h1 className="text-2xl font-bold ">Top Airing</h1>
        </div>

        <Motion
          className="border border-primary rounded-lg"
          whileHover={{
            scale: 1.02,
            color: "#82bceb",
          }}
          whileTap={{ scale: 0.8 }}
        >
          <button className="px-2 py-1 font-semibold border-1 ">
            View All
          </button>
        </Motion>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <GridLayout>
          {Array.isArray(TopData) &&
            TopData?.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </GridLayout>
      )}
    </div>
  );
};

export default TopAiring;
