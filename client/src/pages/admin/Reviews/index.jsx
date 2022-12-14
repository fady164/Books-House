import React, { useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { bookReviewActions } from "../../../store/client/reducers/bookReviewSlice";
import { bookReviewApiSlice } from "../../../features/bookReviewApiSlice";
import FullScreenLoader from "../../../components/FullScreenLoader";
import {
   useDeleteBookReviewMutation,
   useGetBookReviewsQuery,
} from "../../../features/bookReviewApiSlice";

export default function Reviews() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { bookReviews } = useSelector((state) => state.bookReviews);
   const [pageSize, setPageSize] = useState(25);

   const { setdataEditBookReview, getDataBookReview } = bookReviewActions;

   const { isLoading, isFetching } =
      bookReviewApiSlice.endpoints.getBookReviews.useQuery(null, {
         refetchOnMountOrArgChange: true,
         skip: false,
      });
   const bookRev = bookReviewApiSlice.endpoints.getBookReviews.useQueryState(
      null,
      {
         selectFromResult: ({ data }) => data,
      }
   );
   console.log("new data every fetch", bookRev);
   // if (bookRev) {
   //    console.log("book reviews", bookRev);
   // }
   const { data, isSuccess, isError } = useGetBookReviewsQuery();
   // let myData = "";
   const [
      deleteBookReview,
      { isError: deleteError, isLoading: deleteLoading },
   ] = useDeleteBookReviewMutation();

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   useEffect(() => {
      if (data) {
         dispatch(getDataBookReview(data));
      }
   }, [dispatch]);

   const columns = [
      { field: "_id", hide: true },
      {
         field: "imageSrc",
         headerName: "Image",
         width: "70px",
         flex: 1,
         sortable: false,
         filterable: false,
         renderCell: (params) => (
            <img
               alt="img"
               src={params.row.imageSrc}
               className=" img-fluid"
               variant="rounded"
            />
         ),
      },
      {
         field: "title",
         headerName: "Title",
         flex: 0.8,
         cellClassName: "name-column--cell",
      },

      {
         field: "reviwer",
         headerName: "Reviewer",
         headerAlign: "left",
         flex: 1,
         align: "left",
      },
      {
         field: "desc",
         headerName: "Description",
         type: "text",
         flex: 1,
      },

      {
         field: "publisher",
         headerName: "Publisher",
         flex: 1,
      },
      {
         field: "category",
         headerName: "Category",
         flex: 1,
      },
      {
         field: "test",
         headerName: "Actions",
         headerAlign: "center",
         flex: 1.5,
         renderCell: (params) => {
            const actionHandler = (e) => {
               e.stopPropagation();
               const api = params.api;
               const thisRow = {};

               api.getAllColumns()
                  .filter((c) => c.field !== "__check__" && !!c)
                  .forEach(
                     (c) =>
                        (thisRow[c.field] = params.getValue(params.id, c.field))
                  );
               const filteredBookReview = bookReviews.filter(
                  (book) => book._id === thisRow._id
               );
               if (e.target.innerText === "DELETE") {
                  deleteBookReview(thisRow);
                  // dispatch(deleteBookReview(thisRow));
               }
               if (e.target.innerText === "EDIT") {
                  dispatch(setdataEditBookReview(filteredBookReview[0]));
                  navigate(`/admin/reviewsform/${filteredBookReview[0]._id}`);
               }
               if (e.target.innerText === "VIEW") {
                  navigate(`/reviewdetails/${filteredBookReview[0]._id}`);
               }
            };
            return (
               <Box>
                  <Button
                     variant="contained"
                     color="error"
                     name="id"
                     sx={{
                        mr: "5px",
                     }}
                     onClick={actionHandler}
                  >
                     <Typography color={colors.grey[100]}>Delete</Typography>
                  </Button>
                  <Button
                     sx={{
                        mx: "5px",
                     }}
                     variant="contained"
                     color="success"
                     onClick={actionHandler}
                  >
                     <Typography color={colors.grey[100]}>Edit</Typography>
                  </Button>
                  <Button
                     sx={{
                        ml: "5px",
                     }}
                     variant="contained"
                     color="inherit"
                     onClick={actionHandler}
                  >
                     <Typography color={colors.grey[900]}>View</Typography>
                  </Button>
               </Box>
            );
         },
      },
   ];

   const addNewReview = () => {
      navigate("/admin/reviewsform");
   };
   return (
      <Box m="20px">
         <Button
            onClick={addNewReview}
            variant="contained"
            sx={{
               m: "20px",
               color: colors.primary[900],
               backgroundColor: colors.blueAccent[400],
               "&:hover": {
                  backgroundColor: colors.blueAccent[500],
                  opacity: [0.9, 0.8, 0.7],
               },
            }}
         >
            Add New Review
         </Button>
         <Box
            m="40px 0 0 0"
            height="85vh"
            sx={{
               "& .MuiDataGrid-root": {
                  border: "none",
               },
               "& .MuiDataGrid-cell": {
                  borderBottom: "none",
               },
               "& .name-column--cell": {
                  color: colors.greenAccent[300],
               },
               "& .img-column--cell": {},
               "& .MuiDataGrid-columnHeader": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
               },
               "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
               },
               "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
               },
               "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
               },
               "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
               },
            }}
         >
            <DataGrid
               rows={bookReviews} //add reviews array
               columns={columns}
               loading={!bookReviews?.length}
               components={{
                  Toolbar: GridToolbar,
               }}
               getRowId={(row) => row._id}
               rowsPerPageOptions={[25, 50, 100]}
               pageSize={pageSize}
               onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
         </Box>
      </Box>
   );
}
