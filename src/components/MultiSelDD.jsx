import { useRef, useState, useEffect } from "react";

const DropdownMultiSelect = ({
  options = [],
  selected = [],
  onChange,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className=" flex flex-col relative text-text w-[200px]" ref={dropdownRef}>
      <div>
        <div className="text-base text-text font-bold mb-1">{label}</div>
        <div
          className="border border-border text-sm bg-background rounded-md px-3 py-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          "Select.."
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full right-0 w-[500px] bg-background border border-border rounded-md max-h-[250px] overflow-y-auto z-50 shadow  gap-2  p-2 grid grid-cols-4 mt-2 custom-scrollbar">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 text-sm transition-all duration-200 ease-out rounded-sm border border-primary/20 cursor-pointer hover:bg-accent/80 ${
                isSelected(option.value) ? "bg-accent font-semibold" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMultiSelect;
