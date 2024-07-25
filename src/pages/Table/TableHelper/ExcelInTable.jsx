/* eslint-disable react/prop-types */
import { DownloadTableExcel } from "react-export-table-to-excel";

const ExcelInTable = ({ tableRef }) => {
  return (
    <>
      <div className="ms-2 shadow-lg">
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="btn " style={{ backgroundColor: "#884FDF" }}>
            {" "}
            <i className="bi bi-filetype-xlsx"></i>{" "}
          </button>
        </DownloadTableExcel>
      </div>
    </>
  );
};

export default ExcelInTable;
