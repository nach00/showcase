import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Rate {
	[key: string]: number;
}

interface CurrencyChartProps {
	fromCurrency: string;
	toCurrency: string;
}

const CurrencyChart: React.FC<CurrencyChartProps> = ({
	fromCurrency,
	toCurrency,
}) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		const fetchHistoricalRates = async () => {
			try {
				// For demo purposes, we'll use mock data
				// In a real app, you would fetch this from an API like:
				// const response = await fetch(`https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`);

				// Generate mock historical data for the past 30 days
				const today = new Date();
				const labels: string[] = [];
				const data: number[] = [];

				// Create a base rate and add some variability
				let baseRate =
					fromCurrency === "USD" && toCurrency === "EUR"
						? 0.85
						: fromCurrency === "USD" && toCurrency === "GBP"
							? 0.75
							: fromCurrency === "USD" && toCurrency === "JPY"
								? 108.5
								: 1.25;

				// Generate dates and rates for the last 30 days
				for (let i = 30; i >= 0; i--) {
					const date = new Date();
					date.setDate(today.getDate() - i);

					// Format date as MM/DD
					const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
					labels.push(formattedDate);

					// Create some random variations for mock data
					const randomVariation = (Math.random() - 0.5) * 0.05; // +/- 2.5%
					const rate = baseRate * (1 + randomVariation);
					data.push(parseFloat(rate.toFixed(4)));

					// Adjust base rate slightly for next day (trending)
					baseRate += (Math.random() - 0.49) * 0.01 * baseRate;
				}

				renderChart(labels, data);
			} catch (error) {
				console.error("Failed to fetch historical rates:", error);
			}
		};

		fetchHistoricalRates();

		// Cleanup function
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
				chartInstance.current = null;
			}
		};
	}, [fromCurrency, toCurrency]);

	const renderChart = (labels: string[], data: number[]) => {
		if (!chartRef.current) return;

		const ctx = chartRef.current.getContext("2d");
		if (!ctx) return;

		// Destroy existing chart if it exists
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		// Create gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, 225);
		gradient.addColorStop(0, "rgba(0, 204, 0, 0.6)");
		gradient.addColorStop(1, "rgba(0, 204, 0, 0)");

		// Create new chart
		chartInstance.current = new Chart(ctx, {
			type: "line",
			data: {
				labels,
				datasets: [
					{
						label: `${fromCurrency}/${toCurrency} Exchange Rate`,
						data,
						fill: true,
						backgroundColor: gradient,
						borderColor: "#00CC00",
						borderWidth: 3,
						pointBackgroundColor: "#000000",
						pointBorderColor: "#00CC00",
						pointBorderWidth: 2,
						pointRadius: 4,
						pointHoverRadius: 6,
						tension: 0.3,
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
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
						titleColor: "#FFFFFF",
						bodyColor: "#FFFFFF",
						bodyFont: {
							family: "Helvetica, Arial, sans-serif",
							weight: "bold",
						},
						padding: 12,
						borderColor: "#00CC00",
						borderWidth: 1,
						displayColors: false,
					},
				},
				scales: {
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							font: {
								family: "Helvetica, Arial, sans-serif",
								weight: "bold",
							},
						},
					},
					y: {
						grid: {
							color: "#E0E0E0",
							drawBorder: false,
						},
						ticks: {
							font: {
								family: "Helvetica, Arial, sans-serif",
								weight: "bold",
							},
							callback: function (value) {
								return value.toFixed(4);
							},
						},
					},
				},
				interaction: {
					intersect: false,
					mode: "index",
				},
			},
		});
	};

	return (
		<div className="mt-10 border-[3px] border-black p-2 transform rotate-1 hover:rotate-0 transition-transform">
			<div className="relative">
				<div className="absolute -top-4 left-4 bg-white px-3 uppercase font-black tracking-widest text-[#00CC00] text-lg z-10">
					HISTORICAL DATA
				</div>

				<div className="h-[300px] relative">
					<canvas ref={chartRef} className="w-full h-full"></canvas>
				</div>

				<div className="absolute -bottom-4 right-4 bg-black px-3 py-1 text-white uppercase font-bold text-xs tracking-widest">
					30-DAY TREND
				</div>
			</div>
		</div>
	);
};

export default CurrencyChart;
