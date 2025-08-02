export const DetailInfoBox = ({ icon, label, value }) => {
  return (
   <div className="flex flex-col items-center  w-full max-w-[280px] px-4 py-5 bg-card-bg rounded-md shadow-lg border border-primary/30 hover:border-primary hover:shadow-primary/20 transition-all">
      <div className="flex items-center gap-3">
        <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
          <span className="text-primary">{icon}</span>
        </div>
        <span className="text-md font-medium text-primary tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-lg text-text font-semibold mt-3">{value ?? 'N/A'}</div>
    </div>
  );
};
