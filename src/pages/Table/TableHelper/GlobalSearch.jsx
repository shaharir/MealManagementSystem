/* eslint-disable react/prop-types */
const GlobalSearch = ({ filter, setGlobalFilter }) => {
  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <div className="input-group " style={{ maxWidth: "300px" }}>
          <div className="input-group-prepend">
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{ backgroundColor: "#001529", color: "white" }}
            >
              <i className="bi bi-filter-circle"></i>
            </span>
          </div>
          <input
            type="text"
            className="ms-2 form-control"
            value={filter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Input to initiate search.... "
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
