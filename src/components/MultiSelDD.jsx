import { useRef, useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

const DropdownMultiSelect = ({
  options = [],
  selected = [],
  onChange,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchGen, setSearchGen] = useState("");
  console.log(searchGen);

  const filterGen = options.filter((val) => {
    return val.label.toLowerCase().includes(searchGen.toLocaleLowerCase());
  });

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (selected.includes(option.value)) {
      onChange(selected.filter((val) => val !== option.value));
    } else {
      onChange([...selected, option.value]);
    }
  };

  const isSelected = (value) => selected.includes(value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabels = selected.map((val)=>options.find((opt)=>opt.value === val)?.label).filter(Boolean);

  const visibleLabels = selectedLabels.slice(0,2)
  const hiddenCount = selectedLabels.length - visibleLabels.length;

  return (
    <div
      className=" flex flex-col relative col-span-2 text-text"
      ref={dropdownRef}
    >
      <div>
        <div className="text-base text-text font-bold mb-1">{label}</div>
        <div
          className="border border-border text-sm bg-background rounded-md px-3 py-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          {
            visibleLabels.map((label, idx)=>(
              <span
              key={idx}
              className="text-sm px-2 py-1 bg-primary/60 rounded-sm mr-1"
              >
                {label}
              </span>
            ))
          }
          {
            hiddenCount > 0 && (
              <span>
                +{hiddenCount}
              </span>
            )
          }
          {
            selected.length === 0 && (
              <span className="text-text">
                Select your genre....
              </span>
            )
          }
          <span className="pointer-events-none absolute right-3 text-text -600 text-xs">
            <ArrowDropDownCircleOutlinedIcon/>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute  top-full right-0  bg-background border border-border rounded-md max-h-[200px] overflow-y-auto z-[100] shadow  gap-2  p-2 flex flex-col w-full mt-2 custom-scrollbar">
          <div className="flex relative  flex-col col-span-4 gap-2">
            <span className="font-bold ">Genre</span>

            <div className="flex items-center px-2 gap-2 rounded-sm  bg-primary/20">
              <SearchOutlinedIcon
                fontSize="small"
                style={{ color: "#82bceb" }}
              />
              <input
                type="text"
                placeholder="What are you looking for ?"
                className="w-full bg-transparent py-2 outline-none rounded-sm text-sm"
                value={searchGen}
                onChange={(e) => setSearchGen(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {filterGen.map((option) => (
              <div
                key={option.value}
                className={`p-2  text-sm transition-all duration-200 ease-out rounded-sm border border-primary/20 cursor-pointer hover:bg-primary/70 ${
                  isSelected(option.value) ? "bg-primary/80 font-semibold" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMultiSelect;
