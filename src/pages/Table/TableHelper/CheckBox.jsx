/* eslint-disable react/prop-types */

import { Checkbox } from "antd";
const CheckBoxInTable = ({ allColumns, getToggleHideAllColumnsProps }) => {
  return (
    <>
      <div className="d-flex gap-2 text-align-start mx-3 mt-1 px-2">
        <Checkbox {...getToggleHideAllColumnsProps()} />
        <span className="fs-5 mt-2 me-3 ">
          <i className="bi bi-check2-circle fw-bold"></i>
        </span>
        {allColumns.map((column) => (
          <div
            key={column.id}
            className="list-group-item d-flex align-items-center"
          >
            <Checkbox
              {...column.getToggleHiddenProps()}
              className="form-check-input mr-2"
            />
            <label className="form-check-label mt-1 px-2 fw-bolder">
              {column.Header}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckBoxInTable;
