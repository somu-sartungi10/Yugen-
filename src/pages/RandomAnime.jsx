import { Navbar } from "../components/UI/Navbar";
import Loader from "../components/UI/Loader";
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { Ranime_card } from "../components/Ranime_card";
import { useLocation } from "react-router-dom";
import { useGetRandomAnime } from "../hooks/useAnime";

function RandomAnime() {
  const {
    data : RandomAnime,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  }=useGetRandomAnime(1)

  const Location = useLocation()
  console.log(Location)

  const handleRandomAnime = () => {
    setTimeout(() => {
      refetch();
    }, 800);
  };

  return (
    <>
      <Navbar/>
      <button
        className="px-4 py-2 w-fit flex justify-center items-center mx-auto text-base my-10 bg-primary/60 border border-primary text-text rounded-md hover:bg-secondary hover:text-text transition font-body gap-2"
        onClick={handleRandomAnime}
        disabled={isLoading}
      >
        Generate
        <ShuffleIcon fontSize="small"/>
      </button>

      <div className="flex justify-center">
        {isLoading || isFetching ? (
          <Loader/>
        ) : isError ? (
          <p className="text-lg text-red-700">{error}</p>
        ) : RandomAnime ? (
          <Ranime_card
           R_Anime={RandomAnime}
          />
        ) : (
          <p className="text-center text-secondary">No anime loaded yet...</p>
        )}
      </div>
    </>
  );
}

export default RandomAnime;
