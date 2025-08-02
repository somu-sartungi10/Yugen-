const StatTag = ({ value, icon, label,className="" }) => {
  const capLabel = label.toUpperCase();

  if (value === null || value.length === 0) return null

  return (
    <div className={`text-text flex flex-wrap gap-2 text-base w-full px-4 py-2 rounded ${className}`}>
      <div>{icon}</div>
      <span className="font-bold
      ">
        {(label === 'Ranked' || label==='Popular') ? '#' : null}
        {value} {capLabel}
      </span>
    </div>
  );
};

export default StatTag;
