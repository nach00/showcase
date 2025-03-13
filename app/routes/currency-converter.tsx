"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "~/components/ui/label";
import { H1, H3 } from "~/components/typography";
import NavBar from "~/components/NavBar";

const CurrencyInput = ({
	value,
	handleChange,
	label,
}: {
	value: number;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
}) => (
	<div className="flex flex-col relative border-2 border-black p-5 transform hover:-rotate-1 transition-transform duration-300 group">
		<span className="absolute -top-3 left-3 bg-amber-600 px-2 font-mono text-xs tracking-widest">
			"{label}"
		</span>
		<Label className="mr-1 mb-3 uppercase tracking-wide font-mono relative">
			<H3 className="after:content-['CURRENCY'] after:absolute after:-top-4 after:right-0 after:text-[8px] after:font-mono after:opacity-70">
				{label}
			</H3>
		</Label>
		<Input
			value={value}
			onChange={handleChange}
			type="number"
			className="aspect-square text-center font-black text-4xl border-3 border-black focus:ring-0 focus:outline-none focus:border-black bg-transparent group-hover:bg-black group-hover:text-white transition-colors w-[200px]"
		/>
	</div>
);

export default function CurrencyConverter() {
	const [state, setState] = useState({
		rate: 0.89,
		usd: 1,
		euro: 0.89,
	});

	const toEuro = (amount: number, rate: number) => amount * rate;
	const toUsd = (amount: number, rate: number) => amount / rate;

	const convert = (
		amount: number,
		rate: number,
		equation: (amount: number, rate: number) => number,
	) => {
		const input = parseFloat(amount.toString());
		return Number.isNaN(input) ? "" : equation(input, rate).toFixed(3);
	};

	const handleUsdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const euro = convert(parseFloat(event.target.value), state.rate, toEuro);
		setState({
			...state,
			usd: parseFloat(event.target.value),
			euro: parseFloat(euro),
		});
	};

	const handleEuroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const usd = convert(parseFloat(event.target.value), state.rate, toUsd);
		setState({
			...state,
			euro: parseFloat(event.target.value),
			usd: parseFloat(usd),
		});
	};

	return (
		<div className="min-h-screen relative bg-yellow-500 border-x-2 border-black before:absolute">
			<NavBar />
			<div className="container flex flex-col min-h-[calc(100vh-80px)] justify-center items-center min-w-screen px-4">
				<div className="pb-12 transform -rotate-1 relative">
					<h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 relative after:content-['TOOL'] after:absolute after:text-xs after:font-mono after:tracking-widest after:-top-4 after:right-0 after:text-amber-600">
						"Currency Converter"
					</h2>
					<h4 className="text-center text-3xl px-8 py-4 border-2 border-black uppercase font-mono tracking-wide relative after:content-['EXCHANGE_RATE'] after:absolute after:-top-3 after:left-4 after:text-[10px] after:bg-amber-600 after:px-1 after:tracking-widest">
						<span className="font-bold">USD</span> $1 : €{state.rate}{" "}
						<span className="font-bold">EURO</span>
					</h4>
				</div>

				<div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8 w-full max-w-3xl relative after:content-['MATH'] after:absolute after:bottom-2 after:right-2 after:text-xs after:font-mono">
					<CurrencyInput
						value={state.usd}
						handleChange={handleUsdChange}
						label="U$D"
					/>

					<span className="mx-2 font-bold border-t-2 border-b-2 border-black px-8 py-3 text-xl transform rotate-[1deg] hover:rotate-[5deg] transition-transform">
						"="
					</span>

					<CurrencyInput
						value={state.euro}
						handleChange={handleEuroChange}
						label="€URO"
					/>
				</div>

				<div className="mt-16 text-xs font-mono tracking-widest uppercase text-center border-t border-black pt-4 w-full max-w-md transform rotate-[0.5deg]">
					"EXCHANGE RATES UPDATED DAILY"
				</div>
			</div>

			<footer className="absolute bottom-4 left-6 text-[10px] font-mono tracking-widest">
				"NOT FINANCIAL ADVICE"
			</footer>
		</div>
	);
}
