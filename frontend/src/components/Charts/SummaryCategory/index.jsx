import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { dashboardService } from "../../../services/dashboardService.js";

function SummaryCategory() {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await dashboardService.summaryCategory();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    loadExpenses();
  }, []);
  
  function generateColors(count) {
    return Array.from({ length: count }, (_, index) => {
      const hue = (index * 360) / count;
      return `hsl(${hue}, 70%, 55%)`;
    });
  }
  
  const categories = expenses.map((item) => item.categoria);
  
  const series = [
    {
      name: "Total gasto",
      data: expenses.map((item) => item.total),
    },
  ];
  
  const options = {
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 6,
      },
    },
    
    xaxis: {
      categories: expenses.map((item) => item.categoria),
    },
    
    colors: generateColors(expenses.length),
  };
  
  return (
    <Chart
    options={options}
    series={series}
    type="bar"
    height={500}
    width={1000}
    />
  );
}

export default SummaryCategory;