/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

const DepositSingleModal = ({ singleModal, toggleSingle, singleDeposit }) => {
  console.log(singleDeposit)
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
                <strong>border:</strong>
              </p>
              <p>
                <strong>depositAmount:</strong>
              </p>
              <p>
                <strong>dipositDate :</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p>{singleDeposit?.border}</p>
              <p>{singleDeposit?.depositAmount}</p>
              <p>{singleDeposit?.dipositDate}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DepositSingleModal;
