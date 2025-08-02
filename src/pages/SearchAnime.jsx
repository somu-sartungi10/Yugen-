import GridLayout from "../components/GridLayout";
import { Navbar } from "../components/Navbar";
import AnimeCard from "../components/AnimeCard";
import Loader from "../components/Loader";
import { useAllAnime, useGetGenres } from "../hooks/useAnime";
import { useEffect, useState } from "react";
import { PaginationOutline } from "../components/PaginationOutline";
import Dropdown from "../components/Dropdown";
import Tags from "../components/tags";
import MultiSelDD from "../components/MultiSelDD";

const SearchAnime = () => {
  const { data: genData } = useGetGenres();
  const [selectedGenres,setSelectedGenres] = useState([]);

  const genreOptions = genData?.data?.map((genre)=>({
    label:genre.name,
    value:genre.mal_id.toString(),
  }))
  console.log(genreOptions)

  useEffect(()=>{
    setFilter((prev)=>({
      ...prev,
      genre:selectedGenres.join(","),
    }));
  },[selectedGenres]);

  const animeFilters = {
    type: [
      "tv",
      "movie",
      "ova",
      "special",
      "ona",
      "music",
      "cm",
      "pv",
      "tv_special",
    ],
    status: ["airing", "complete", "upcoming"],
    rating: ["g", "pg", "pg13", "r17", "r", "rx"],
    order_by: [
      "mal_id",
      "title",
      "start_date",
      "end_date",
      "episodes",
      "score",
      "scored_by",
      "rank",
      "popularity",
      "members",
      "favorites",
    ],
    sort: ["desc", "asc"],
    genre:selectedGenres
  };

  const [filter, setFilter] = useState({
    q: "",
    type: "",
    status: "",
    rating: "",
    order_by: "",
    sort: "",
    genre:"",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (key) => {
    setFilter((prev) => ({
      ...prev,
      [key]: "",
    }));

    if (key === "genre"){
      setSelectedGenres([])
    }
  };

  const {
    data: animeData,
    isLoading,
    isError,
    error,
  } = useAllAnime({
    q: filter.q,
    type: filter.type,
    status: filter.status,
    rating: filter.rating,
    order_by: filter.order_by,
    sort: filter.sort,
    genres:filter.genre,
  });

  const animeList = Array.isArray(animeData) ? animeData : [];
  console.log(animeList);

  return (
    <>
      <Navbar />

      <div className="px-6 flex flex-col gap-10 justify-center py-4">
        <div className="text-2xl text-text font-bold text-center">
          Search your favourite anime...
        </div>
        <div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-text font-bold">Search</span>
              <input
                type="text"
                placeholder="Search what you're looking for"
                className="outline-none p-2 px-4 bg-text border rounded-md text-sm w-[300px]"
                name="q"
                value={filter.q}
                onChange={handleChange}
              />
            </div>
            <Dropdown
              handleChange={handleChange}
              options={animeFilters.type}
              value={filter.type}
              label={`Type`}
              name={"type"}
            />
            <Dropdown
              handleChange={handleChange}
              options={animeFilters.status}
              value={filter.status}
              label={"Status"}
              name={"status"}
            />
            <Dropdown
              handleChange={handleChange}
              options={animeFilters.rating}
              value={filter.rating}
              label={"Rating"}
              name={"rating"}
            />
            <Dropdown
              handleChange={handleChange}
              options={animeFilters.order_by}
              value={filter.order_by}
              label={"Order"}
              name={"order_by"}
            />
            <Dropdown
              handleChange={handleChange}
              options={animeFilters.sort}
              value={filter.sort}
              label={"Sort By"}
              name={"sort"}
            />
            <MultiSelDD
            options={genreOptions}
            selected={selectedGenres}
            onChange={setSelectedGenres}
            label="Genres"
            />
          </div>

          <div className="flex mt-4 items-center gap-4">
            <div className="text-text font-bold">Tags :</div>
            <div className="my-2 flex gap-2 flex-wrap">
              {Object.entries(filter).map(([key, value]) =>
                value ? (
                  <Tags
                    key={key}
                    label={key}
                    value={value}
                    handleDelete={handleDelete}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      {!isLoading && filter.q ? (
        <div className="px-6 text-text text-base">
          <span className="text-accent">{animeList.length}</span> Results found
          on "{filter.q}"
        </div>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="text-red text-base">{error.message}</div>
      ) : (
        <GridLayout
          children={animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        />
      )}
    </>
  );
};

export default SearchAnime;
