import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";

export const PaginationOutline = ({
  count,
  current_page,
  onPageChange,
  isLoading,
  animeList,
}) => {
  if (isLoading || !count) return null;

  return (
    <Stack spacing={2} alignItems="center">
      <div className="text-text font-body text-base">
        Page : {current_page}/{count}
      </div>

      <motion.div
        key={current_page}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Pagination
          size="large"
          color="standard"
          variant="outlined"
          shape="rounded"
          count={count}
          page={current_page}
          onChange={(_, value) => onPageChange(value)}
          disabled={isLoading || animeList.length === 0}
          sx={{
            "& .MuiPaginationItem-root": {
              borderColor: "#82bceb",
              color: "#e5f3fb",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#82bceb",
              color: "#04101a",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#82bceb",
              color: "#04101a",
              borderColor: "#82bceb",
            },
            // This is the key fix - disable hover on selected items
            "& .MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "#82bceb", // Keep the same background
              color: "#04101a", // Keep the same text color
              cursor: "default", // Optional: change cursor to indicate it's not clickable
            },
          }}
        />
      </motion.div>
    </Stack>
  );
};