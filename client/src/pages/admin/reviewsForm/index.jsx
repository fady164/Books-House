import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
// import {
//   addBookReview,
//   updateBookReview,
// } from "../../../store/client/reducers/bookReviewSlice";
import {
   useAddBookReviewMutation,
   useUpdateBookReviewMutation,
} from "../../../features/bookReviewApiSlice";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const initialValues = {
   title: "",
   reviwer: "",
   publisher: "",
   desc: "",
   category: "",
};

const userSchema = yup.object().shape({
   title: yup.string(),
   reviewer: yup.string(),
   publisher: yup.string(),
   desc: yup.string(),
   category: yup.string(),
});

export default function ReviewsForm() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [addBookReview, { isLoading: addLoading, isSuccess }] =
      useAddBookReviewMutation();

   const [updateBookReview, { isLoading: updateLoading }] =
      useUpdateBookReviewMutation();

   const [formValue, setFormValue] = useState({
      title: "",
      reviwer: "",
      publisher: "",
      desc: "",
      category: "",
      imageSrc: "",
   });
   const { id } = useParams();
   const { dataEditBookReview } = useSelector((state) => state.bookReviews);

   useEffect(() => {
      if (id) {
         setFormValue(dataEditBookReview);
      }
   }, []);

   const updateImagePath = (e) => {
      setImage(e.target.files[0]);
   };

   const isNonMobile = useMediaQuery("(min-width:600px)");

   // SUBMIT
   const handleFormSubmit = (book) => {
      if (id) {
         console.log("bef submit edit");
         updateBookReview({ id, formValue });

         // dispatch(updateBookReview({ id, formValue }));
      } else {
         setFormValue({
            ...book,
            imageSource: image,
         });
         addBookReview(formValue);
         isSuccess ? navigate("/admin/reviews") : navigate("/home");
         // dispatch(addBookReview(formValue));
      }
      navigate("/admin/reviews");
   };

   const operationHandler = (e) => {
      const { name, value } = e.target;
      setFormValue((pervState) => ({
         ...pervState,
         [name]: value,
      }));
   };

   //upload logic
   const [image, setImage] = useState("");
   const [url, setUrl] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const uploadImage = async () => {
      setIsLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "booksImages");
      data.append("cloud_name", "dzm6mwpui");
      fetch("https://api.cloudinary.com/v1_1/dzm6mwpui/image/upload", {
         method: "post",
         body: data,
      })
         .then((resp) => resp.json())
         .then((data) => {
            setUrl(data.url);
            setIsLoading(false);
            setFormValue({
               ...formValue,
               imageSrc: data.url,
            });
         })
         .catch((err) => console.log(err));
   };
   return (
      <Box m="15px 20px 0">
         <Header title="REVIEWS FORM" subTitle="" />
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
                     gap="20px"
                     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                     sx={{
                        "& > div": {
                           gridColumn: isNonMobile ? undefined : "span 4",
                        },
                     }}
                  >
                     {/* TITLE */}
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Title"
                        color="grey"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.title}
                        placeholder={id ? dataEditBookReview.title : ""}
                        name="title"
                        error={!!touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        sx={{ gridColumn: "span 4" }}
                     />
                     {/* REVIEWER */}
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Reviewer"
                        color="grey"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.reviewer}
                        placeholder={id ? dataEditBookReview.reviwer : ""}
                        name="reviwer"
                        error={!!touched.reviewer && !!errors.reviewer}
                        helperText={touched.reviewer && errors.reviewer}
                        sx={{ gridColumn: "span 4" }}
                     />
                     {/* PUBLISHER */}
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Publisher"
                        color="grey"
                        onBlur={handleBlur}
                        placeholder={id ? dataEditBookReview.publisher : ""}
                        onChange={handleChange}
                        value={values.publisher}
                        name="publisher"
                        error={!!touched.publisher && !!errors.publisher}
                        helperText={touched.publisher && errors.publisher}
                        sx={{ gridColumn: "span 4" }}
                     />
                     {/* CATEGORY */}
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Category"
                        color="grey"
                        placeholder={id ? dataEditBookReview.category : ""}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.category}
                        name="category"
                        error={!!touched.category && !!errors.category}
                        helperText={touched.category && errors.category}
                        sx={{ gridColumn: "span 4" }}
                     />
                     {/* DESCRIPTOIN */}
                     <TextField
                        fullWidth
                        multiline
                        rows={5}
                        maxRows={10}
                        variant="filled"
                        type="text"
                        label="Description"
                        color="grey"
                        placeholder={id ? dataEditBookReview.desc : ""}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.desc}
                        name="desc"
                        error={!!touched.desc && !!errors.desc}
                        helperText={touched.desc && errors.desc}
                        sx={{ gridColumn: "span 4" }}
                     />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                     <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                     >
                        {id ? "Edit " : "Add Review"}
                     </Button>
                  </Box>
               </form>
            )}
         </Formik>

         {/* IMGAE */}
         <Box
            sx={{
               m: 2,
               display: "flex",
            }}
         >
            <Typography sx={{ color: colors.grey[200], mr: 2 }}>
               Image
            </Typography>
            <label htmlFor="upload-photo">
               <input
                  onChange={(e) => {
                     updateImagePath(e);
                  }}
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
               />

               <Button
                  variant="contained"
                  component="span"
                  sx={{
                     color: "#ffffff",
                     backgroundColor: colors.blueAccent[400],
                     "&:hover": {
                        backgroundColor: colors.blueAccent[500],
                        opacity: [0.9, 0.8, 0.7],
                     },
                  }}
               >
                  Choose Image
               </Button>
            </label>

            <LoadingButton
               variant="contained"
               component="label"
               onClick={uploadImage}
               disabled={image ? false : true}
               sx={{
                  backgroundColor: colors.greenAccent[600],
                  ml: 3,
                  "&:hover": {
                     backgroundColor: colors.greenAccent[700],
                     opacity: [0.9, 0.8, 0.7],
                  },
               }}
               disableElevation
               loading={isLoading}
            >
               Upload
            </LoadingButton>
            <div className="d-flex">
               {url && (
                  <div className="fs-5 ms-3  text-success">
                     Uploaded
                     <CheckCircleIcon className="fs-5 ms-1  text-success" />
                  </div>
               )}
            </div>
         </Box>
      </Box>
   );
}
