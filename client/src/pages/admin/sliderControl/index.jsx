import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { tokens } from "../../../theme";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../../components/admin/Header";

const SliderControl = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isLoading, setIsLoading] = React.useState(false);
   const [errorMessage, setErrorMessage] = React.useState(null);
   const [imageAndUrl, setImageAndUrl] = React.useState({});
   //SLECETOR LOGIC
   const [selectorValue, setSelectorValue] = React.useState(0);

   const handleChange = (event) => {
      setSelectorValue(event.target.value);
      if (event.target.value !== "") {
         setImageAndUrl({ ...imageAndUrl, imageNumber: event.target.value });
      }
   };

   // UPLOAD LOGIC
   const [image, setImage] = useState("");
   const [url, setUrl] = useState("");
   const uploadImage = async () => {
      const data = new FormData();
      if (selectorValue !== 0 && image) {
         data.append("file", image);
         data.append("upload_preset", "slider images");
         data.append("cloud_name", "dzm6mwpui");
         try {
            const res = await fetch(
               "https://api.cloudinary.com/v1_1/dzm6mwpui/image/upload",
               {
                  method: "post",
                  body: data,
               }
            );
            setUrl(res.url);
            setImageAndUrl({ ...imageAndUrl, imageUrl: res.url });
            setErrorMessage(null);
         } catch (error) {
            console.log(error);
         }
      } else {
         setErrorMessage("Error! Please check your values");
      }
   };
   return (
      <Box m="20px">
         <Header title="Change Slider Images" />
         <Box>
            <FormControl
               sx={{
                  m: 2,
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
                  <MenuItem value={0}>
                     <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Image 1</MenuItem>
                  <MenuItem value={2}>Image 2</MenuItem>
                  <MenuItem value={3}>Image 3</MenuItem>
               </Select>
               <FormHelperText>* IMAGE SIZE MUST BE xxxx</FormHelperText>
               {errorMessage && (
                  <FormHelperText
                     sx={{
                        color: colors.redAccent[500],
                     }}
                  >
                     {errorMessage}
                  </FormHelperText>
               )}
            </FormControl>
            <Box
               sx={{
                  m: 2,
               }}
            >
               <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
               ></input>
               <Button
                  disabled={image && selectorValue !== 0 ? false : true}
                  variant="contained"
                  component="label"
                  onClick={uploadImage}
                  sx={{
                     backgroundColor: colors.greenAccent[600],
                  }}
               >
                  Upload
               </Button>
            </Box>
         </Box>
      </Box>
   );
};
export default SliderControl;
