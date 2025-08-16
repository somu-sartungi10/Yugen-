import { Navbar } from "../components/UI/Navbar";
import BannerSlider from "../components/Banner";
import TopAiring from "../components/TopAiring";
import Footer from "../components/UI/footer"
import UpcomingAnime from "../components/UpcomingAnime";


const Home = () => {
  return (
    <div>
      <Navbar/>
      <BannerSlider/>
      <TopAiring/>
      <UpcomingAnime/>
      <Footer/>
    </div>
  );
};

export default Home;