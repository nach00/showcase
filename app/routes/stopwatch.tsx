"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "~/components/NavBar";

export default function Stopwatch() {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [backgroundColor, setBackgroundColor] = useState("white");

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		}
		return () => clearInterval(interval);
	}, [isRunning]);

	let timer: NodeJS.Timeout;
	useEffect(() => {
		if (isRunning) {
			timer = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
			setBackgroundColor("green");
		} else if (!isRunning && time !== 0) {
			clearInterval(timer);
			setBackgroundColor("red");
		}
		return () => clearInterval(timer);
	}, [isRunning, time]);

	const handleStartStop = () => {
		setIsRunning(!isRunning);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTime(0);
		setBackgroundColor("white");
	};
	return (
		<>
			<NavBar />
			<div
				className="min-h-screen relative bg-white border-x-2 border-black before:content-['TIME'] before:absolute before:top-4 before:right-6 before:text-xs before:tracking-widest before:font-mono"
				style={{ backgroundColor }}
			>
				<div className="container mx-auto flex flex-col items-center justify-center h-screen relative before:content-['MEASUREMENT'] before:absolute before:bottom-8 before:left-8 before:text-xs before:tracking-widest before:font-mono">
					<h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16 transform -rotate-1 relative after:content-['DEVICE'] after:absolute after:text-xs after:font-mono after:tracking-widest after:-top-4 after:right-0 after:text-gray-500">
						"STOPWATCH"
					</h1>

					<div className="border-4 border-black p-12 relative transform rotate-[0.5deg] hover:rotate-0 transition-transform duration-300 mb-16 after:content-['DIGITS'] after:absolute after:-top-3 after:left-4 after:text-[10px] after:bg-white after:px-1 after:tracking-widest">
						<div
							className="text-7xl md:text-9xl font-mono font-black tabular-nums tracking-tight"
							style={{ fontVariantNumeric: "tabular-nums" }}
						>
							<span className="border-b-2 border-black">
								{("0" + Math.floor((time / 60000) % 60)).slice(-2)}
							</span>
							<span className="animate-pulse mx-1">:</span>
							<span className="border-b-2 border-black">
								{("0" + Math.floor((time / 1000) % 60)).slice(-2)}
							</span>
							<span className="animate-pulse mx-1">:</span>
							<span className="bg-black text-white px-2">
								{("0" + Math.floor((time / 10) % 100)).slice(-2)}
							</span>
						</div>
					</div>

					<div className="flex flex-row gap-6 relative before:content-['CONTROLS'] before:absolute before:-top-6 before:left-1/2 before:transform before:-translate-x-1/2 before:text-xs before:font-mono before:bg-white before:px-2 before:tracking-widest">
						<Button
							onClick={handleStartStop}
							className={`px-12 py-6 font-mono uppercase tracking-widest text-lg border-2 ${
								isRunning
									? "bg-black text-white border-black hover:bg-white hover:text-black"
									: "bg-white text-black border-black hover:bg-black hover:text-white"
							} 
              transition-all transform hover:translate-x-1 hover:-translate-y-1 relative after:content-['${
								isRunning ? "STOP" : "START"
							}'] after:absolute after:-top-3 after:right-2 after:text-[8px] after:font-mono after:bg-white after:px-1`}
						>
							{isRunning ? "STOP" : "START"}
						</Button>

						<Button
							onClick={handleReset}
							className="px-12 py-6 font-mono uppercase tracking-widest text-lg border-2 border-dashed border-black bg-white text-black hover:bg-black hover:text-white transition-all transform hover:translate-x-1 hover:-translate-y-1 relative"
						>
							RESET
						</Button>
					</div>

					<div className="absolute bottom-12 left-12 transform rotate-90 origin-left text-xs font-mono tracking-widest">
						"MEASURE WITH PRECISION"
					</div>

					<div className="absolute top-12 right-12 transform -rotate-90 origin-right text-xs font-mono tracking-widest">
						READY. SET. GO.
					</div>
				</div>
			</div>
		</>
	);
}
