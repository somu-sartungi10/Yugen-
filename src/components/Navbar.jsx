import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';


export const Navbar = ({query,setQuery,refresh}) => {

  const Location = useLocation()

  return (
    <nav className="navbar flex  item-center justify-between px-8 py-4">
      <div className="flex gap-20">
        <button
        onClick={()=>refresh()}
        className="text-2xl text-text font-extrabold"
        >
          Yugen
        </button>
      <div className="nav-item text-text font-body text-base items-center flex gap-4">
        <NavLink
        to="/"
        className={({ isActive })=>
         `px-4 py-2 rounded-sm transition-colors ${
          isActive ? "bg-primary rounded-sm text-text" : "hover:bg-secondary transition ease-in-out text-text"
         }`
        }
        >
        Home
        </NavLink>
        <NavLink
        to="/random"
        className={({isActive})=>
         `px-4 py-2 rounded-sm transition-colors ${
          isActive ? "bg-primary rounded-sm text-text" : "hover:bg-secondary transition ease-in-out text-text"
         }`
        }
        >
          Randomize
        </NavLink>
      </div>
      </div>
        {
          Location.pathname !== '/random' && (
            <div className="bg-text flex justify-center items-center p-2 rounded-md gap-1
            focus-within:ring-2 focus-within:ring-accent transition
            ">
              <SearchIcon
               fontSize="small"
               color="#dec133"
              />
              <input
               onChange={(e) =>setQuery(e.target.value)}
               value={query}
               type="text"
               className="text-background  bg-text rounded-md text-sm font-body outline-none w-[150px]"
               placeholder="Search your anime here..."
               />
            </div>
          )
        }
    </nav>
  )
}
