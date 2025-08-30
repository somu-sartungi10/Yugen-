import { useGetAnimeRecommendations } from "../hooks/UseAnime.js";
import AnimeCard from "./UI/Anicard/AnimeCard";
import GridLayout from "./GridLayout";

const RecommendSection = ({ id, isLoading }) => {
  const {
    data: recommendAnimeData,
    isError,
    error,
  } = useGetAnimeRecommendations(id);

  const recommendations = recommendAnimeData?.data.slice(0,12);
  console.log(recommendAnimeData);

  if (isLoading || !recommendAnimeData || recommendations.length === 0) {
    return null;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="py-8">
      <div className="text-text text-2xl px-4 py-2 font-bold">
        <div>You may also like</div>
      </div>
      <GridLayout>
        {recommendations?.map((rec) => (
          <AnimeCard key={rec.entry.mal_id} anime={rec.entry} />
        ))}
      </GridLayout>
    </div>
  );
};

export default RecommendSection;
