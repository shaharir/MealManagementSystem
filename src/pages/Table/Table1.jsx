/* eslint-disable react/prop-types */

import { useTable, usePagination, useGlobalFilter } from "react-table";
import "./Table1.css";

import { useMemo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import GlobalSearch from "./TableHelper/GlobalSearch";
import CsvInTable from "./TableHelper/CsvInTable";
import PrinterInTable from "./TableHelper/PrinterInTable";
import ExcelInTable from "./TableHelper/ExcelInTable";
import PagenitionTable from "./TableHelper/PagenitionTable";
import CheckBoxInTable from "./TableHelper/CheckBox";

const Table1 = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    setGlobalFilter,
    getToggleHideAllColumnsProps,
    state,
    prepareRow,
    allColumns,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);
  const { pageIndex, pageSize, filter } = state;

  const csvData = useMemo(
    () =>
      data.map((row) =>
        columns.map((column) => {
          const cellValue = row[column.accessor];
          return cellValue;
        })
      ),
    [columns, data]
  );

  const tableRef = useRef();
  const generatePdf = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "table",
  });

  return (
    <>
      <div>
        <GlobalSearch setGlobalFilter={setGlobalFilter} filter={filter} />
      </div>
      <div>
        <CheckBoxInTable
          allColumns={allColumns}
          getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        />
      </div>
      <div className="d-flex justify-content-end mb-4 mx-4">
        <CsvInTable csvData={csvData} />
        <PrinterInTable generatePdf={generatePdf} />
        <ExcelInTable tableRef={tableRef} />
      </div>

      <div className="table-container">
        <div ref={tableRef}>
          <table {...getTableProps()} className="custom-table">
            <thead className="custom-table-header">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      key={column.id}
                      className={column.classes}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="custom-table-body ">
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={cellIndex}
                        style={{ textAlign: "center" }}
                        className={
                          cellIndex % 2 === 0
                            ? "custom-table-cell-even"
                            : "custom-table-cell-odd"
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-5 ">
        <div className="px-5 d-flex">
          <span>
            <div className="page-indicator">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
          </span>
          <div className="mx-5 ">
            <span className="">
              <i className="bi bi-calculator "></i>
            </span>

            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="custom-select"
            >
              {[10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>

        <PagenitionTable
          nextPage={nextPage}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
        />
      </div>
    </>
  );
};

export default Table1;

// import { useEffect, useState } from "react";
// import { useTable } from "react-table";

// const Table1 = ({ columns, data }) => {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     allColumns,
//   } = useTable({
//     columns,
//     data,
//   });
//   // console.log(data);
//   const handleCheckboxChange = (columnId) => {
//     setSelectedRows(columnId);
//   };
//   // const filterRows = columns.filter((item) => item.accessor === selectedRows);
//   // console.log(filterRows);
//   // useEffect(() => {
//   //   if (filterRows) {
//   //     return;
//   //   }
//   // }, [filterRows]);

//   return (
//     <>
//       <div className="mb-3">
//         {allColumns?.map((column) => (
//           <div
//             key={column.id}
//             className="list-group-item d-flex align-items-center"
//           >
//             <input
//               className="form-check-input"
//               type="checkbox"
//               value={column.id}
//               onChange={() => handleCheckboxChange(column.id)}
//             />
//             <label className="form-check-label mt-1 px-2 fw-bolder">
//               {column.Header}
//             </label>
//           </div>
//         ))}
//       </div>

//       <div className="table-container">
//         <table {...getTableProps()} className="custom-table">
//           <thead className="custom-table-header">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps()}
//                     key={column.id}
//                     className={column.classes}
//                   >
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>{" "}
//           <tbody {...getTableBodyProps()} className="custom-table-body ">
//             {" "}
//             {rows.map((row, rowIndex) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={rowIndex}>
//                   {row.cells.map((cell, cellIndex) => (
//                     <td
//                       {...cell.getCellProps()}
//                       key={cellIndex}
//                       style={{ textAlign: "center" }}
//                       className={
//                         cellIndex % 2 === 0
//                           ? "custom-table-cell-even"
//                           : "custom-table-cell-odd"
//                       }
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Table1;
