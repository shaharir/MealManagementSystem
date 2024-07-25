/* eslint-disable react-refresh/only-export-components */
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../../Redux/service/auth/authService";

export const DEFAULT_REGISTER_VALUES = {
  name: "",
  email: "",
  mobile: "",
  month: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [register, { isSuccess, isLoading }] = useRegisterMutation();

  const schemaResolver = yup
    .object()
    .shape({
      name: yup.string().required("Please enter your name"),
      email: yup
        .string()
        .email("Invalid email")
        .required("Please enter your email"),
      mobile: yup
        .string()
        .required("Please enter your mobile number")
        .matches(/^\d{11}$/, "Mobile number must be 11 digits"),
      month: yup.string().required("Date is required"),
      password: yup
        .string()
        .required("Please enter a password")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/,
          "Password must contain at least 1 letter and 1 number"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_REGISTER_VALUES,
    resolver: yupResolver(schemaResolver),
    mode: "all",
  });

  console.log("errors", errors);

  const onSubmit = (formData) => {
    const postBody = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      month: formData.month,
      password: formData.password,
    };
    register(postBody);
  };

  if (isSuccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border p-5 rounded shadow-lg text-white "
        style={{ maxWidth: "400px", backgroundColor: "#001529 " }}
      >
        <h3 className="text-center pb-3 fw-bolder">Register Page</h3>
        <Row className="">
          <Form id="registerForm" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Form.Group as={Col} controlId="name" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Name"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="email" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="email"
                        placeholder="Email"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="mobile" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Mobile number"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="month" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="month"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="date"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="password" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="password"
                        placeholder="Password"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="confirmPassword" className="px-3">
                <Form.Label></Form.Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Form.Control
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        isInvalid={!!error}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {error && error.message}
                      </Form.Control.Feedback>
                    </>
                  )}
                />
              </Form.Group>
            </Row>

            <div className="mt-3 d-flex justify-content-center">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                style={{ backgroundColor: "#4184D0" }}
              >
                Register{" "}
                {isLoading && (
                  <Spinner animation="border" size="sm" className="ms-2" />
                )}
              </Button>
            </div>
          </Form>
        </Row>

        <p className="text-center mt-3">
          Have an Account?{" "}
          <Link
            className="text-decoration-none"
            to="/login"
            style={{ color: "#4184D0" }}
          >
            Login Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
