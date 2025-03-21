import React, { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyRatesList from "./CurrencyRatesList";
import NavBar from "~/components/NavBar";
import Footer from "./Footer";

interface Rate {
	[key: string]: number;
}

export default function CurrencyExchangePage() {
	const [rates, setRates] = useState<Rate | null>(null);
	const [baseCurrency, setBaseCurrency] = useState<string>("USD");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch currency rates
	useEffect(() => {
		const fetchRates = async () => {
			setLoading(true);
			try {
				// In a real app, you would use an API like:
				// const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
				// const data = await response.json();
				// setRates(data.rates);

				// For demo purposes, we'll use mock data
				const mockRates: Rate = {
					EUR: 0.826,
					GBP: 0.765,
					JPY: 108.2,
					CAD: 1.257,
					AUD: 1.345,
					CHF: 0.925,
					HKD: 7.782,
					CNY: 6.548,
				};

				// Simulate API delay
				setTimeout(() => {
					setRates(mockRates);
					setLoading(false);
				}, 500);
			} catch (err) {
				setError("Failed to fetch exchange rates. Please try again later.");
				setLoading(false);
			}
		};

		fetchRates();
	}, [baseCurrency]);

	// Handle base currency change
	const handleBaseCurrencyChange = (newBaseCurrency: string) => {
		setBaseCurrency(newBaseCurrency);
	};

	return (
		<>
			<NavBar />
			<div className="relative overflow-hidden">
				{/* Accent Shapes */}
				<div
					className="absolute top-0 left-0 w-96 h-96 bg-[#00CC00] opacity-80 z-0"
					style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
				></div>
				{/* <div className="absolute bottom-0 right-10 w-72 h-72 border-[6px] border-[#00CC00] z-0 transform rotate-12"></div> */}

				<div className="max-w-7xl mx-auto pt-16 px-6 sm:px-8 lg:px-12 relative z-10">
					<div className="border-4 border-black mb-8 p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
						<h1 className="text-5xl font-black tracking-tighter mb-6 transform -rotate-1">
							<span className="font-black uppercase border-b-4 border-[#00CC00]">
								EXCHANGE
							</span>
							<span className="ml-3 font-light uppercase tracking-widest text-4xl opacity-40">
								SYSTEM
							</span>
						</h1>
					</div>

					{loading ? (
						<div className="flex justify-center items-center h-80">
							<div className="border-8 border-t-[#00CC00] border-r-transparent border-b-transparent border-l-transparent rounded-full w-24 h-24 animate-spin"></div>
						</div>
					) : error ? (
						<div className="flex justify-center items-center h-80">
							<p className="text-2xl font-bold text-[#00CC00] transform -rotate-2 border-4 border-[#00CC00] py-4 px-8 uppercase">
								{error}
							</p>
						</div>
					) : (
						<div className="flex flex-wrap gap-12">
							<div className="flex-1 min-w-[350px] transform hover:-rotate-1 transition-transform">
								<div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,204,0,0.7)]">
									<CurrencyConverter rates={rates} />
								</div>
							</div>
							<div className="flex-1 min-w-[350px] transform hover:rotate-1 transition-transform">
								<div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
									<CurrencyRatesList
										rates={rates}
										baseCurrency={baseCurrency}
										onBaseCurrencyChange={handleBaseCurrencyChange}
									/>
								</div>
							</div>
						</div>
					)}

					{/* <div className="mt-16 mb-10 flex justify-end"> */}
					{/* 	<div className="font-mono text-sm transform rotate-1 uppercase bg-black text-white py-2 px-4 tracking-wide"> */}
					{/* 		<span className="text-[#00CC00]">×</span> EXCHANGE RATES{" "} */}
					{/* 		<span className="text-[#00CC00]">×</span> */}
					{/* 	</div> */}
					{/* </div> */}
				</div>

				{/* Footer quote */}
				{/* <div className="border-t-5 border-black py-6 mt-10 relative z-10"> */}
				{/* 	<p className="max-w-7xl mx-auto px-6 font-light uppercase tracking-widest text-lg"> */}
				{/* 		<span className="font-black text-[#00CC00]">CURRENCY</span> AS */}
				{/* 		DESIGNED <span className="opacity-40">2088</span> */}
				{/* 	</p> */}
				{/* </div> */}
				<Footer />
			</div>
		</>
	);
}
