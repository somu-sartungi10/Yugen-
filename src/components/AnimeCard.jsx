import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Star } from "@mui/icons-material";

const AnimeCard = ({ anime }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!anime) return null;

  return (
    <>
      <NavLink to={`/anime/${anime.mal_id}`}>
        <div
          className="rounded-lg bg-card-bg  hover:border hover:border-accent transition-all duration-150 ease-in hover:scale-105 hover:shadow-[0_11px_18px_-6px_rgba(222,193,51,0.5)]"
        >
          <div className="relative">
            <div className="w-full h-80 overflow-hidden rounded-t-lg bg-black/20 flex items-center justify-center">
              {!isLoaded || hasError ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : null}

              {!hasError && (
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className={`w-full h-80 object-cover rounded-t-lg ${
                    isLoaded ? "block" : "hidden"
                  }`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                  }}
                />
              )}
            </div>
            {anime.type ? (
              <span className="text-sm text-body font-bold  font-body px-2 py-1 bg-secondary  text-text rounded-sm w-fit absolute top-2 left-2">
                {anime.type}
              </span>
            ) : null}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="px-2 text-text h-20 flex flex-col justify-center gap-1">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm line-clamp-2 font-heading">
                {anime.title}
              </h2>
              {
                anime.score ? (

              <p className="flex gap-0  text-sm text-text font-body">
                <Star
                style={{fontSize:'16px', color:'#dec133'}}
                />{anime.score ?? "N/A"}
              </p>
                ) :
                (null)
              }
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default AnimeCard;
