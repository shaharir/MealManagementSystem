/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import Table1 from "../Table/Table1";
import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
import DepositeModal from "./DepositeModal";
import {
  useDeleteDepositMutation,
  useGetDepositeQuery,
  useSingleDepositQuery,
} from "../../Redux/service/auth/depositService";
import dayjs from "dayjs";
import DepositSingleModal from "./DepositSingleModal";
import { Card, Spinner } from "react-bootstrap";
const DEFAULT_BORDER_VALUE = { dipositDate: "", border: "", depositAmount: "" };
const Deposite = () => {
  const { data: depositeData, isLoading, error } = useGetDepositeQuery();
  const [modal, setModal] = useState(false);
  const [singleModal, setSingleModal] = useState(false);
  const [editDepositData, setEditDepositData] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_BORDER_VALUE);
  const [removeDeposit] = useDeleteDepositMutation();
  const { data: singleDeposit, isLoading: isSingleBorderLoading } =
    useSingleDepositQuery({ id: singleModal });
  const { data: borderData } = useGetBorderQuery();

  const toggle = () => {
    if (!modal) {
      setModal(modal);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_BORDER_VALUE);
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
        dipositDate: dayjs(row.original.bazarDate).format("YYYY-MM-DD"),
      });

      setModal(true);
      setEditDepositData(row.original);
    };
    const remove = (id) => {
      removeDeposit(id);
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
        Header: "Border",
        accessor: "border",
        Cell: ({ value }) => {
          if (borderData && borderData.length > 0) {
            const borderItem = borderData.find((item) => item._id === value);
            if (borderItem) {
              return borderItem.name;
            } else {
              return "n/a";
            }
          } else {
            return "n/a";
          }
        },
        // borderData.find((item) => item._id === value)?.name || "n/a",
        // Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "DepositAmount",
        accessor: "depositAmount",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "DepositDate",
        accessor: "dipositDate",
        Cell: ({ value }) =>
          value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
        // Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        classes: "table-action",
        Cell: ActionColumn,
      },
    ],
    [borderData]
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
          <p>
            There was an error loading deposit data. Please try again later.
          </p>
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
        <h2 className="fw-bolder">Deposit</h2>{" "}
        <span>
          <strong>Incorporate the deposit amount :</strong>{" "}
        </span>
        <button
          className="rounded text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
          onClick={() => setModal(true)}
          style={{ backgroundColor: "#001529" }}
        >
          <i className="bi bi-bookmark-plus-fill"></i>
          Deposit Amount
        </button>
      </div>
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mt-3">
            <Card.Body>
              <Table1 columns={columns} data={depositeData || []} />
            </Card.Body>
          </div>
        </div>
      </div>

      {modal && (
        <DepositeModal
          modal={modal}
          toggle={toggle}
          editDepositData={editDepositData}
          defaultValues={defaultValues}
          setModal={setModal}
        />
      )}
      {singleModal && (
        <DepositSingleModal
          singleModal={singleModal}
          toggleSingle={toggleSingle}
          singleDeposit={singleDeposit}
        />
      )}
    </>
  );
};

export default Deposite;
