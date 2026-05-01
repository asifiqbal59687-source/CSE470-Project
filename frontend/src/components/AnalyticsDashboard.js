import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/api/customers/analytics/monthly') // We put it under the customers route for now
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    setChartData({ labels: [], datasets: [] });
                    return;
                }
                setChartData({
                    labels: data.map(row => row.month),
                    datasets: [
                        {
                            label: 'Revenue (BDT)',
                            data: data.map(row => row.total_revenue),
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: 'Profit (BDT)',
                            data: data.map(row => row.total_profit),
                            borderColor: 'rgb(255, 99, 132)',
                            tension: 0.1
                        }
                    ]
                });
            });
    }, []);

    if (!chartData) return <p>Loading Analytics...</p>;

    return (
        <div style={{ width: '80%', margin: 'auto', padding: '20px' }}>
            <h2>Business Performance Trends</h2>
            <Line data={chartData} />
        </div>
    );
};

export default AnalyticsDashboard;