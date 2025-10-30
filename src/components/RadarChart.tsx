import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  dataValues?: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ dataValues = [65, 50, 90, 70] }) => {
  const data = {
    labels: ["Option 1", "Option 2", "Option 3", "Option 4"],
    datasets: [
      {
        label: "Example Dataset",
        data: dataValues,
        backgroundColor: "rgba(128, 0, 128, 0.5)",
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(128, 0, 128, 1)",
        pointRadius: 5,
        // tension: 0.4, // 데이터 라인도 부드럽게
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 레전드 숨김
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: "#cccccc",
          lineWidth: 1,
        },
        grid: {
          color: "#e6e6e6",
          circular: true, // <-- 외곽선과 격자 둥글게
        },
        pointLabels: {
          color: "#333333",
          font: {
            size: 12,
          },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
