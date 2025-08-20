import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Star } from "@mui/icons-material";
import { motion as fm } from "framer-motion";

const AnimeCard = ({ anime }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!anime) return null;

  const MotionCard = fm.div
  return (
    <>
      <NavLink to={`/anime/${anime.mal_id}`}>
        <MotionCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 11px 18px -6px rgba(130,188,235,0.5)",
            borderColor: "#82bceb",
          }}
          whileTap={{
            scale:.8
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="rounded-lg h-[400px] bg-card-bg border border-transparent"
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
          <div className="px-2 h-20 flex flex-col justify-center gap-1">
            <div className="flex justify-between gap-4 items-center">
              <h2 className="font-bold text-text w-full text-sm line-clamp-2 font-heading">
                {anime.title_english || anime.title || "Untitled"}
              </h2>
              {anime.score ? (
                <p className="flex gap-0  text-sm text-text font-body">
                  <Star style={{ fontSize: "16px", color: "#dec133" }} />
                  {anime.score ?? "N/A"}
                </p>
              ) : null}
            </div>
          </div>
        </MotionCard>
      </NavLink>
    </>
  );
};

export default AnimeCard;
