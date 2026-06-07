import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

function SummaryCategory() {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [44, 55, 41, 17, 15],
      labels: ["Alimentação", "Transporte", "Lazer", "Saúde", "Outros"],
      chart: {
        type: "donut",
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={chartRef}></div>;
}

export default SummaryCategory;