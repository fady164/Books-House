import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { booksActions } from "../../../store/client/reducers/bookSlice";
import { deleteBook, getBooks } from "../../../store/client/reducers/bookSlice";
import { useState } from "react";

export default function Books() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { changeBookData } = booksActions;
   const { books } = useSelector((state) => state.books);
   const [pageSize, setPageSize] = useState(25);

   useEffect(() => {
      dispatch(getBooks());
   }, []);

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const columns = [
      { field: "_id", hide: true },
      {
         field: "imageSource",
         headerName: "Image",
         width: "70px",
         flex: 1,
         sortable: false,
         filterable: false,
         renderCell: (params) => (
            <img
               alt="img"
               src={params.row.imageSource}
               className=" img-fluid"
               variant="rounded"
            />
         ),
      },
      {
         field: "title",
         headerName: "Title",
         flex: 1.3,
         cellClassName: "name-column--cell",
      },
      {
         field: "price",
         renderCell: (params) => "$" + params.row.price,
         headerName: "Price",
         headerAlign: "left",
         align: "left",
      },
      {
         field: "bookDesc",
         headerName: "Description",
         type: "text",
         flex: 1,
      },

      {
         field: "author",
         headerName: "Author",
         flex: 1,
      },
      {
         field: "category",
         headerName: "Category",
         flex: 1,
         valueGetter: (params) => {
            return params.row.category.toUpperCase();
         },
      },
      {
         field: "type",
         headerName: "Type",
         flex: 1,
         valueGetter: (params) => {
            return params.row.type.toUpperCase();
         },
      },
      {
         field: "test",
         headerName: "Actions",
         headerAlign: "center",
         flex: 1.8,
         sortable: false,
         filterable: false,
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
               const filteredBook = books.filter(
                  (book) => book._id === thisRow._id
               );

               if (e.target.innerText === "DELETE") {
                  dispatch(deleteBook(thisRow));
               }

               if (e.target.innerText === "EDIT") {
                  dispatch(changeBookData(filteredBook[0]));
                  navigate(`/admin/bookform/${filteredBook[0]._id}`);
               }
               if (e.target.innerText === "VIEW") {
                  navigate(`/bookdetails/${filteredBook[0]._id}`);
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

   const addNewBook = () => {
      navigate("/admin/booksform");
   };
   return (
      <Box m="20px">
         <Button
            onClick={addNewBook}
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
            Add New Book
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
               rows={books}
               columns={columns}
               components={{
                  Toolbar: GridToolbar,
               }}
               loading={!books?.length}
               getRowId={(row) => row._id}
               rowsPerPageOptions={[25, 50, 100]}
               pageSize={pageSize}
               onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
         </Box>
      </Box>
   );
}
