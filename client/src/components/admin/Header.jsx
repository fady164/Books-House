import React from "react";
// IconButton
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function Header({ title, subTitle }) {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   return (
      <Box mb="30px">
         <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
         >
            {title}
         </Typography>
         <Typography>{subTitle}</Typography>
      </Box>
   );
}
