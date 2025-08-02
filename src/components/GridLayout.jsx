const GridLayout = ({children}) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 w-full">
        {children}
      </div>
    </div>
  );
};

export default GridLayout;
