/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
import { useCreateSummaryMutation } from "../../Redux/service/auth/summaryService";

const Summarymodal = ({ modal, toggle }) => {
  const { data: borders } = useGetBorderQuery();
  const [createSummary] = useCreateSummaryMutation();

  const schemaResolver = yup.object().shape({
    depositAmount: yup.number().required("Please enter the Amount"),
    border: yup.string().required("Please enter the border"),

    summaryAmount: yup
      .number()
      .typeError("Total price must be a number")
      .required("Please enter the total price"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    createSummary({ postBody: formData });
  };

  return (
    <Modal show={modal} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Bazar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="my-4">
          <Card.Body>
            <Card.Title>Form</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="depositAmount" className="form-label">
                      Deposit Amount
                    </Form.Label>
                    <Controller
                      name="depositAmount"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="number"
                            placeholder="Bazar Date"
                            className={`form-control ${
                              errors.depositAmount ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.depositAmount && (
                            <div className="invalid-feedback">
                              {errors.depositAmount.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="border" className="form-label">
                      Border
                    </Form.Label>
                    <Controller
                      name="border"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Select
                            {...field}
                            className={`form-control ${
                              errors.border ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">Select border</option>
                            {borders &&
                              borders.map((border) => (
                                <option
                                  selected={border._id === field.value}
                                  key={border._id}
                                  value={border._id}
                                >
                                  {border.name}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.border && (
                            <div className="invalid-feedback">
                              {errors.border.message}
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
                    <Form.Label htmlFor="summaryAmount" className="form-label">
                      Summary Amount
                    </Form.Label>
                    <Controller
                      name="summaryAmount"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="number"
                            placeholder="Total Price"
                            className={`form-control ${
                              errors.summaryAmount ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.summaryAmount && (
                            <div className="invalid-feedback">
                              {errors.summaryAmount.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" className="btn btn-primary w-100">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
export default Summarymodal;
