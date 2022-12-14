import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataInvoices } from "../../../data/mockData";
import Header from "../../../components/admin/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getstripePackages } from "../../../store/client/reducers/stripePackagesSlice";
import { useEffect, useState } from "react";

export default function StripePackages() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const dispatch = useDispatch();
   const { stripePackagesData } = useSelector((state) => state.stripePackages);

   useEffect(() => {
      dispatch(getstripePackages());
   }, []);

   const columns = [
      {
         field: "_id",
         hide: true,
      },
      {
         field: "authorData.firstName",
         headerName: "Name",
         flex: 1,
         cellClassName: "name-column--cell",
         valueGetter: (params) => {
            return (
               params.row.authorData.firstName +
               " " +
               params.row.authorData.lastName
            );
         },
      },
      {
         field: "authorData.authorEmail",
         headerName: "Email",
         flex: 1.4,
         valueGetter: (params) => {
            return params.row.authorData.authorEmail;
         },
      },
      {
         field: "authorData.phoneNumber",
         headerName: "Phone",
         flex: 1,
         valueGetter: (params) => {
            return params.row.authorData.phoneNumber;
         },
      },
      {
         field: "booksnumber",
         headerName: "No. of Books",
         flex: 1,
         valueGetter: (params) => {
            return params.row.authorData.booksnumber;
         },
      },
      {
         field: "package.name",
         headerName: "Package Name",
         flex: 1,
         valueGetter: (params) => {
            return params.row.package.name;
         },
      },
      {
         field: "package.price",
         headerName: "Package Price",
         flex: 1,
         valueGetter: (params) => {
            return "$" + params.row.package.price;
         },
      },
      {
         field: "createdAt",
         headerName: "Craeted At",
         flex: 1.5,
      },
   ];

   return (
      <Box m="20px">
         <Header title="PACKAGES PAYMENT" subTitle="" />
         <Box
            m="40px 0 0 0"
            height="75vh"
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
               "& .MuiDataGrid-columnHeaders": {
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
            }}
         >
            <DataGrid
               rows={stripePackagesData}
               getRowId={(row) => row?.createdAt}
               columns={columns}
               loading={!stripePackagesData?.length}
            />
         </Box>
      </Box>
   );
}
