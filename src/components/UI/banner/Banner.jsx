import { useEffect, useMemo, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Star,
  CalendarMonthOutlined,
  PlayArrowOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useGetBannerAnimeQuery } from "../../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { nextIndex, prevIndex, setShowTrailer } from "../../../features/banner/bannerSlice";

const MotionDiv = motion.div;

const BannerSlider = () => {
  const dispatch = useDispatch();

  const { data, isError, error } = useGetBannerAnimeQuery();
  const { index, showTrailer } = useSelector((state) => state.banner);
  const [direction, setDirection] = useState(1);

  // derive stable length and current slide to keep deps simple & eslint happy
  const dataLength = useMemo(() => (Array.isArray(data) ? data.length : 0), [data]);
  const current = useMemo(() => (Array.isArray(data) && data[index] ? data[index] : null), [data, index]);

  // auto slide effect (keeps dependencies explicit)
  useEffect(() => {
    if (dataLength === 0 || showTrailer) return undefined;

    const timer = setTimeout(() => {
      dispatch(nextIndex(dataLength));
    }, 10000);

    return () => clearTimeout(timer);
  }, [dataLength, showTrailer, dispatch, nextIndex]);

  // lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showTrailer ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTrailer]);

  if (isError) {
    return (
      <div role="alert" className="p-4 text-red-500">
        {String(error?.message ?? "An error occurred")}
      </div>
    );
  }

  if (!current) return null;

  const bgImage = current?.trailer?.images?.maximum_image_url ?? null;

  const variants = {
    enter: (dir) => ({ x: dir === 1 ? 400 : -400, scale: 0.5, opacity: 0 }),
    center: { x: 0, scale: 1, opacity: 1 },
    exit: (dir) => ({ x: dir === 1 ? -400 : 400, scale: 0.5, y: 200, opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <MotionDiv
        key={`bg-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={bgImage}
          alt={current?.title_english ?? "anime banner"}
          className="bg-gradient-to-t from-slate-700 w-full object-cover aspect-[25/9] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent w-3/4" />
      </MotionDiv>

      {/* Main Content */}
      <AnimatePresence custom={direction}>
        <MotionDiv
          key={current?.mal_id ?? index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            ease: "easeInOut",
          }}
          className="w-[70%] absolute flex flex-col gap-2 left-8 top-32"
        >
          <div className="border border-accent w-fit px-2 py-1 text-sm rounded-md text-text font-bold">
            {current?.status}
          </div>

          <h2 className="title text-4xl font-bold text-text">
            {current?.title_english}
          </h2>

          <div className="flex gap-3 items-center">
            <div className="flex items-center text-text">
              <Star className="text-accent" fontSize="small" />
              <span className="text-base">{current?.score ?? "—"}</span>
            </div>

            <div className="flex gap-1 items-center text-text/60">
              <CalendarMonthOutlined fontSize="small" aria-hidden />
              <span className="text-base">{current?.year ?? "—"}</span>
            </div>

            <div className="text-text flex items-center text-base">
              <PlayArrowOutlined fontSize="small" aria-hidden />
              <span className="ml-1">{current?.episodes ?? "—"} eps</span>
            </div>

            <div className="text-base text-text px-2 border border-text rounded-md">
              {current?.rating ?? "—"}
            </div>
          </div>

          <div className="flex gap-2">
            {Array.isArray(current?.genres) &&
              current.genres.map((genre) => (
                <div
                  key={genre.mal_id}
                  className="px-2 text-sm py-1 bg-secondary text-text rounded-md text-center"
                >
                  {genre.name}
                </div>
              ))}
          </div>

          <p className="line-clamp-3 text-text text-base font-normal w-3/4">
            {current?.synopsis ?? "No synopsis available."}
          </p>

          <div className="flex items-center mt-4 font-semibold gap-4">
            <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to={`/anime/${current.mal_id}`}
                className="p-2 border-primary border rounded-md bg-primary/10 text-text"
              >
                View Details
              </NavLink>
            </MotionDiv>

            {current?.trailer?.embed_url && (
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  type="button"
                  aria-label="Watch trailer"
                  className="text-text flex items-center bg-secondary/20 border-secondary border rounded-md gap-2 p-2"
                  onClick={() => dispatch(setShowTrailer(true))}
                >
                  <PlayArrowOutlined />
                  Watch Trailer
                </button>
              </MotionDiv>
            )}
          </div>
        </MotionDiv>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-4 absolute right-6 bottom-6">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => {
            setDirection(0);
            dispatch(prevIndex(dataLength));
          }}
          className="text-tertiary bg-text w-[40px] h-[40px] rounded-full"
        >
          <ArrowBackIos fontSize="small" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => {
            setDirection(1);
            dispatch(nextIndex(dataLength));
          }}
          className="text-tertiary bg-text w-[40px] h-[40px] rounded-full"
        >
          <ArrowForwardIos fontSize="small" />
        </button>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <MotionDiv
          role="dialog"
          aria-modal="true"
          aria-label="Trailer modal"
          className="fixed inset-0 z-10 flex items-center justify-center h-svh w-svw bg-black/80"
          onClick={() => dispatch(setShowTrailer(false))}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence>
            <MotionDiv
              className="flex w-3/4 h-3/4 aspect-[16/22]"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <iframe
                title="anime-trailer"
                className="w-full h-full"
                src={current?.trailer?.embed_url ?? ""}
                allowFullScreen
              />
            </MotionDiv>
          </AnimatePresence>
        </MotionDiv>
      )}
    </div>
  );
};

export default BannerSlider;
