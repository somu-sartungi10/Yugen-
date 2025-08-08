import { useLocation } from "react-router-dom";

const GridLayout = ({children}) => {
  const location = useLocation()
  return (
      <div className={`${location.pathname === '/search' ? 'grid grid-cols-1 p-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-7 w-full overflow-y-auto max-h-svh scrollbar-hide' : 'grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 w-full p-6'}`} >
        {children}
      </div>
  );
};

export default GridLayout;
