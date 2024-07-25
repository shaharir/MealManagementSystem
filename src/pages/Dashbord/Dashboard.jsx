/* eslint-disable react/no-unescaped-entities */
import MyChart from "./ApexChart";

const Dashboard = () => {
  return (
    <>
      <div className="mb-3">
        <h2 className="dashboard-title fw-bolder mt-3 mb-5">Dashboard</h2>
        <div className="card shadow">
          <div className="card-body ">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem,
              temporibus animi tempora ipsum voluptate minus consequatur alias
              quae eveniet quidem veritatis in esse incidunt aperiam quam aut
              quis, nemo ea.
            </p>
          </div>
        </div>
      </div>

      <div
        className="dashboard-container px-3 py-5 card"
        style={{ backgroundColor: "#4F5562" }}
      >
        <div className="dashboard-content">
          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <div className="card shadow-lg">
                <MyChart />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="row ">
                <div className="col-12 col-md-6 mb-4 ">
                  <div className="card h-100 shadow dashboard-card">
                    <div className="card-body shadow-lg">
                      <h5 className="card-title">Border</h5>
                      <p className="card-text text-muted">
                        Explore data and insights about borders.
                      </p>
                      <a
                        href="/border"
                        className="btn text-white"
                        style={{ backgroundColor: "#6fa8dc" }}
                      >
                        Border Analysis
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="card h-100 shadow dashboard-card">
                    <div className="card-body shadow-lg">
                      <h5 className="card-title">Bazaar</h5>
                      <p className="card-text text-muted">
                        Discover information and trends about bazaars.
                      </p>
                      <a
                        href="/bazaar"
                        className="btn text-white"
                        style={{ backgroundColor: "#6fa8dc" }}
                      >
                        Bazaar Analysis
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-3 col-md-4 col-lg-4 mb-4">
                  <div className="card text-white h-100 shadow dashboard-card">
                    <div className="card-body shadow-lg">
                      <h5 className="card-title text-black">Total Borders</h5>
                      <button
                        className="button1 px-5 py-2 rounded btn "
                        style={{ backgroundColor: "#6fa8dc" }}
                      >
                        <p className="card-text text-white">75</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-3 col-md-8 col-lg-6  mb-4">
                  <div className="card text-white h-100 shadow dashboard-card">
                    <div className="card-body shadow-lg">
                      <h5 className="card-title text-black">Total Meals</h5>
                      <button
                        className="button1 px-3 py-2 rounded btn "
                        style={{ backgroundColor: "#6fa8dc" }}
                      >
                        <p className="card-text text-white">1,234</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
