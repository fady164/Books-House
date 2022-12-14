import { Box } from "@mui/system";
import React from "react";
import Header from "../../../components/admin/Header";

export default function Dashboard() {
   return (
      <Box m="20px">
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subTitle="welcome to your dashboard" />
         </Box>
      </Box>
   );
}
