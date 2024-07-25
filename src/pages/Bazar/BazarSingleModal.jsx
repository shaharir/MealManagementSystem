/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { Modal } from "react-bootstrap";
import { useGetBorderQuery } from "../../Redux/service/auth/borderService";

const BazarSingleModal = ({ singleModal, toggleSingle, singleBazar }) => {
  const { data: borders } = useGetBorderQuery();
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
                <strong>bazarDate:</strong>
              </p>
              <p>
                <strong>border :</strong>
              </p>
              <p>
                <strong>totalPrice :</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p>
                {singleBazar &&
                  dayjs(singleBazar.bazarDate).format("DD-MM-YYYY")}
              </p>
              {/* <p>{borders.find((item)=>item._id===border)?.name || "n/a"}</p> */}
              <p>
                {(
                  borders.find(
                    (item) => item._id === (singleBazar && singleBazar.border)
                  ) || {}
                ).name || "n/a"}
              </p>
              <p>{singleBazar?.totalPrice}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BazarSingleModal;
