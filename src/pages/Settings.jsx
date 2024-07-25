import { Container, Row, Col, Nav, Form, Button, Card } from "react-bootstrap";
import "./Settings/Settings.css";

const Settings = () => {
  return (
    <Container className="mt-4">
      <Row>
        <div className="row">
          <div className="col-3">
            <Col md={3} className="settingFixed">
              <h2 className="mb-4">
                <i className="bi bi-gear"></i>
              </h2>
              <Nav className="flex-column">
                <Nav.Link href="#general" className="settingHover rounded">
                  {" "}
                  <i
                    className="bi bi-bug-fill me-2"
                    style={{ color: "#001529" }}
                  ></i>
                  {""}General
                </Nav.Link>
                <Nav.Link href="#security" className="settingHover rounded">
                  <i
                    className="bi bi-bug-fill me-2"
                    style={{ color: "#001529" }}
                  ></i>
                  {""}Security
                </Nav.Link>
                <Nav.Link href="#privacy" className="settingHover rounded">
                  <i
                    className="bi bi-bug-fill me-2"
                    style={{ color: "#001529" }}
                  ></i>
                  {""}Privacy
                </Nav.Link>
                <Nav.Link
                  href="#notifications"
                  className="settingHover rounded"
                >
                  <i
                    className="bi bi-bug-fill me-2 "
                    style={{ color: "#001529" }}
                  ></i>
                  {""}Notifications
                </Nav.Link>
              </Nav>
            </Col>
          </div>
          <div className="col-9">
            <Col md={9} className="settingElement">
              <Card className="mb-4">
                <Card.Body id="general">
                  <Card.Title className="fw-bolder">
                    {" "}
                    General Settings
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="username">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" name="username" />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" name="email" />
                    </Form.Group>
                    <Form.Group controlId="language">
                      <Form.Label>Language:</Form.Label>
                      <Form.Control as="select" name="language">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Body id="security">
                  <Card.Title className="fw-bolder">
                    Security Settings
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="current-password">
                      <Form.Label>Current Password:</Form.Label>
                      <Form.Control type="password" name="current-password" />
                    </Form.Group>
                    <Form.Group controlId="new-password">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control type="password" name="new-password" />
                    </Form.Group>
                    <Form.Group controlId="confirm-password">
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control type="password" name="confirm-password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Change Password
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Body id="privacy">
                  <Card.Title className="fw-bolder">
                    Privacy Settings
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="profile-visibility">
                      <Form.Label>Profile Visibility:</Form.Label>
                      <Form.Control as="select" name="profile-visibility">
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="private">Private</option>
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mb-4">
                <Card.Body id="notifications">
                  <Card.Title className="fw-bolder">
                    Notification Settings
                  </Card.Title>
                  <Form>
                    <Form.Group controlId="email-notifications">
                      <Form.Check
                        type="checkbox"
                        label="Email Notifications"
                        name="email-notifications"
                      />
                    </Form.Group>
                    <Form.Group controlId="sms-notifications">
                      <Form.Check
                        type="checkbox"
                        label="SMS Notifications"
                        name="sms-notifications"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Settings;
