import { Navbar } from "../components/Navbar"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


const Base_Url = "https://api.jikan.moe/v4";
const fetchAnimeById = async (id) => {
  const res = await axios.get(`${Base_Url}/anime/${id}`);
  return res.data.data;
}


export const AnimeDetail = () => {

  // const [loading , setLoading] = useState(true)
  const { id } = useParams()

  const {
    data: anime,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey:['anime',id],
    queryFn: ()=> fetchAnimeById(id)
  });
  console.log(anime)


  return (
    <>
    <Navbar/>
     <div className="p-4">
      {
        isLoading &&(
          <div className="text-text">
            Loading anime data...
          </div>
        )
      }
      {
        isError &&(
          <div className="text-red-500 ">
            Error : {error.message}
          </div>
        )
      }
      {
        anime && (
          <div className="p-4">
            <div className="text-text text-3xl font-extrabold">
              {anime.title}
           </div>
           <div className="text-text text-xl">
            {anime.title_japanese}
           </div>
          </div>
        )
      }
     </div>
    </>
  )
}
