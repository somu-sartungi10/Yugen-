import { useEffect, useState } from "react";
import { motion as fm, AnimatePresence, easeInOut } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { Star } from "@mui/icons-material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { PlayArrowOutlined } from "@mui/icons-material";
import { useGetBannerAnimeQuery } from "../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { nextIndex,prevIndex,setShowTrailer } from "../features/banner/bannerSlice";

const BannerSlider = () => {
  const Motion = fm.div;
  const dispatch = useDispatch()

  const {data,isLoading,isError,error}=useGetBannerAnimeQuery()
  console.log(data)

  const {index,showTrailer } = useSelector((state)=>state.banner);
  const [direction,setDirection]= useState(1)

  useEffect(() => {
    if ( Array.isArray(data) && data.length > 0 && !showTrailer) {
      const timer = setTimeout(() => {
        dispatch(nextIndex(data.length));
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showTrailer,dispatch,data,index]);

  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showTrailer]);


  if(isLoading) return <div>Loading...</div>
  if(isError) return <div> {error?.message}</div>
  if(!data.length) return null


  const current = data[index];
  console.log(current);

  if (!current) return null;
  const bgImage = current?.trailer?.images?.maximum_image_url;

  const variants = {
    enter: (direction) => ({
      x: direction === 1 ? 400 : -400,
      scale: 0.5,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === 1 ? -400 : 400,
      scale: 0.5,
      y: 200,
      opacity: 0,
    }),
  };

  return (
    <div>
      <div className="relative overflow-hidden">
        <Motion
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={bgImage}
            className=" bg-gradient-to-t from-slate-700 w-full object-cover aspect-[25/9] opacity-70  "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to bg-transparent w-3/4"></div>
        </Motion>

        <AnimatePresence  custom={direction}>
          <Motion
            key={current?.mal_id || index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-[70%] absolute flex flex-col gap-2 left-8 top-32"
          >
            <div className="border border-accent w-fit px-2 py-1 text-sm rounded-md text-text font-bold">
              {current?.status}
            </div>

            <div className="title text-4xl font-bold text-text">
              {current?.title_english}
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex items-center text-text">
                <Star className="text-accent" fontSize="small" />
                <span className="text-base">{current.score}</span>
              </div>

              <div className="flex gap-1 items-center">
                <CalendarMonthOutlined fontSize="small text-text/60" />
                <span className="text-text text-base">{current?.year}</span>
              </div>

              <div className="text-text flex items-center text-base">
                <PlayArrowOutlined fontSize="small" />
                {current?.episodes} eps
              </div>

              <div className="text-base text-text px-2 border border-text rounded-md">
                {current?.rating}
              </div>
            </div>

            <div className="flex gap-2">
              {current?.genres?.map((genre) => (
                <div
                  key={genre.mal_id}
                  className="px-2 text-sm py-1 bg-secondary  text-text rounded-md text-center"
                >
                  {genre.name}
                </div>
              ))}
            </div>

            <div className="line-clamp-3 text-text text-base font-normal w-3/4">
              {current?.synopsis}
            </div>

            <div className="flex items-center mt-4 font-semibold gap-4">
              <Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                <NavLink
                  to={`/anime/${current.mal_id}`}
                  className="p-2 border-primary border rounded-md bg-primary/10 text-text"
                >
                  View Details
                </NavLink>
              </Motion>
              <Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                {current?.trailer?.embed_url && (
                  <button
                    className="text-text flex items-center bg-secondary/20 border-secondary border rounded-md  gap-2 p-2"
                    onClick={() => dispatch(setShowTrailer(true))}
                  >
                    <PlayArrowOutlined />
                    Watch Trailer
                  </button>
                )}
              </Motion>
            </div>
          </Motion>
        </AnimatePresence>
        <div className="flex gap-4 absolute right-6 bottom-6">
          <button
            onClick={() => {
              setDirection(0);
              dispatch(prevIndex(data.length))
            }}
            className="text-tertiary bg-text w-[40px] h-[40px]  rounded-full "
          >
            <ArrowBackIos fontSize="small" />
          </button>

          <button
            onClick={() => {
              setDirection(1);
              dispatch(nextIndex(data.length))
            }}
            className="text-tertiary bg-text w-[40px] h-[40px]  rounded-full"
          >
            <ArrowForwardIos fontSize="small" />
          </button>
        </div>

        {showTrailer && (
          <Motion
            className="fixed inset-0 z-10  flex items-center justify-center  h-svh w-svw bg-black/80"
            onClick={() => dispatch(setShowTrailer(false))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              <Motion
                className="flex w-3/4 h-3/4 aspect-[16/22]"
                initial={{ scale: 0,opacity:0 }}
                animate={{ scale: 1, opacity:1 }}
                exit={{scale:0, opacity:0}}
                transition={{ duration: 0.5, ease: easeInOut }}
              >
                <iframe
                  className="w-full h-full "
                  src={current?.trailer.embed_url}
                  allowFullScreen
                />
              </Motion>
            </AnimatePresence>
          </Motion>
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
