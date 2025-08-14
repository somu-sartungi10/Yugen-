import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "./button";
import { HomeOutlined } from "@mui/icons-material";
import Logo from '../../assets/logo5.png'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

export const Navbar = ({ refresh }) => {

  return (
    <nav className="navbar flex items-center justify-between bg-primary/10 px-8 h-[80px]"

    >
      <div className="flex  gap-10">
        <NavLink className='flex  items-center' to={`/`}>
          <div
            onClick={() => refresh()}
            className="text-3xl text-text  font-extrabold"
          >
            <img src={Logo} className="h-[50px]" />
          </div>
        </NavLink>
        <div className=" text-text flex font-body text-base gap-5">
          <Button to={`/`} label={`Home`} icon={<HomeOutlined fontSize="small"/>} />
          <Button to={`/top/anime`} label={`Top Anime`} icon={<ArrowUpwardOutlinedIcon fontSize="small"/>}/>
          <Button to={`/random`} label={`Surprise Me!`} />
        </div>
      </div>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `bg-text flex justify-center items-center rounded-md transition p-1 px-3 ${
            isActive ? "border-3 border-primary " : ""
          }`
        }
      >
        <SearchIcon fontSize="medium" />
      </NavLink>
    </nav>
  );
};
