// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */
// import { useMemo, useState } from "react";
// import {
//   useDeleteSummaryMutation,
//   useGetsummaryQuery,
// } from "../../Redux/service/auth/summaryService";
// import Table1 from "../Table/Table1";
// import { useGetBorderQuery } from "../../Redux/service/auth/borderService";
// import convertDropdown from "../../helper/convertDropdown";
// import Summarymodal from "./Summarymodal";
// import { Card } from "react-bootstrap";

// const Summary = () => {
//   const [modal, setModal] = useState(false);
//   const { data: summaryData } = useGetsummaryQuery();
//   console.log(summaryData)
//   const [deleteSumary] = useDeleteSummaryMutation();
//   const { borders } = useGetBorderQuery(undefined, {
//     selectFromResult: ({ data }) => {
//       const borders = convertDropdown(data);
//       return { borders };
//     },
//   });
//   const toggle = () => {
//     setModal(!modal);
//   };

//   const ActionColumn = ({ row }) => {
//     const remove = (id) => {
//       deleteSumary(id);
//     };
//     return (
//       <>
//         <span role="button" className="text-primary mx-2">
//           <i className="bi bi-pencil-square"></i>
//         </span>
//         <span
//           role="button"
//           className="text-warning mx-2"
//           onClick={() => remove(row?.original?._id)}
//         >
//           <i className="bi bi-trash"></i>
//         </span>
//         <span role="button" className="text-primary mx-2">
//           <i className="bi bi-card-checklist"></i>
//         </span>
//       </>
//     );
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "SL",
//         accessor: "sl",
//         Cell: ({ row }) => row.index + 1,
//         classes: "table-user",
//       },

//       {
//         Header: "Border",
//         accessor: "border",
//         Cell: ({ value }) => borders?.[value]?.name || "n/a",
//         // Cell: ({ value }) => value || "n/a",
//         classes: "table-user",
//       },
//       {
//         Header: "DepositAmount",
//         accessor: "depositAmount",
//         Cell: ({ value }) => value || "n/a",
//         classes: "table-user",
//       },
//       {
//         Header: "SummaryAmount",
//         accessor: "summaryAmount",
//         // Cell: ({ value }) =>
//         //   value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
//         Cell: ({ value }) => value || "n/a",
//         classes: "table-user",
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         classes: "table-action",
//         Cell: ActionColumn,
//       },
//     ],
//     [borders]
//   );
//   return (
//     <>
//       <h3 className="fw-bolder"> Summary</h3>
//       <div className="card shadow">
//         <div className="card-body text-muted">
//           <p className="text-muted">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
//             optio adipisci eveniet? Laborum ipsam molestiae laudantium enim
//             inventore dolorem ab?
//           </p>
//         </div>
//       </div>

//       <div className="m-2">
//         <span>
//           <strong>Include and Revise the Summary :</strong>{" "}
//         </span>
//         <button
//           className="rounded text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
//           onClick={() => setModal(true)}
//           style={{ backgroundColor: "#001529" }}
//         >
//           <i className="bi bi-bookmark-plus-fill"></i>
//           Add Summary
//         </button>
//       </div>
//       <div className="card shadow-lg">
//         <div className="card-body">
//           <div className="mt-3">
//             <Card.Body>
//               <Table1 columns={columns} data={summaryData || []} />
//             </Card.Body>
//           </div>
//         </div>
//       </div>

//       {modal && <Summarymodal modal={modal} toggle={toggle} />}
//     </>
//   );
// };

// export default Summary;

import { useState } from "react";
import { useGetsummaryQuery } from "../../Redux/service/auth/summaryService";
import "./Summary.css";
const Summary = () => {
  const { data: summaryData } = useGetsummaryQuery();
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const handelCheckBox = (e, columnKey) => {
    const { checked } = e.target;

    setHiddenColumns((HideColamns) => {
      console.log(HideColamns);
      if (checked) {
        return [...HideColamns, columnKey];
      } else {
        return HideColamns.filter((key) => key !== columnKey);
      }
    });
  };

  const columns = [
    { key: "border", label: "Border" },
    { key: "depositAmount", label: "Deposit Amount" },
    { key: "summaryAmount", label: "Summary Amount" },
  ];

  return (
    <>
      <div className="container my-3">
        <div className="mb-3 d-flex">
          {columns.map((column) => (
            <div
              key={column.key}
              className="list-group-item d-flex align-items-center"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={column.key}
                onChange={(e) => handelCheckBox(e, column.key)}
              />
              <label className="form-check-label mt-1 px-2 fw-bolder">
                {column.label}
              </label>
            </div>
          ))}
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="table-responsive card shadow ">
              <table className="table table-hover table-bordered custom-table card-body">
                <thead className="thead-dark">
                  <tr>
                    {!hiddenColumns.includes("border") && (
                      <th scope="col">Border</th>
                    )}
                    {!hiddenColumns.includes("depositAmount") && (
                      <th scope="col">Deposit Amount</th>
                    )}
                    {!hiddenColumns.includes("summaryAmount") && (
                      <th scope="col">Summary Amount</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {summaryData?.map((item, index) => (
                    <tr key={index}>
                      {!hiddenColumns.includes("border") && (
                        <td className="align-middle">{item.border}</td>
                      )}
                      {!hiddenColumns.includes("depositAmount") && (
                        <td className="align-middle">{item.depositAmount}</td>
                      )}
                      {!hiddenColumns.includes("summaryAmount") && (
                        <td className="align-middle">{item.summaryAmount}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
