import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { tokens } from "../../../theme";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/admin/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
   useGetPackageDataQuery,
   useUpdatePackageDataMutation,
} from "../../../features/packageApiSlice";
import { packageActions } from "../../../store/client/reducers/packageSlice";

const initialValues = {
   packageName: "",
   packageDesc: "",
   packagePrice: "",
};
const userSchema = yup.object().shape({
   packageName: yup.string(),
   packageDesc: yup.string(),
   packagePrice: yup.string(),
});
export default function PackagesControl() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const { isSuccess } = useGetPackageDataQuery();
   const { packageData } = useSelector((state) => state.package);

   const [updatePackageData, { isError, isLoading }] =
      useUpdatePackageDataMutation();

   const [formValue, setFormValue] = useState({});
   const [packageId, setPackageId] = useState("");

   const isNonMobile = useMediaQuery("(min-width:600px)");
   const dispatch = useDispatch();
   const { setDataInLocalState } = packageActions;

   const handleFormSubmit = () => {
      if (packageId.packageDesc[0].length < 2) {
         packageId.packageDesc = packageId.packageDesc.split(",");
      }
      updatePackageData(packageId);
   };

   const operationHandler = (e) => {
      setPackageId({
         ...packageId,
         [e.target.name]: e.target.value,
      });
   };

   //SELECETOR LOGIC
   const [selectorValue, setSelectorValue] = React.useState("");
   const handleChange = (event) => {
      setSelectorValue(event.target.value);
      setPackageId(packageData[event.target.value - 1]);
   };
   return (
      <Box m="20px">
         <Header title="Edit Your Package" />
         <Typography>Choose your package:</Typography>
         <FormControl
            sx={{
               m: 2,
               ml: 5,
               mb: 5,
               minWidth: 120,
            }}
         >
            <Select
               sx={{
                  backgroundColor: colors.blueAccent[100],
                  color: colors.primary[900],
               }}
               value={selectorValue}
               onChange={handleChange}
               displayEmpty
               inputProps={{ "aria-label": "Without label" }}
            >
               <MenuItem value="">
                  <em>None</em>
               </MenuItem>
               <MenuItem value={1}>Package 1</MenuItem>
               <MenuItem value={2}>Package 2</MenuItem>
               <MenuItem value={3}>Package 3</MenuItem>
            </Select>
         </FormControl>
         <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
         >
            {({
               values,
               errors,
               touched,
               handleBlur,
               handleChange,
               handleSubmit,
            }) => (
               <form onSubmit={handleSubmit} onChange={operationHandler}>
                  <Box
                     display="grid"
                     gap="30px"
                     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                     sx={{
                        "& > div": {
                           gridColumn: isNonMobile ? undefined : "span 4",
                        },
                        mx: "5",
                     }}
                  >
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Package Name"
                        color="grey"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={packageId?.packageName}
                        value={values.packageName}
                        name="packageName"
                        error={!!touched.packageName && !!errors.packageName}
                        helperText={touched.packageName && errors.packageName}
                        sx={{ gridColumn: "span 3  " }}
                     />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Package Price"
                        color="grey"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={packageId?.packagePrice}
                        value={values.packagePrice}
                        name="packagePrice"
                        error={!!touched.packagePrice && !!errors.packagePrice}
                        helperText={touched.packagePrice && errors.packagePrice}
                        sx={{ gridColumn: "span 1" }}
                     />
                     <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="filled"
                        type="text"
                        label="Package Description"
                        color="grey"
                        onBlur={handleBlur}
                        placeholder={packageId?.packageDesc}
                        onChange={handleChange}
                        value={values.packageDesc}
                        name="packageDesc"
                        error={!!touched.packageDesc && !!errors.packageDesc}
                        helperText={touched.packageDesc && errors.packageDesc}
                        sx={{ gridColumn: "span 4" }}
                     />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                     <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                     >
                        EDIT
                     </Button>
                  </Box>
               </form>
            )}
         </Formik>
      </Box>
   );
}
