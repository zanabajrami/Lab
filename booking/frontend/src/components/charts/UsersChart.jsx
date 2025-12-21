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
    const last5 = usersData.slice(-5); // merr 10 itemet e fundit

    const data = {
        labels: last5.map(u => u.date),
        datasets: [
            {
                label: "New Users",
                data: last5.map(u => u.count),
                fill: true,
                tension: 0.35,
                borderColor: "rgba(45, 26, 54, 1)",
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
            },
        ],
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
        <div
            className="
        bg-white rounded-xl shadow w-full
        p-4 sm:p-6 lg:p-8 xl:p-9
        h-82 sm:h-[360px] lg:h-[400px] xl:h-[440px]
    "
        >
            <h2 className="text-gray-500 mb-1 -mt-2 text-sm sm:text-base lg:text-lg">
                New Users
            </h2>

            {/* CHART WRAPPER */}
            <div
                className="
        mx-auto h-full
        w-[94%] max-w-[320px]
        sm:w-[95%] sm:max-w-[520px]
        lg:w-[90%] lg:max-w-[820px]
        xl:w-full xl:max-w-none
    "
            >
                <Line data={data} options={options} />
            </div>
        </div>

    );
}

export default UsersChart;
