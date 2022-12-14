import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authorActions } from "../../../store/client/reducers/authorSlice";

export default function AuthorForm({ active, handlePay }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addAuthor } = authorActions;
  const onSubmit = (data) => {
    // let datan = JSON.stringify(data);
    dispatch(addAuthor(data));
    dispatch(handlePay);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="fname">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="fristName"
              placeholder="Frist Name"
              {...register("firstName", {
                required: "Frist Name is required",
                minLength: {
                  value: 3,
                  message: "Frist Name need to be more than 3",
                },
                maxLength: {
                  value: 20,
                  message: "Frist Name need to be less than 20",
                },
                pattern: {
                  value: /[A-Za-z]/,
                  message: "Frist Name must be Alpa",
                },
              })}
            />
            {errors.firstName && (
              <Form.Label className="text-danger">
                {errors.firstName?.message}
              </Form.Label>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="lname">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is required",
                minLength: {
                  value: 3,
                  message: "Last Name need to be more than 3",
                },
                maxLength: {
                  value: 20,
                  message: "Last Name need to be less than 20",
                },
                pattern: {
                  value: /[A-Za-z]/,
                  message: "Last Name must be Alpa",
                },
              })}
            />
            {errors.lastName && (
              <Form.Label className="text-danger">
                {errors.lastName?.message}
              </Form.Label>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="authorEmail">
            <Form.Label>Twitter Account:</Form.Label>
            <Form.Control
              type="text"
              name="authorEmail"
              placeholder="Enter email"
              {...register("authorEmail", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.authorEmail && (
              <Form.Label className="text-danger">
                {errors.authorEmail?.message}
              </Form.Label>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number :</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "Phone Number is required",
                minLength: {
                  value: 8,
                  message: "Phone Number Must be more than 8",
                },
                maxLength: {
                  value: 20,
                  message: "Phone Number Must be more than 20",
                },
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
                  message: "Please enter a valid Phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <Form.Label className="text-danger">
                {errors.phoneNumber?.message}
              </Form.Label>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="bookTypeCheck">
            <Form.Label>Book Formats you can deliver :</Form.Label>
            <Form.Check
              name="pdf"
              {...register("bookDocType", { required: true })}
              type="checkbox"
              label="PDF"
              value="pdf"
            />
            <Form.Check
              name="kindle"
              {...register("bookDocType", { required: true })}
              type="checkbox"
              label="Kindle"
              value="kindle"
            />
            <Form.Check
              name="epud"
              {...register("bookDocType", { required: true })}
              type="checkbox"
              label="EPUD"
              value="epud"
            />
            <Form.Check
              name="other"
              {...register("bookDocType", { required: true })}
              type="checkbox"
              label="Other"
              value="other"
            />
            {errors.bookDocType && (
              <Form.Label className="text-danger">
                You Need to check at least one
              </Form.Label>
            )}
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="bookRadio">
            <Form.Label>How Many Books Would You Like To Offer?</Form.Label>
            <Form.Check
              type="radio"
              name="one"
              {...register("booksnumber", { required: true })}
              label="One"
              value="One"
            />
            <Form.Check
              type="radio"
              name="two"
              {...register("booksnumber", { required: true })}
              label="Two"
              value="Two"
            />
            {errors.booksnumber && (
              <Form.Label className="text-danger mt-5">
                You Need To Select Number of Books
              </Form.Label>
            )}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Any notes to be tacken into consideration :</Form.Label>
          <Form.Control
            {...register("comment")}
            type="textarea"
            name="comment"
            placeholder="Comments"
          />
        </Form.Group>
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
