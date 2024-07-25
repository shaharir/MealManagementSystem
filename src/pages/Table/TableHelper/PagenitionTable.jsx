/* eslint-disable react/prop-types */
const PagenitionTable = ({
  nextPage,
  previousPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <>
      <div className=" mx-3">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="mx-3 fs-5"
        >
          <i className="bi bi-arrow-left-square-fill"></i>
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="fs-5"
        >
          <i className="bi bi-arrow-right-square-fill"></i>
        </button>
      </div>
    </>
  );
};

export default PagenitionTable;
