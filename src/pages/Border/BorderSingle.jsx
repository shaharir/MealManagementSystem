/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

const BorderSingle = ({ singleModal, toggleSingle, singleData }) => {
  return (
    <Modal show={singleModal} onHide={toggleSingle}>
      <Modal.Header closeButton>
        <Modal.Title>Border Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Name:</strong>
              </p>
              <p>
                <strong>Email:</strong>
              </p>
              <p>
                <strong>Room No.:</strong>
              </p>
              <p>
                <strong>Mobile :</strong>
              </p>
              <p>
                <strong>Deposite :</strong>
              </p>
              <p>
                <strong>MealRate :</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p>{singleData?.name}</p>
              <p>{singleData?.email}</p>
              <p>{singleData?.roomNumber}</p>
              <p>{singleData?.mobile}</p>
              <p>{singleData?.depositAmount}</p>
              <p>{singleData?.mealRate}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BorderSingle;
