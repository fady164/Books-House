import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/admin/Header";

export default function AuthorsHouse() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const columns = [
      { field: "id", headerName: "ID" },
      {
         field: "name",
         headerName: "Username",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "age",
         headerName: "Book type",
         type: "text",
         headerAlign: "left",
         align: "left",
      },
      {
         field: "phone",
         headerName: "Publication date",
         flex: 1,
      },

      {
         field: "email",
         headerName: "Email",
         flex: 1,
      },
      {
         field: "accessLevel",
         headerName: "Package",
         headerAlign: "center",
         flex: 1,
      },
      {
         field: "test",
         headerName: "Phone number",
         headerAlign: "center",
         flex: 1,
      },
   ];

   return (
      <Box m="20px">
         <Header title="AUTHOR HOUSE" subTitle="List of authors" />
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
               rows={mockDataTeam}
               columns={columns}
               components={{
                  Toolbar: GridToolbar,
               }}
            />
         </Box>
      </Box>
   );
}
