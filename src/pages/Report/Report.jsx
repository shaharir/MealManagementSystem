/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useMemo } from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
// import Table1 from "../Table/Table1";
// import Reports from "./Reports";

import { Button, Card, CardBody, Col, Form, Row } from "react-bootstrap";

const Report = () => {
  // const { data } = useGetBorderQuery();
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Name",
  //       accessor: "name",
  //       Cell: ({ value }) => value || "n/a",
  //       classes: "table-user",
  //     },

  //     {
  //       Header: "Room Number",
  //       accessor: "roomNumber",
  //       Cell: ({ value }) => value || "n/a",
  //       classes: "table-user",
  //     },
  //     {
  //       Header: "Mobile",
  //       accessor: "mobile",
  //       Cell: ({ value }) => value || "n/a",
  //       classes: "table-user",
  //     },
  //     {
  //       Header: "Deposit Amount",
  //       accessor: "depositAmount",
  //       Cell: ({ value }) => value || "n/a",
  //       classes: "table-user",
  //     },
  //     {
  //       Header: "Meal Rate",
  //       accessor: "mealRate",
  //       Cell: ({ value }) => value || "n/a",
  //       classes: "table-user",
  //     },
  //   ],
  //   [data]
  // );
  return (
    <>
      {/* <Reports />
      <Container className="mt-3">
        <Row>
          <Col>
            <Card>
              <Card.Body
                className=" shadow-lg card"
                style={{ backgroundColor: "#4F5562 " }}
              >
                <h2 className="text-white">Data Table</h2>
                <Table1 columns={columns} data={data || []} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
      <Row>
        <Col xs={12} id="main">
          <h2 className="mb-4 fw-bolder">Feedback</h2>
          <Card>
            <CardBody>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label className="fw-bolder">Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label className="fw-bolder">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formFeedback">
                  <Form.Label className="fw-bolder">Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your feedback"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Report;
