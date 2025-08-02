import ClearIcon from "@mui/icons-material/Clear";

const Tags = ({ label, value, handleDelete }) => {
  const Val = value.toUpperCase();

  return (
    <div className=" flex items-center rounded-md gap-2 px-4 p-2 bg-secondary/40 hover:bg-secondary/80 ease-linear duration-200 transition text-text text-sm group">
      <span className="text-[11px] font-semibold">{Val}</span>
      <button
        onClick={() => handleDelete(label)}
        className="hidden group-hover:block transition-all duration-200 ease-in-out"
      >
        <ClearIcon style={{ fontSize: "18px" }} />
      </button>
    </div>
  );
};

export default Tags;
