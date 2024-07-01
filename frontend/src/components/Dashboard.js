import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        start_year: '',
        impact: '',
        added: '',
        published: '',
        country: ''
    });

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            setError(null);

            axios
                .get('http://localhost:5000/api/data', { params: filters })
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError('An error occurred while fetching data.');
                    setLoading(false);
                });
        };

        fetchData();
    }, [filters]);

    useEffect(() => {
        const drawCharts = () => {
            if (!Array.isArray(data) || data.length === 0) {
                setError('Invalid data format');
                return;
            }
            const barChartCtx = document.getElementById('barChart')?.getContext('2d');
            if (barChartCtx) {
                new Chart(barChartCtx, {
                    type: 'bar',
                    data: {
                        labels: data.map((item) => item.title),
                        datasets: [
                            {
                                label: 'Intensity',
                                data: data.map((item) => item.intensity),
                                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    },
                });
            }
            const lineChartCtx = document.getElementById('lineChart')?.getContext('2d');
            if (lineChartCtx) {
                new Chart(lineChartCtx, {
                    type: 'line',
                    data: {
                        labels: data.map((item) => item.title),
                        datasets: [
                            {
                                label: 'Intensity',
                                data: data.map((item) => item.intensity),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                pointRadius: 3,
                                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                                pointBorderColor: 'rgba(255, 255, 255, 1)',
                                pointBorderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    },
                });
            }
            const pieChartCtx = document.getElementById('pieChart')?.getContext('2d');
            if (pieChartCtx) {
                const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
                const pieChartData = data.slice(0, 5).map((item) => ({
                    label: item.title,
                    data: item.intensity,
                }));

                new Chart(pieChartCtx, {
                    type: 'pie',
                    data: {
                        labels: pieChartData.map((item) => item.label),
                        datasets: [
                            {
                                data: pieChartData.map((item) => item.data),
                                backgroundColor: colors,
                                borderColor: '#fff',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    usePointStyle: true,
                                },
                            },
                        },
                    },
                });
            }
            const doughnutChartCtx = document.getElementById('doughnutChart')?.getContext('2d');
            if (doughnutChartCtx) {
                const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
                const doughnutChartData = data.slice(0, 5).map((item) => ({
                    label: item.title,
                    data: item.intensity,
                }));

                new Chart(doughnutChartCtx, {
                    type: 'doughnut',
                    data: {
                        labels: doughnutChartData.map((item) => item.label),
                        datasets: [
                            {
                                data: doughnutChartData.map((item) => item.data),
                                backgroundColor: colors,
                                borderColor: '#fff',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    usePointStyle: true,
                                },
                            },
                        },
                    },
                });
            }
        };

        drawCharts();
    }, [data]);

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="filters">
                <input
                    type="text"
                    name="end_year"
                    value={filters.end_year}
                    onChange={handleFilterChange}
                    placeholder="End Year"
                />
                <input
                    type="text"
                    name="topic"
                    value={filters.topic}
                    onChange={handleFilterChange}
                    placeholder="Topic"
                />
                <input
                    type="text"
                    name="sector"
                    value={filters.sector}
                    onChange={handleFilterChange}
                    placeholder="Sector"
                />
                <input
                    type="text"
                    name="region"
                    value={filters.region}
                    onChange={handleFilterChange}
                    placeholder="Region"
                />
                <input
                    type="text"
                    name="pestle"
                    value={filters.pestle}
                    onChange={handleFilterChange}
                    placeholder="Pestle"
                />
                <input
                    type="text"
                    name="source"
                    value={filters.source}
                    onChange={handleFilterChange}
                    placeholder="Source"
                />
                <input
                    type="text"
                    name="start_year"
                    value={filters.start_year}
                    onChange={handleFilterChange}
                    placeholder="Start Year"
                />
                <input
                    type="text"
                    name="impact"
                    value={filters.impact}
                    onChange={handleFilterChange}
                    placeholder="Impact"
                />
                <input
                    type="text"
                    name="added"
                    value={filters.added}
                    onChange={handleFilterChange}
                    placeholder="Added"
                />
                <input
                    type="text"
                    name="published"
                    value={filters.published}
                    onChange={handleFilterChange}
                    placeholder="Published"
                />
                <input
                    type="text"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    placeholder="Country"
                />
            </div>
            <div className="chart-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="chart-wrapper">
                        <div className="chart">
                            <canvas id="barChart" width="400" height="200" />
                        </div>
                        <div className="chart">
                            <canvas id="lineChart" width="400" height="200" />
                        </div>
                        <div className="chart">
                            <canvas id="pieChart" width="300" height="300" />
                        </div>
                        <div className="chart">
                            <canvas id="doughnutChart" width="300" height="300" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Dashboard;
