const Dropdown = ({ handleChange, value, options, label, name }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-text font-bold ">{label}</span>
      <div className="relative flex items-center  shadow-sm">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className={
            `appearance-none w-full px-4 pr-10 py-2 bg-background text-text text-sm rounded-lg focus:outline-none border-primary border focus:ring-2 focus:ring-accent ${
                value && `border border-accent`
            }`
          }
        >
          <option value="" hidden>
            Any
          </option>
          {options.map((type) => (
            <option key={type} value={type} className="appearance-none">
              {type.toUpperCase()}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 text-text -600 text-xs">
          ▼
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
