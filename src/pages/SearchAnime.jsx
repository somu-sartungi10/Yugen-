import GridLayout from "../components/GridLayout";
import { Navbar } from "../components/UI/Navbar";
import Loader from "../components/UI/Loader";
import AnimeCard from "../components/UI/Anicard/AnimeCard";
import { useAllAnime, useGetGenres } from "../hooks/UseAnime";
import { useEffect, useState } from "react";
import Dropdown from "../components/UI/Dropdown";
import Tags from "../components/tags";
import MultiSelDD from "../components/MultiSelDD";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchAnime = () => {
  const { data: genData } = useGetGenres();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreOptions = genData?.data?.map((genre) => ({
    label: genre.name,
    value: genre.mal_id.toString(),
  }));

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      genre: selectedGenres.join(","),
    }));
  }, [selectedGenres]);

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
    genre: selectedGenres,
  };

  const [filter, setFilter] = useState({
    q: "",
    type: "",
    status: "",
    rating: "",
    order_by: "",
    sort: "",
    genre: "",
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
  };

  const handleGenreDelete = (valueToRemove) => {
    setSelectedGenres((prev) => prev.filter((val) => val !== valueToRemove));
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
    genres: filter.genre,
  });

  const animeList = Array.isArray(animeData) ? animeData : [];
  console.log(animeList);

  return (
    <>
      <Navbar />
      <div className=" flex flex-col gap-10 justify-center py-4">
        <div className="flex px-6 ">
          <div className="py-4">
            <div className="flex flex-col gap-10 bg-card-bg p-4 rounded-lg ">
              <div className="flex gap-2 items-center">
                <div className="text-primary  bg-primary/40 rounded-md p-2">
                  <SearchOutlinedIcon />
                </div>
                <div className="text-xl  font-bold text-text">
                  Search & Filter
                </div>
              </div>
              <div>
                <div className="grid  grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-2  col-span-2">
                    <span className="text-text font-bold">Search Anime</span>
                    <div className="flex gap-2 items-center rounded-md py-2 px-2 bg-text text-primary ring-primary ring-2">
                      <SearchOutlinedIcon fontSize="small" />
                      <input
                        type="text"
                        placeholder="Search what you're looking for"
                        className="outline-none text-background/70  bg-text rounded-md text-sm
                   w-full"
                        name="q"
                        value={filter.q}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <MultiSelDD
                    options={genreOptions}
                    selected={selectedGenres}
                    onChange={setSelectedGenres}
                    label="Genres"
                  />
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
                </div>
                <div className="flex mt-4 items-center gap-4 w-[300px]">
                  <div className="text-text font-bold">Tags:</div>
                  <div className="my-2 flex gap-2 flex-wrap">
                    {selectedGenres.length > 0 &&
                      selectedGenres.map((genreValue) => {
                        const genreLabel = genreOptions?.find(
                          (g) => g.value === genreValue
                        )?.label;
                        return (
                          <Tags
                            key={genreValue}
                            label="genre"
                            value={genreLabel}
                            handleDelete={() => handleGenreDelete(genreValue)}
                          />
                        );
                      })}
                    {Object.entries(filter).map(([key, value]) =>
                      value && key !== "genre" ? (
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
          </div>

          <div className="w-full flex justify-center items-center">
            {!animeList ||
              (animeList.length === 0 && !isLoading && (
                <div className="text-secondary centered-message">
                  Sorry No result found
                </div>
              ))}
            {isLoading ? (
              <Loader />
            ) : isError ? (
              <div className="text-red text-base">{error.message}</div>
            ) : (
              <GridLayout className="">
                {animeList.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </GridLayout>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAnime;
