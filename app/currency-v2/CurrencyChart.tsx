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
	// Helper function to determine currency pair volatility
	const getVolatility = (from: string, to: string): number => {
		// Major currency pairs have lower volatility
		const majorPairs = [
			"EURUSD",
			"USDJPY",
			"GBPUSD",
			"USDCHF",
			"AUDUSD",
			"USDCAD",
			"NZDUSD",
		];

		const pair = `${from}${to}`;
		const inversePair = `${to}${from}`;

		if (from === to) return 0.001; // Same currency - minimal volatility
		if (majorPairs.includes(pair) || majorPairs.includes(inversePair))
			return 0.02; // Major pairs - low volatility
		if (from === "USD" || to === "USD" || from === "EUR" || to === "EUR")
			return 0.03; // USD or EUR pairs - medium volatility
		return 0.05; // Cross currency or exotic pairs - higher volatility
	};
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

				// Get realistic exchange rate based on the currency pair
				let baseRate;

				// Define common currency pair rates (more comprehensive than before)
				const baseRates: Record<string, Record<string, number>> = {
					USD: {
						EUR: 0.92,
						GBP: 0.78,
						JPY: 148.5,
						CAD: 1.35,
						AUD: 1.52,
						CHF: 0.89,
						CNY: 7.23,
						HKD: 7.82,
						NZD: 1.65,
					},
					EUR: {
						USD: 1.09,
						GBP: 0.85,
						JPY: 161.5,
						CAD: 1.47,
						AUD: 1.65,
						CHF: 0.97,
						CNY: 7.87,
						HKD: 8.51,
						NZD: 1.79,
					},
					GBP: {
						USD: 1.28,
						EUR: 1.18,
						JPY: 190.5,
						CAD: 1.73,
						AUD: 1.94,
						CHF: 1.14,
						CNY: 9.27,
						HKD: 10.01,
						NZD: 2.11,
					},
				};

				// Try to get the rate from our predefined rates
				if (baseRates[fromCurrency] && baseRates[fromCurrency][toCurrency]) {
					baseRate = baseRates[fromCurrency][toCurrency];
				}
				// Otherwise calculate it if we have the inverse
				else if (baseRates[toCurrency] && baseRates[toCurrency][fromCurrency]) {
					baseRate = 1 / baseRates[toCurrency][fromCurrency];
				}
				// Default fallback with warning
				else {
					console.warn(
						`No predefined rate for ${fromCurrency}/${toCurrency}, using default approximation`,
					);
					baseRate = fromCurrency === toCurrency ? 1 : 1.25;
				}

				// Generate dates and rates for the last 30 days
				for (let i = 30; i >= 0; i--) {
					const date = new Date();
					date.setDate(today.getDate() - i);

					// Format date as MM/DD
					const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
					labels.push(formattedDate);

					// Create realistic variations based on currency volatility
					// Major pairs like EUR/USD have lower volatility than exotic pairs
					const volatility = getVolatility(fromCurrency, toCurrency);
					const randomVariation = (Math.random() - 0.5) * volatility;
					const rate = baseRate * (1 + randomVariation);

					// Ensure proper decimal precision based on currency
					const precision = toCurrency === "JPY" ? 2 : 4;
					data.push(parseFloat(rate.toFixed(precision)));

					// Adjust base rate with less bias (centered random walk)
					baseRate += (Math.random() - 0.5) * 0.005 * baseRate;
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
						callbacks: {
							label: function (context) {
								const value = context.parsed.y;
								const precision = toCurrency === "JPY" ? 2 : 4;
								return `1 ${fromCurrency} = ${value.toFixed(
									precision,
								)} ${toCurrency}`;
							},
						},
					},
				},
				scales: {
					x: {
						grid: {
							display: false,
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
						},
						ticks: {
							font: {
								family: "Helvetica, Arial, sans-serif",
								weight: "bold",
							},
							callback: function (value) {
								// Use appropriate decimal places based on currency
								return toCurrency === "JPY"
									? value.toFixed(2)
									: value.toFixed(4);
							},
						},
						// Ensure y-axis doesn't start from zero to better show rate changes
						beginAtZero: false,
						// Use suggestedMin and suggestedMax to control the visible range
						// This creates a better visualization of the fluctuations
						suggestedMin: Math.min(...data) * 0.995,
						suggestedMax: Math.max(...data) * 1.005,
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
