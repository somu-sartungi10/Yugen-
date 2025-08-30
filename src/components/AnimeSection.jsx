/* eslint-disable react/prop-types */
import AnimeCard from "./UI/Anicard/AnimeCard";
import GridLayout from "./GridLayout";
import { motion as fm } from "framer-motion";
import SkelCard from "./UI/Anicard/SkelCard";
import React from "react";

const AnimeSection = ({ queryHook, icon, title }) => {
  const Motion = fm.div;
  const { data, isError, error, isLoading } = queryHook({
    limit: 12,
  });

  const animeList = data?.data || [];

  return (
    <div className="mt-10">
      <div className="flex gap-2 text-text justify-between px-6 items-center">
        <div className="flex items-center gap-4">
          <div className="bg-card-bg rounded-md p-2 text-accent">{icon}</div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <Motion
          className="border border-primary rounded-lg"
          whileHover={{
            scale: 1.02,
            color: "#82bceb",
          }}
          whileTap={{ scale: 0.8 }}
        >
          <button
            type="button"
            aria-label={`View all ${title}`}
            className="px-2 py-1 font-semibold border"
          >
            View All
          </button>
        </Motion>
      </div>

      {isError ? (
        <div>{error?.data?.message || error?.error || "Something went wrong"}</div>
      ) : (
        <GridLayout>
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <SkelCard key={i} />)
            : animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
        </GridLayout>
      )}
    </div>
  );
};

export default AnimeSection;
