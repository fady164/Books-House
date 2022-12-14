import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Header from "../../../components/admin/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../store/client/reducers/userDataSlice";

export default function UsersStore() {
  const [pageSize, setPageSize] = useState(10);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const { users } = useSelector((state) => state.userData);

  if (users) {
    // console.log(users);
  }
  const columns = [
    { field: "_id", hide: true },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "confirmed",
      headerName: "Email Confirmed",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { confirmed } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              confirmed ? colors.greenAccent[600] : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {confirmed ? <CheckIcon /> : <ClearIcon />}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Our Users" subtitle="Managing the Team Members" />
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
          rows={users}
          columns={columns}
          loading={!users.length}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[10, 15, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>
    </Box>
  );
}
