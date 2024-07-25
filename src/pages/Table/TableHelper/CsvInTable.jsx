/* eslint-disable react/prop-types */
import { CSVLink } from "react-csv";
const CsvInTable = ({ csvData }) => {
  return (
    <>
      <div className="shadow-lg">
        <CSVLink className="btn btn-danger" filename="table.csv" data={csvData}>
          <i className="bi bi-filetype-csv"></i>
        </CSVLink>
      </div>
    </>
  );
};

export default CsvInTable;
