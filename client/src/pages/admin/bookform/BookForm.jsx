import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useStepContext,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/admin/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook, updateBook } from "../../../store/client/reducers/bookSlice";
import { useEffect } from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingButton } from "@mui/lab";

const initialValues = {
  title: "",
  price: "",
  author: "",
  bookDesc: "",
  category: "",
  type: "",
};

const userSchema = yup.object().shape({
  title: yup.string(),
  price: yup.string(),
  author: yup.string(),
  bookDesc: yup.string(),
  category: yup.string(),
  type: yup.string(),
});

export default function BookForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: "",
    price: "",
    author: "",
    category: "",
    bookDesc: "",
    imageSource: "",
  });
  const { id } = useParams();
  const { dataEditBook } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) {
      setFormValue(dataEditBook);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const updateImagePath = (e) => {
    setImage(e.target.files[0]);
  };

  // SUBMIT
  const handleFormSubmit = (book) => {
    if (id) {
      dispatch(updateBook({ id, formValue }));
    } else {
      setFormValue({
        ...book,
        imageSource: image,
      });
      dispatch(addBook(formValue));
    }
    navigate("/admin/books");
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
          imageSource: data.url,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box m="20px 20px 0">
      <Header title="BOOK FORM" subTitle="" />
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
              }}
            >
              {/* TITLE */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                color="grey"
                defaultValue={id ? dataEditBook.title : ""}
                InputLabelProps={{ className: "text-field" }}
                onChange={handleChange}
                value={values.title}
                placeholder={id ? dataEditBook.title : ""}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              {/* PRICE */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Price"
                color="grey"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                placeholder={id ? dataEditBook.price : ""}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              {/* AUTHOR */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Author"
                color="grey"
                onBlur={handleBlur}
                placeholder={id ? dataEditBook.author : ""}
                onChange={handleChange}
                value={values.author}
                name="author"
                error={!!touched.author && !!errors.author}
                helperText={touched.author && errors.author}
                sx={{ gridColumn: "span 4" }}
              />
              {/* CATEGORY */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                color="grey"
                placeholder={id ? dataEditBook.category : ""}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 4" }}
              />
              {/* TYPE */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                color="grey"
                placeholder={id ? dataEditBook.type : ""}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              />
              {/* DECRIPTOIN */}
              <TextField
                fullWidth
                multiline
                rows={5}
                maxRows={10}
                variant="filled"
                type="text"
                label="Description"
                color="grey"
                placeholder={id ? dataEditBook.bookDesc : ""}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bookDesc}
                name="bookDesc"
                error={!!touched.bookDesc && !!errors.bookDesc}
                helperText={touched.bookDesc && errors.bookDesc}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Edit User" : "Add New Book"}
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
        {/* <Typography sx={{ color: colors.grey[200], mr: 2 }}>
               Image
            </Typography> */}
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
              backgroundColor: colors.blueAccent[600],
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
        {/* <Button
               disabled={image ? false : true}
               variant="contained"
               component="label"
               onClick={uploadImage}
               sx={{
                  backgroundColor: colors.greenAccent[600],
                  ml: 3,
                  "&:hover": {
                     backgroundColor: colors.greenAccent[700],
                     opacity: [0.9, 0.8, 0.7],
                  },
               }}
            >
               Upload
            </Button> */}
        {url && (
          // <p className="fs-5 ms-3 text-success">
          //    Uploaded Successfully
          // </p>
          <div className="fs-5 ms-3  text-success">
            Uploaded
            <CheckCircleIcon className="fs-5 ms-1  text-success" />
          </div>
        )}
      </Box>
    </Box>
  );
}
