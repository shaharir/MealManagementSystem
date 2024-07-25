/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Card, Spinner } from "react-bootstrap";
import {
  useDeletebazarMutation,
  useGetBazarQuery,
  useSingleBazarQuery,
} from "../../Redux/service/auth/bazarService";
import Table1 from "./../Table/Table1";
import { useMemo, useState } from "react";
import BazarModal from "./BazarModal";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
import convertDropdown from "./../../helper/convertDropdown";
import BazarSingleModal from "./BazarSingleModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DEFAULT_BORDER_VALUE = {
  bazarDate: "",
  border: "",
  totalPrice: "",
};

const Bazar = () => {
  const { data, isLoading, error } = useGetBazarQuery();
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_BORDER_VALUE);
  const [singleModal, setSingleModal] = useState(false);
  const [editBazarData, setEditBazarData] = useState(false);
  const [deleteBazar] = useDeletebazarMutation();
  const { borders } = useGetBorderQuery(undefined, {
    selectFromResult: ({ data }) => {
      const borders = convertDropdown(data);
      return { borders };
    },
  });
  const { data: singleBazar, isLoading: isSinglebazarloading } =
    useSingleBazarQuery({ id: singleModal });

  const toggle = () => {
    if (!modal) {
      setModal(modal);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
      setEditBazarData(false);
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
      setDefaultValues({
        ...row.original,
        bazarDate: dayjs(row.original.bazarDate).format("YYYY-MM-DD"),
      });

      setModal(true);
      setEditBazarData(row.original);
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
          deleteBazar({ id });
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
        Header: "BazarDate",
        accessor: "bazarDate",
        Cell: ({ value }) =>
          value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
        classes: "table-user",
      },
      {
        Header: "Border",
        accessor: "border",
        Cell: ({ value }) => borders?.[value]?.name || "n/a",

        classes: "table-user",
      },

      {
        Header: "Expense",
        accessor: "totalPrice",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        classes: "table-action",
        Cell: ActionColumn,
      },
    ],
    [borders] //dependency
  );

  if (isLoading || isSinglebazarloading) {
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
          <p>There was an error loading bazar data. Please try again later.</p>
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
        <h2 className="fw-bolder">Bazar</h2>
        <span>
          <strong>Include the details of the Bazar :</strong>{" "}
        </span>
        <button
          className=" rounded text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
          onClick={() => setModal(true)}
          style={{ backgroundColor: "#001529" }}
        >
          <i className="bi bi-bookmark-plus-fill"></i>
          Add bazar
        </button>
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
        <BazarModal
          modal={modal}
          toggle={toggle}
          defaultValues={defaultValues}
          editBazarData={editBazarData}
          setEditBazarData={setEditBazarData}
          setModal={setModal}
          setDefaultValues={setDefaultValues}
          DEFAULT_BORDER_VALUE={DEFAULT_BORDER_VALUE}
        />
      )}
      {singleModal && (
        <BazarSingleModal
          singleModal={singleModal}
          toggleSingle={toggleSingle}
          singleBazar={singleBazar}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default Bazar;
