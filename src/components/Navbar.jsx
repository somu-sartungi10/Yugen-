import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "./button";

export const Navbar = ({ refresh }) => {
  return (
    <nav className="navbar flex items-center justify-between px-8 h-20">
      <div className="flex gap-20">
        <NavLink to={`/`}>
          <button
            onClick={() => refresh()}
            className="text-2xl text-text font-extrabold"
          >
            Yugen
          </button>
        </NavLink>
        <div className="nav-item text-text font-body text-base items-center flex gap-4">
          <Button to={`/`} label={`Home`} />
          <Button to={`/top/anime`} label={`Top`} />
          <Button to={`/random`} label={`Surprise Me!`} />
        </div>
      </div>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `bg-text flex justify-center items-center rounded-md transition p-1 px-3 ${
            isActive ? "border-2 border-accent " : ""
          }`
        }
      >
        <SearchIcon fontSize="medium" />
      </NavLink>
    </nav>
  );
};
