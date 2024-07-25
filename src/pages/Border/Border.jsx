/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import Table1 from "./../Table/Table1";
import {
  useDeleteborderMutation,
  useGetBorderQuery,
  useSingleBorderQuery,
} from "../../Redux/service/auth/borderService";
import BorderModal from "./BordarModal";
import Swal from "sweetalert2";
import BorderSingle from "./BorderSingle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DEFAULT_BORDER_VALUE = {
  name: "",
  mobile: "",
  email: "",
  roomNumber: "",
  status: "",
};

const Border = () => {
  const { data, error, isLoading } = useGetBorderQuery();
  const [modal, setModal] = useState(false);
  const [singleModal, setSingleModal] = useState(false);
  const [editBorderData, setEditBorderData] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_BORDER_VALUE);

  const {
    data: singleData,
    error: singleBorderError,
    isLoading: isSingleBorderLoading,
  } = useSingleBorderQuery({
    id: singleModal,
  });
  const [
    deleteData,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
    },
  ] = useDeleteborderMutation();

  const toggle = () => {
    if (!modal) {
      setModal(modal);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
      setEditBorderData(false);
    }
  };
  const toggleSingle = () => {
    if (!singleModal) {
      setSingleModal(singleModal);
    } else {
      setSingleModal(false);
    }
  };

  const ActionColumn = ({ row }) => {
    const edit = () => {
      setDefaultValues(row.original);
      setModal(true);

      setEditBorderData(row.original);
    };
    const remove = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData({ id });
          toast.warn("Delete successfully");
        }
      });
    };

    return (
      <>
        <span role="button" className="text-primary mx-2" onClick={edit}>
          <i className="bi bi-pencil-square"></i>
        </span>
        <span
          role="button"
          className="text-warning mx-2"
          onClick={() => remove(row?.original?._id)}
        >
          <i className="bi bi-trash"></i>
        </span>
        <span
          role="button"
          className="text-primary mx-2"
          onClick={() => setSingleModal(row.original._id)}
        >
          <i className="bi bi-card-checklist"></i>
        </span>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "SL",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1,
        classes: "table-user",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => value || "n/a",
        //   (
        //   <span className={value ? "text-primary" : ""}>{value || "n/a"}</span>
        // ),
        classes: "table-user",
      },

      {
        Header: "RoomNumber",
        accessor: "roomNumber",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ value }) => (
          <span className={value ? "text-black" : ""}>{value || "n/a"}</span>
        ),
        classes: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        classes: "table-action",
        Cell: ActionColumn,
      },
    ],
    [data]
  );

  if (isLoading || isSingleBorderLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center fade-in"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>There was an error loading border data. Please try again later.</p>
          <hr />
          <p className="mb-0">
            If the problem persists, contact:{" "}
            <span className="text-primary">
              <a href="https://mail.google.com/" target="_blank">
                shahriar.cse@gmail.com
              </a>
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 mb-5">
        {" "}
        <h2 className="fw-bolder">Border</h2>
        <div className="mt-3">
          {" "}
          <span>
            <strong>
              Incorporate both the border and its related details :
            </strong>{" "}
          </span>
          <button
            className="rounded text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
            onClick={() => setModal(true)}
            style={{ backgroundColor: "#001529" }}
          >
            <i className="bi bi-bookmark-plus-fill"></i>
            Add Border
          </button>
        </div>
      </div>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mx-2 mt-3 border-none">
            <Card.Body>
              <Table1 columns={columns} data={data || []} />
            </Card.Body>
          </div>
        </div>
      </div>

      {modal && (
        <BorderModal
          modal={modal}
          toggle={toggle}
          defaultValues={defaultValues}
          editBorderData={editBorderData}
          setModal={setModal}
          setDefaultValues={setDefaultValues}
          setEditBorderData={setEditBorderData}
        />
      )}

      {singleModal && (
        <BorderSingle
          singleModal={singleModal}
          toggleSingle={toggleSingle}
          singleData={singleData}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Border;
