/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Modal, Button, Form, Col, Row, Card, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateBazarMutation,
  useEditBazarMutation,
} from "../../Redux/service/auth/bazarService";
import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
import { useEffect } from "react";
import dayjs from "dayjs";
import { DEFAULT_BORDER_VALUE } from "./Bazar";
import { toast } from "react-toastify";

const BazarModal = ({
  modal,
  toggle,
  editBazarData,
  defaultValues,
  setModal,
  setDefaultValues,
  setEditBazarData,
}) => {
  const { data: borders } = useGetBorderQuery();
  const [createBazar, { isSuccess: isCreateSuccess, isLoading }] =
    useCreateBazarMutation();
  const [editBazar, { isSuccess: EditSuccess }] = useEditBazarMutation();

  const schemaResolver = yup.object().shape({
    bazarDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .required("Please enter the bazar date"),
    border: yup.string().required("Please select a border name"),

    totalPrice: yup
      .number()
      .typeError("Total price must be a number")
      .required("Please enter the total price"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (formData) => {
    if (!editBazarData) {
      createBazar({ postBody: formData });
      toast.success("successfully Created");
    } else {
      const postBody = {
        bazarDate: dayjs(formData.bazarDate).toISOString(),
        border: formData.border,
        totalPrice: formData.totalPrice,
      };

      editBazar({ postBody, id: formData._id });
      toast.success("successfully Updated");
    }
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (isCreateSuccess || EditSuccess) {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
      setEditBazarData(false);
    }
  }, [isCreateSuccess, EditSuccess]);

  return (
    <>
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
                      <Form.Label htmlFor="bazarDate" className="form-label">
                        Bazar Date
                      </Form.Label>
                      <Controller
                        name="bazarDate"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="date"
                              placeholder="Bazar Date"
                              className={`form-control ${
                                errors.bazarDate ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.bazarDate && (
                              <div className="invalid-feedback">
                                {errors.bazarDate.message}
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
                      <Form.Label htmlFor="totalPrice" className="form-label">
                        Total Price
                      </Form.Label>
                      <Controller
                        name="totalPrice"
                        control={control}
                        render={({ field }) => (
                          <div className="input-group">
                            <Form.Control
                              {...field}
                              type="number"
                              placeholder="Total Price"
                              className={`form-control ${
                                errors.totalPrice ? "is-invalid" : ""
                              }`}
                              autoComplete="off"
                            />
                            {errors.totalPrice && (
                              <div className="invalid-feedback">
                                {errors.totalPrice.message}
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

// BazarModal.propTypes = {
//   modal: PropTypes.bool,
//   toggle: PropTypes.func,
//   editBazar: PropTypes.func,
//   defaultValues: PropTypes.object,
//   editSuccess: PropTypes.bool,
//   // editBazarData: PropTypes.object,
//   setModal: PropTypes.bool,
// };
export default BazarModal;
