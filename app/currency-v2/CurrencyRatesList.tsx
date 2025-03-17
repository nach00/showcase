import React from "react";

interface Rate {
	[key: string]: number;
}

interface CurrencyRatesListProps {
	rates: Rate | null;
	baseCurrency: string;
	onBaseCurrencyChange: (currency: string) => void;
}

const CurrencyRatesList: React.FC<CurrencyRatesListProps> = ({
	rates,
	baseCurrency,
	onBaseCurrencyChange,
}) => {
	const availableCurrencies = rates
		? ["USD", ...Object.keys(rates).filter((curr) => curr !== "USD")]
		: ["USD"];

	// Handle trends - this would be more dynamic with historical data
	// For now we'll simulate with some static trends
	const getTrendIcon = (currency: string) => {
		// This would normally be calculated from historical data
		const trendUp = ["EUR", "JPY", "CAD", "AUD"];
		const trendDown = ["GBP", "CHF", "HKD"];

		if (trendUp.includes(currency)) {
			return (
				<svg className="w-5 h-4" viewBox="0 0 20 15">
					<polyline
						points="0,15 10,0 20,15"
						fill="none"
						stroke="#00CC00"
						strokeWidth="2"
					/>
				</svg>
			);
		} else if (trendDown.includes(currency)) {
			return (
				<svg className="w-5 h-4" viewBox="0 0 20 15">
					<polyline
						points="0,0 10,15 20,0"
						fill="none"
						stroke="#000"
						strokeWidth="2"
					/>
				</svg>
			);
		}
		return null;
	};

	// Calculate exchange rate between two currencies
	const calculateRate = (currency: string): number | null => {
		if (!rates) return null;

		if (baseCurrency === "USD") {
			return rates[currency];
		} else if (currency === "USD") {
			return 1 / rates[baseCurrency];
		} else {
			return rates[currency] / rates[baseCurrency];
		}
	};

	return (
		<div className="flex flex-col gap-8 font-['Helvetica'] relative">
			{/* Base Currency Selector - Currently commented out */}
			<div className="relative py-8 transform -rotate-1">
				<div className="absolute -top-3 left-4 bg-white px-3 uppercase font-black tracking-wider text-lg">
					<span className="text-[#00CC00]">BASE</span> CURRENCY
				</div>

				<div className="border-4 border-black pt-6 pb-2 px-4 relative">
					<select
						value={baseCurrency}
						onChange={(e) => onBaseCurrencyChange(e.target.value)}
						className="w-full p-3 text-2xl font-black uppercase tracking-tight border-l-[#00CC00] border-l-4 border-t-0 border-r-0 bg-transparent focus:outline-none appearance-none mb-3"
						style={{ textIndent: "10px" }}
					>
						{availableCurrencies.map((currency) => (
							<option key={currency} value={currency} className="font-normal">
								{currency}
							</option>
						))}
					</select>

					<div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
						<div className="w-6 h-6 border-r-4 border-b-4 border-black transform rotate-45 translate-y-[-5px]"></div>
					</div>

					<span className="absolute -bottom-2 right-4 bg-white px-2 text-xs font-black uppercase tracking-widest text-[#00CC00]">
						SELECTION
					</span>
				</div>
			</div>
			{/* Popular Pairs */}
			<div className="outline-[#00CC00] p-8 outline-dashed outline-4 relative transform -rotate-1 hover:rotate-0 transition-all duration-300">
				<span className="absolute -top-4 -left-2 bg-white px-3 text-xl font-black uppercase tracking-widest">
					POPULAR RATES <span className="text-[#00CC00]">™</span>
				</span>

				<div className="flex flex-col gap-3">
					{availableCurrencies
						.filter((curr) => curr !== baseCurrency)
						.slice(0, 5) // Limit to 5 pairs for display
						.map((currency) => {
							const rate = calculateRate(currency);

							return (
								<div
									className="flex justify-between items-center p-5 border-l-[6px] border-r-[1px] border-y-[1px] border-black hover:border-l-[#00CC00] transition-colors duration-200 transform hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(0,0,0,0.8)]"
									key={currency}
								>
									<div className="text-2xl font-black tracking-tighter uppercase">
										<span>{baseCurrency}</span>
										<span className="text-[#00CC00] mx-2">/</span>
										<span>{currency}</span>
									</div>
									<div className="flex items-center justify-center transform scale-125">
										{getTrendIcon(currency)}
									</div>
									<div className="text-3xl font-light tracking-tight tabular-nums">
										{rate ? rate.toFixed(3) : "—"}
									</div>
								</div>
							);
						})}
				</div>

				{/* <div className="mt-16"> */}
				{/* 	<div className="border-4 border-black p-5 h-[350px] relative overflow-hidden transform -rotate-1 hover:rotate-0 transition-all"> */}
				{/* 		<div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 z-10"></div> */}
				{/**/}
				{/* 		<div className="flex flex-col absolute top-20 left-10 z-20"> */}
				{/* 			<span className="text-4xl font-black uppercase tracking-tighter transform -rotate-3"> */}
				{/* 				MARKET */}
				{/* 			</span> */}
				{/* 			<span className="text-4xl font-black uppercase tracking-tighter ml-10 text-[#00CC00]"> */}
				{/* 				DATA */}
				{/* 			</span> */}
				{/* 		</div> */}
				{/**/}
				{/* 		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"> */}
				{/* 			<svg className="w-[350px] h-[220px]" viewBox="0 0 300 200"> */}
				{/* 				<rect */}
				{/* 					x="0" */}
				{/* 					y="0" */}
				{/* 					width="300" */}
				{/* 					height="200" */}
				{/* 					fill="none" */}
				{/* 					stroke="#000" */}
				{/* 					strokeWidth="4" */}
				{/* 				/> */}
				{/* 				<line */}
				{/* 					x1="0" */}
				{/* 					y1="0" */}
				{/* 					x2="300" */}
				{/* 					y2="200" */}
				{/* 					stroke="#000" */}
				{/* 					strokeWidth="1" */}
				{/* 					strokeDasharray="5,5" */}
				{/* 				/> */}
				{/* 				<line */}
				{/* 					x1="0" */}
				{/* 					y1="200" */}
				{/* 					x2="300" */}
				{/* 					y2="0" */}
				{/* 					stroke="#000" */}
				{/* 					strokeWidth="1" */}
				{/* 					strokeDasharray="5,5" */}
				{/* 				/> */}
				{/* 				<polyline */}
				{/* 					points="50,150 80,120 110,140 140,90 170,110 200,70" */}
				{/* 					fill="none" */}
				{/* 					stroke="#00CC00" */}
				{/* 					strokeWidth="4" */}
				{/* 				/> */}
				{/* 				<line */}
				{/* 					x1="50" */}
				{/* 					y1="150" */}
				{/* 					x2="50" */}
				{/* 					y2="190" */}
				{/* 					stroke="#000" */}
				{/* 					strokeWidth="1" */}
				{/* 					opacity="0.5" */}
				{/* 				/> */}
				{/* 				<line */}
				{/* 					x1="50" */}
				{/* 					y1="190" */}
				{/* 					x2="200" */}
				{/* 					y2="190" */}
				{/* 					stroke="#000" */}
				{/* 					strokeWidth="1" */}
				{/* 					opacity="0.5" */}
				{/* 				/> */}
				{/* 				<circle cx="200" cy="70" r="6" fill="#00CC00" /> */}
				{/* 			</svg> */}
				{/* 		</div> */}
				{/**/}
				{/* 		<div className="absolute bottom-5 right-5 z-20 font-black uppercase text-sm tracking-widest"> */}
				{/* 			<span className="text-[#00CC00]">EXCHANGE</span> DATA */}
				{/* 		</div> */}
				{/* 	</div> */}
				{/* </div> */}

				<div className="absolute -bottom-4 -right-2 bg-black text-white px-4 py-1 text-sm uppercase tracking-widest font-light">
					{baseCurrency} <span className="text-[#00CC00]">BASE</span>
				</div>
			</div>

			{/* <div className="self-end transform rotate-2 border-4 border-[#00CC00] py-2 px-4 uppercase tracking-widest font-black text-sm"> */}
			{/* 	FINANCIAL <span className="opacity-50">MONITOR</span> */}
			{/* </div> */}
		</div>
	);
};

export default CurrencyRatesList;
