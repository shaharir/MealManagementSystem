/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Modal, Button, Form, Col, Row, Card, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import {
  useCreateBorderMutation,
  useEditborderMutation,
} from "../../Redux/service/auth/borderService";
import { DEFAULT_BORDER_VALUE } from "./Border";
import { toast } from "react-toastify";

const BorderModal = ({
  modal,
  toggle,
  defaultValues,
  editBorderData,
  setModal,
  setDefaultValues,
  setEditBorderData,
}) => {
  const [createData, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateBorderMutation();
  const [editBorder, { isSuccess: editsuccess }] = useEditborderMutation();

  const schemaResolver = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Please enter your email"),
    mobile: yup.string().required("Please enter your mobile number"),
    roomNumber: yup
      .string()
      .typeError("Room number must be a RoomNumber")
      .required("Please enter your Room number"),
    status: yup
      .string()
      .required("Please select status")
      .oneOf(["ACTIVE", "INACTIVE"], "Invalid status"),
  });

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schemaResolver),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    if (!editBorderData) {
      createData({ postBody: formData });
      toast.success("Create successfully");
    } else {
      const postBody = {
        name: formData?.name,
        mobile: formData?.mobile,
        email: formData?.email,
        roomNumber: formData?.roomNumber,
        status: formData?.status,
      };

      editBorder({ postBody, id: formData?._id });
      toast.success("Update successfully");
    }
  };

  useEffect(() => {
    if (isCreateSuccess || editsuccess) {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
      setEditBorderData(false);
    }
  }, [isCreateSuccess, editsuccess]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [JSON.stringify(defaultValues)]);

  return (
    <>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Add Border</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="my-4">
            <Card.Body>
              <Card.Title>Form</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="name"
                        className="form-label"
                      ></Form.Label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Name"
                              className={`form-control ${
                                errors.name ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="mobile"
                        className="form-label"
                      ></Form.Label>
                      <Controller
                        name="mobile"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="tel"
                              placeholder="Mobile Number"
                              className={`form-control ${
                                errors.mobile ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.mobile && (
                              <div className="invalid-feedback">
                                {errors.mobile.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="email"
                        className="form-label"
                      ></Form.Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="email"
                              placeholder="Email"
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="roomNumber"
                        className="form-label"
                      ></Form.Label>
                      <Controller
                        name="roomNumber"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="text"
                              placeholder="Room Number"
                              className={`form-control ${
                                errors.roomNumber ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.roomNumber && (
                              <div className="invalid-feedback">
                                {errors.roomNumber.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label
                    htmlFor="status"
                    className="form-label"
                  ></Form.Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <div className="input-group">
                        <Form.Select
                          {...field}
                          className={`form-control ${
                            errors.status ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select status</option>
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option>
                        </Form.Select>
                        {errors.status && (
                          <div className="invalid-feedback">
                            {errors.status.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </Form.Group>

                <Button type="submit" className="btn btn-primary w-100">
                  Submit
                  {isLoading && (
                    <Spinner animation="border" size="sm" className="ms-2" />
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BorderModal;
