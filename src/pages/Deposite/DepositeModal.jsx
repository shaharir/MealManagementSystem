/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
import {
  useCreateDepositMutation,
  useEditDepositMutation,
} from "../../Redux/service/auth/depositService";
import dayjs from "dayjs";

const DepositeModal = ({
  modal,
  toggle,
  defaultValues,
  editDepositData,
  setModal,
}) => {
  const { data: borders } = useGetBorderQuery();
  const [createDeposit, { isSuccess, isLoading }] = useCreateDepositMutation();
  const [editDeposit] = useEditDepositMutation();
  const schemaResolver = yup.object().shape({
    border: yup.string().required("Please enter the border"),

    depositAmount: yup
      .number()
      .typeError("Total price must be a number")
      .required("Please enter the total price"),
    // dipositDate: yup.date().required("Please enter the bazar date"),
    dipositDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required("Please enter the bazar date"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onSubmit = (formData) => {
    if (!editDepositData) {
      createDeposit({ postBody: formData });
    } else {
      const postBody = {
        dipositDate: dayjs(formData.dipositDate).toISOString(),
        border: formData.border,
        depositAmount: formData.depositAmount,
      };

      editDeposit({ postBody, id: formData._id });
    }
  };
  if (isSuccess) {
    setModal(false);
  }

  return (
    <>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="my-4">
            <Card.Body>
              <Card.Title>Form</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row>
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="depositAmount"
                        className="form-label"
                      >
                        DepositAmount
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
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="dipositDate" className="form-label">
                        Diposit Date
                      </Form.Label>
                      <Controller
                        name="dipositDate"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="date"
                              placeholder="Total Price"
                              className={`form-control ${
                                errors.dipositDate ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.dipositDate && (
                              <div className="invalid-feedback">
                                {errors.dipositDate.message}
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="btn btn-primary w-100">
                  Submit {isLoading && <Spinner animation="border" size="sm" />}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DepositeModal;
