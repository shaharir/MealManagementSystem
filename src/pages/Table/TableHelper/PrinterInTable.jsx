/* eslint-disable react/prop-types */


const PrinterInTable = ({generatePdf}) => {
    return (
        <>
             <div className="ms-2 shadow-lg">
          <button
            className="btn"
            onClick={generatePdf}
            style={{ backgroundColor: "#F7DC6F" }}
          >
            <i className="bi bi-printer"></i>
          </button>
        </div>  
        </>
    );
};

export default PrinterInTable;