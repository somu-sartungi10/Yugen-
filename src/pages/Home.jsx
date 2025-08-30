import { Navbar } from "../components/UI/Navbar";
import BannerSlider from "../components/UI/banner/Banner";
import Footer from "../components/UI/footer"
import MovingIcon from "@mui/icons-material/Moving";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AnimeSection from "../components/AnimeSection";
import { useGetBannerAnimeQuery, useGetTopAiringQuery,useGetTopAnimeQuery } from "../features/api/apiSlice";
import SkelBanner from "../components/UI/banner/SkelBanner.jsx";
import React from "react";

const Home = () => {
  const topAiring = useGetTopAiringQuery({limit:12})
  const mostPopular = useGetTopAnimeQuery({limit:12,filter:'bypopularity'})
  const bannerData = useGetBannerAnimeQuery()


  const isError = mostPopular.isError || topAiring.isError

  if(isError) return <div className="text-red">Something went wrong</div>


  return (
    <div>
      <Navbar/>
      {
        !bannerData.isLoading ? (
          <BannerSlider/>
        ) : <SkelBanner/>
      }
      <AnimeSection
      queryHook={()=>topAiring}
      title="Top Airing"
      icon={<MovingIcon fontSize="medium"/>}
      />
      <AnimeSection
      queryHook={()=>mostPopular}
      title='Most Popular'
      icon={<WhatshotIcon fontSize="medium" className="text-secondary"/>}
      />
      <Footer/>
    </div>
  );
};

export default Home;