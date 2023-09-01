import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const PressureChart = ({ pressure=1000}) => {
  const [chartData, setChartData] = useState({
    labels: ["Pressure"],
    datasets: [
      {
        data: [pressure, 1500 - pressure], 
        backgroundColor: ["rgb(255,191,94)", "rgba(0,0,0,0.2)"],
        borderWidth: 1,
      },
    ],
  });


  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: (tooltipItem) => {
          return tooltipItem.dataIndex === 0;
        },
      },
    },
    aspectRatio: 2,
    circumference: 180,
    rotation: 270,
    cutout: '60%',
  });

  return (
    <div className="relative">
        <Doughnut data={chartData} options={chartOptions} />
        <h3 className="absolute left-[35%] bottom-0 text-2xl font-semibold">{pressure} 
         <span className="opacity-[0.7] text-sm"  > hPa</span> 
        </h3>
    </div>
  );
};

export default PressureChart;
