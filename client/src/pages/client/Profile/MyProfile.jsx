import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   getUser,
   updateUser,
} from "../../../store/client/reducers/userDataSlice";
import "./Profile.css";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function MyProfile() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const userState = useSelector((state) => state.userState);
   const { user } = useSelector((state) => state.userData);
   // const [userData, setUserData] = useState({
   //   name: "",
   //   email: "",
   //   phone: "",
   // });
   const { email } = user;
   const id = userState?.user?._id;
   const dispatch = useDispatch();
   // const inputHandler = (e) => {
   //   // console.log(e.target.name, ":", e.target.value);
   //   setUserData({ ...user, [e.target.name]: e.target.value });
   // };

   const onSubmit = (data) => {
      console.log(data);
      // dispatch(updateUser({ email, data }));
   };

   useEffect(() => {
      dispatch(getUser(id));
   }, [dispatch]);
   return (
      <div className="profile">
         <div className="container-xl   rounded">
            {!user.confirmed && (
               <h5 className="text-center text-danger text-capitalize">
                  please confirm your email
               </h5>
            )}
            <div className="row ">
               <div className="col-md-12">
                  <div className="card mb-4">
                     <div className="card-header">Account Details</div>
                     <div className="card-body">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                           <div className="mb-3">
                              <Form.Label
                                 className="small mb-1"
                                 for="inputUsername"
                              >
                                 Username
                              </Form.Label>
                              <Form.Control
                                 className="form-control"
                                 id="name"
                                 type="text"
                                 name="name"
                                 {...register("name", {
                                    required: "User Name is required",
                                    minLength: {
                                       value: 3,
                                       message:
                                          "User Name need to be more than 3",
                                    },
                                    maxLength: {
                                       value: 20,
                                       message:
                                          "User Name need to be less than 20",
                                    },
                                    pattern: {
                                       value: /[A-Za-z]/,
                                       message: "User Name must be Alpa",
                                    },
                                 })}
                                 placeholder={user.name ? user?.name : ""}
                              />
                              {errors.name && (
                                 <Form.Label className="text-danger">
                                    {errors.name?.message}
                                 </Form.Label>
                              )}
                           </div>

                           {/* <div className="row gx-3 mb-3"> */}
                           {/* <div className="col-md-6">
                      <Form.Label  className="small mb-1" for="inputFirstName">
                        First name
                      </Form.Label >
                      <Form.Control
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-md-6">
                      <Form.Label  className="small mb-1" for="inputLastName">
                        Last name
                      </Form.Label >
                      <Form.Control
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div> */}
                           {/* </div> */}

                           {/* <div className="col-md-12">
                              <Form.Label  className="small mb-1" for="inputLocation">
                                 Location
                              </Form.Label >
                              <Form.Control
                                 className="form-control"
                                 id="inputLocation"
                                 type="text"
                                 placeholder="Enter your location"
                              />
                           </div> */}

                           <div className="mb-3">
                              <Form.Label
                                 className="small mb-1"
                                 for="inputEmailAddress"
                              >
                                 Email Address
                              </Form.Label>
                              <Form.Control
                                 className="form-control"
                                 id="inputEmailAddress"
                                 type="email"
                                 name="email"
                                 {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                       value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: "Please enter a valid email",
                                    },
                                 })}
                                 //  value={user.email}
                                 placeholder={user.email ? user?.email : ""}
                              />
                              {errors.email && (
                                 <Form.Label className="text-danger">
                                    {errors.email?.message}
                                 </Form.Label>
                              )}
                           </div>

                           <div className="row gx-3 mb-3">
                              <div className="col-md-6">
                                 <Form.Label
                                    className="small mb-1"
                                    for="inputPhone"
                                 >
                                    Phone number
                                 </Form.Label>
                                 <Form.Control
                                    className="form-control"
                                    id="inputPhone"
                                    type="tel"
                                    name="phone"
                                    {...register("phone", {
                                       required: "Phone Number is required",
                                       minLength: {
                                          value: 8,
                                          message:
                                             "Phone Number Must be more than 8",
                                       },
                                       maxLength: {
                                          value: 20,
                                          message:
                                             "Phone Number Must be more than 20",
                                       },
                                       pattern: {
                                          value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
                                          message:
                                             "Please enter a valid Phone number",
                                       },
                                    })}
                                    // value={user.phone}
                                    placeholder={user.phone ? user?.phone : ""}
                                 />
                                 {errors.phone && (
                                    <Form.Label className="text-danger">
                                       {errors.phone?.message}
                                    </Form.Label>
                                 )}
                              </div>

                              {/* <div className="col-md-6">
                                 <Form.Label 
                                    className="small mb-1"
                                    for="inputBirthday"
                                 >
                                    Birthday
                                 </Form.Label >
                                 <Form.Control
                                    className="form-control"
                                    id="inputBirthday"
                                    type="text"
                                    name="birthday"
                                    placeholder="Enter your birthday"
                                 />
                              </div> */}
                           </div>

                           <Button type="submit" className="btn btn-warning">
                              Save changes
                           </Button>
                        </Form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
