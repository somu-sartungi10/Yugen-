import { Navbar } from "../components/UI/Navbar";
import { useParams } from "react-router-dom";
import { useGetAnimeById } from "../hooks/useAnime.js";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CalendarMonth } from "@mui/icons-material";
import { Timer } from "@mui/icons-material";
import { Tv } from "@mui/icons-material";
import { DetailInfoBox } from "../components/DetailInfo";
import RecommendSection from "../components/RecommendSection";
import { Star } from "@mui/icons-material";
import StatTag from "../components/StatTag";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import Footer from "../components/UI/footer";


export const AnimeDetail = () => {
  const { id } = useParams();
  const [showContent, setShowContent] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { data: anime, isLoading, isError, error } = useGetAnimeById(id);

  const AnimeData = anime?.data;
  console.log(AnimeData);

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      timeout = setTimeout(() => {
        setShowContent(true);
      }, 800);
    } else {
      setShowContent(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="py-4 px-8">
        {isLoading || !showContent ? (
          <div className="centered-message text-text">
            <FadeLoader margin={3} height={7} color="#82bceb" />
          </div>
        ) : isError || error ? (
          <div className="text-secondary">{error.message}</div>
        ) : (
          <div>
            {AnimeData?.title && (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-3xl text-text font-extrabold">
                    {AnimeData.title_english}
                    {/* <span className="px-2 text-accent">
                      (#{AnimeData.rank})
                    </span> */}
                  </div>
                  <div className="text-xl font-serif text-text/70">
                    {AnimeData.title}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative flex flex-col gap-2">
                    <div className="relative w-[300px] h-[400px]">
                      {(!isLoaded || hasError) && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg" />
                      )}

                      {!hasError && (
                        <img
                          src={AnimeData.images.webp.image_url}
                          className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                            isLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          alt={AnimeData.title}
                          onLoad={() => setisLoaded(true)}
                          onError={() => {
                            setHasError(true);
                            setisLoaded(true);
                          }}
                        />
                      )}
                    </div>
                    <div className="flex p-2 justify-between absolute top-2 w-full">
                      <span className="text-sm text-body font-bold  font-body px-2 py-1 bg-secondary  text-text rounded-sm w-fit ">
                        {AnimeData.type}
                      </span>
                      <span className="text-sm flex gap-0 items-center px-2 py-1 bg-background border border-accent w-fit rounded-md text-text font-bold">
                        <Star style={{ fontSize: "16px", color: "#dec133" }} />
                        {AnimeData.score}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 w-[300px] gap-2">
                    <StatTag
                    icon={<EmojiEventsOutlinedIcon/>}
                    value={AnimeData.rank}
                    label={'Ranked'}
                    className="bg-accent/20 border border-accent text-accent"
                    />
                    <StatTag
                    icon={<LocalFireDepartmentOutlinedIcon/>}
                    value={AnimeData.popularity}
                    label={'Popular'}
                    className="bg-secondary/20 border border-secondary"
                    />
                    <StatTag
                    icon={<FavoriteBorderOutlinedIcon/>}
                    value={AnimeData.favorites}
                    label={'favorites'}
                    className="col-span-2 bg-primary/10 border border-primary"
                    />
                    <StatTag
                    icon={<AdsClickOutlinedIcon/>}
                    value={AnimeData.rating}
                    label={""}
                    className="col-span-2 bg-primary/10 border border-primary"
                    />
                    </div>
                  </div>

                  <div className="w-full  px-4 rounded-md flex flex-col gap-2 max-h-[calc(100svh-10rem)] overflow-y-auto scroll-smooth scrollbar-hide">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(AnimeData?.genres) &&
                        AnimeData.genres.map((genres) => (
                          <div
                            key={genres.mal_id}
                            className="px-2 flex items-center gap-1 bg-primary/20 backdrop-blur-md border border-primary py-0.5  text-text rounded-md text-sm transition-all duration-200 hover:bg-primary/50"
                          >
                            <SellOutlinedIcon
                            style={{fontSize:'14px'}}
                            className="text-primary"
                            />
                            {genres.name}
                          </div>
                        ))}
                    </div>
                    <div className="text-text border border-primary/50 text-base rounded-md bg-card-bg px-4 py-2  text-justify">
                      {AnimeData.synopsis ? AnimeData.synopsis : 'No synopsis found'}
                    </div>

                    <div className="flex gap-4">
                      <DetailInfoBox
                        icon={
                          <PlayArrowIcon
                            fontSize="medium"
                            style={{ color: "#82bceb" }}
                          />
                        }
                        label="Episodes"
                        value={AnimeData.episodes}
                      />
                      <DetailInfoBox
                        icon={
                          <CalendarMonth
                            fontSize="small"
                            style={{ color: "#82bceb" }}
                          />
                        }
                        label="Year"
                        value={AnimeData?.year ?? "Not found"}
                      />
                      <DetailInfoBox
                        icon={
                          <Timer
                            fontSize="small"
                            style={{ color: "#82bceb" }}
                          />
                        }
                        label="Duration"
                        value={AnimeData.duration}
                      />
                      <DetailInfoBox
                        icon={
                          <Tv fontSize="small" style={{ color: "#82bceb" }} />
                        }
                        label="Status"
                        value={AnimeData.status}
                      />
                    </div>

                    {AnimeData?.trailer?.embed_url ? (
                      <div className="w-full aspect-[16/9]">
                        <iframe
                          className="w-full h-full "
                          src={AnimeData.trailer.embed_url}
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <p className="text-md text-secondary italic">
                        Trailer not available*
                      </p>
                    )}
                    <div></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {!isLoading && <RecommendSection id={id} />}
      {
        showContent && <Footer/>
      }
    </div>
  );
};
