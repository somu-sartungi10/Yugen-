import { useEffect, useState } from "react";
import { GetRandomAnime } from "../api/jikan";
import { Navbar } from "../components/Navbar";
import { FadeLoader } from "react-spinners";
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { Ranime_card } from "../components/Ranime_card";
import { useLocation } from "react-router-dom";

function RandomAnime() {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [R_Anime, setR_Anime] = useState(null);

  const Location = useLocation()
  console.log(Location)

  useEffect(() => {
    handleRandomAnime();
  }, []);

  const handleRandomAnime = () => {
    setLoading(true);
    setError(null);

    setTimeout(async () => {
      try {
        const data = await GetRandomAnime();
        setR_Anime(data);
      } catch (error) {
        console.error("Error fetching random anime", error);
        setError("Ahh There seems to be some kind of problem 🥲");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Navbar/>
      <button
        className="px-4 py-2 w-fit flex justify-center items-center mx-auto text-base my-10 bg-primary text-text rounded-md hover:bg-secondary hover:text-text transition font-body gap-2"
        onClick={handleRandomAnime}
        disabled={Loading}
      >
        Generate
        <ShuffleIcon fontSize="small"/>
      </button>

      <div className="flex justify-center">
        {Loading ? (
          <div className="flex justify-center items-center flex-col">
            <FadeLoader color="#3fd6d7" height={7} width={4} margin={3} />
          </div>
        ) : error ? (
          <p className="text-lg text-red-700">{error}</p>
        ) : R_Anime ? (
          <Ranime_card
           R_Anime={R_Anime}
          />
        ) : (
          <p className="text-center text-secondary">No anime loaded yet...</p>
        )}
      </div>
    </>
  );
}

export default RandomAnime;
