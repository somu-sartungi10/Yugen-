import Pagination from "@mui/material/Pagination"
import { Stack } from "@mui/material"


export const PaginationOutline = ({count,current_page,onPageChange,isLoading,animeList}) =>
 {
    if(isLoading || !count) return null

  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      size="large"
      >
        <div
         className="text-text font-body text-base"
        >
            Page : {current_page}/{count}
        </div>
        <Pagination
        color="standard"
        variant="outlined"
        shape="rounded"
        count={count}
        page={current_page}
        onChange={(_,value)=>onPageChange(value)}
        disabled={isLoading || animeList.length === 0}
        sx={{
          '& .MuiPaginationItem-root':{
            borderColor : '#82bceb',
            color : '#e5f3fb',
          },
          '& .MuiPaginationItem-root.Mui-selected':{
             backgroundColor: '#82bceb',
            color: '#04101a',
            borderColor: '#82bceb',
          },
          '& .MuiPaginationItem-root:hover':{
            backgroundColor : '#82bceb',
            color : '#04101a',
          }
        }}
        />
    </Stack>
  )
}
