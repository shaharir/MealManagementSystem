import { Container, Row, Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

const MyChart = () => {
  const series = [
    {
      name: "Meal",
      data: [50, 45, 60, 30, 25, 30, 30],
    },
  ];

  const options = {
    chart: {
      type: "Line",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: [
        "Friday",
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
    },
    fill: {
      colors: ["#6FA8DC"],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Report",
      align: "center",
    },
  };

  return (
    <Container className="p-4 rounded bg-light shadow">
      <Row>
        <Col>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            className="w-100"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MyChart;
