const Reports = () => {
  return (
    <>
      <div className="container mt-4">
        <h1 className="text-start mb-4 fw-bolder">Reports</h1>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-lg ">
              <div className="card-header">Report 1</div>
              <div className="card-body">
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Error, qui.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-lg ">
              <div className="card-header">Report 2</div>
              <div className="card-body">
                <p className="text-muted ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea,
                  quo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Add more rows and cards for additional reports --> */}
      </div>
    </>
  );
};

export default Reports;
