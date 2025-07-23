import { NavLink } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  if (!anime) return null;

  return (
    <>
      <NavLink
      to={`/anime/${anime.mal_id}`}
      >
      <div className="w-60 rounded-md bg-card-bg hover:bg-secondary transition-all duration-150 ease-in hover:scale-105">
      <div className="relative">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-60 relative object-cover rounded"
      />
      <span className="text-sm text-body font-body p-2 bg-accent text-background rounded-sm w-fit absolute top-2 left-2 shadow-sm shadow-accent">
        {anime.type}
      </span>
      </div>
      <div
      className="px-2 text-text h-20 flex flex-col justify-center gap-1"
      >
      <div className="flex justify-between items-center">
         <h2 className="font-bold text-sm line-clamp-2 font-heading">{anime.title}</h2>
         <p className="text-sm text-text font-body">⭐{anime.score ?? "N/A"}</p>
      </div>
    </div>
      </div>
      </NavLink>
    </>
  )
};

export default AnimeCard;
