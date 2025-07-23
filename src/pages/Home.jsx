import { useEffect, useState } from "react";
import { getAllAnime, searchAnime } from "../api/jikan";
import AnimeCard from "../components/AnimeCard";
import { Navbar } from "../components/Navbar";
import { FadeLoader } from "react-spinners";
import { PaginationOutline } from "../components/PaginationOutline";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next_page: false,
    last_visible_page: null,
    items: {
      count: 0,
      total: 0,
      per_page: 25,
    },
  });

  const fetchAllAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, pagination: pageInfo } = await getAllAnime(pagination.current_page);
      setAnimeList(data);
      setPagination((prev) => ({
        ...prev,
        ...pageInfo,
      }));
      setSearchedQuery("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };



  useEffect(() => {
    fetchAllAnime(pagination.current_page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current_page]);



const handlePageChange=(page) =>{ //Used material UI pagination
    setPagination((prev)=>({
        ...prev,
        current_page:page,
    }))
}



  useEffect(() => {   // for handling searching of data
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      }
      else{
        fetchAllAnime()
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);



  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const result = await searchAnime(searchTerm);
      setAnimeList(result);
      setSearchedQuery(searchTerm);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const refresh = () => {
    setQuery("");
    setPagination((prev) => ({
      ...prev,
      current_page: 1,
    }));
  };

  return (
    <div className="home pb-10">
      <Navbar query={query} setQuery={setQuery} refresh={refresh} />
      <div className="card-wrapper">
        <div className="card-container">
          {error ? (
            <p className="centered-message text-lg text-red-600">{error}🥲</p>
          ) : loading ? (
            <p className="centered-message items-center flex justify-center flex-col text-text text-lg">
              <FadeLoader
               color="#82bceb"
               height={7}
               margin={3}
              />
            </p>
          ) : animeList.length === 0 ? (
            <p className="centered-message text-center text-gray-500 text-lg">
              No anime found for{" "}
              <span className="font-semibold">"{searchedQuery}"</span>
            </p>
          ) : (
            animeList.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))
          )}
        </div>
      </div>
      {
        !loading && animeList.length > 0 && !searchedQuery && (
           <PaginationOutline
           count={pagination.last_visible_page}
           current_page={pagination.current_page}
           onPageChange={handlePageChange}
           isLoading = {loading}
           animeList={animeList}
      />
        )
      }
    </div>
  );
}
