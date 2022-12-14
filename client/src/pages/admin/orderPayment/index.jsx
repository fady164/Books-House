import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/admin/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getstripeOrders } from "../../../store/client/reducers/stripeOrdersSlice";

export default function OrderPayment() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const { stripeOrdersData } = useSelector((state) => state.stripeOrders);
   useEffect(() => {
      dispatch(getstripeOrders());
   }, []);

   const columns = [
      {
         field: "_id",
         hide: true,
      },
      {
         field: "quantity",
         headerName: "Quantity",
         flex: 1,
         align: "center",
         cellClassName: "name-column--cell",
         valueGetter: (params) => {
            return params.row.products.length;
         },
      },
      {
         field: "customerEmail",
         headerName: "Email",
         flex: 1.5,
      },
      {
         field: "customerPhone",
         headerName: "Phone",
         flex: 1.2,
      },
      {
         field: "line1",
         headerName: "Address",
         flex: 1,
         valueGetter: (params) => {
            return params.row.shipping.address.line1;
         },
      },
      {
         field: "payment_status",
         headerName: "Payment Status",
         flex: 1,
      },
      {
         field: "delivery_status",
         headerName: "Delivery Status",
         flex: 1,
      },
      {
         field: "subtotal",
         headerName: "Subtotal",
         flex: 1,
      },
      {
         field: "total",
         headerName: "Total",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "createdAt",
         headerName: "Craeted At",
         flex: 1.8,
      },
   ];

   return (
      <Box m="20px">
         <Header title="ORDER PAYMENT" subTitle="" />
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
               rows={stripeOrdersData}
               getRowId={(row) => row?._id}
               columns={columns}
               loading={!stripeOrdersData?.length}
               error={undefined}
            />
         </Box>
      </Box>
   );
}
