import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function UsersChart({ usersData }) {
    const last15 = usersData.slice(-15); // merr 15 itemet e fundit

    const data = {
        labels: last15.map(u => u.date),
        datasets: [
            {
                label: "New Users",
                data: last15.map(u => u.count),
                fill: true,
                tension: 0.4,
                borderColor: "rgba(45, 26, 54, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                pointRadius: 5,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // lejon grafikun të zgjerohet sipas kutisë
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white p-9 rounded-xl shadow w-full h-96">
            <h2 className="text-gray-500 mb-1">New Users </h2>
            <div className="w-full h-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default UsersChart;
