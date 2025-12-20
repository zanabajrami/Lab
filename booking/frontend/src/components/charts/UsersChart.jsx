import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function UsersChart({ usersCount }) {
  const data = {
    labels: ["Users"],
    datasets: [
      {
        label: "Total Users",
        data: [usersCount],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 mb-4">Total Users Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default UsersChart;
