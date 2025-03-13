import { LikeIcon } from "@/components/icons/like";
import { Button } from "@/components/ui/button";
import type { Route } from "./+types/hello-world";
import NavBar from "~/components/NavBar";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Hello World React Project" },
		{ name: "description", content: "Hello World" },
	];
}

export default function HelloWorld() {
	return (
		<>
			<NavBar />
			<div className="w-screen min-h-screen align-middle bg-pink-600 flex items-center justify-center">
				<div className="grid grid-rows-[20px_1fr_20px] bg-white relative py-5 border-2 border-black before:content-['HELLO'] before:absolute before:text-xs before:top-4 before:right-4 before:font-mono before:tracking-widest">
					<main className="flex flex-col row-start-2 max-w-5xl mx-auto w-full px-8 md:px-12 rotate-[-0.5deg]">
						<h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-12 relative">
							<span className="text-blue-500">"Hello World!"</span>
							<i id="whirlybat" className="wb-icon">
								<span className="text-red-500">¥</span>
							</i>
						</h1>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 my-16 relative">
							{Array.from({ length: 3 }, (_, i) => (
								<div
									key={i}
									className={`flex flex-col border ${
										i === 1 ? "border-dashed" : "border-solid"
									} border-black p-6 relative transform ${
										i === 0 ? "rotate-1" : i === 2 ? "-rotate-1" : ""
									} hover:bg-black hover:text-white transition-all duration-300`}
								>
									<span className="font-mono text-xs absolute -top-2 -left-1 bg-white px-1 border border-black">{`"ITEM ${
										i + 1
									}"`}</span>
									<Button
										key={i}
										onClick={() => console.log(`liked message: ${i}`)}
										className="flex items-center gap-3 w-full justify-between bg-transparent hover:bg-white hover:text-black border-t border-black mt-4 pt-4 rounded-none"
									>
										<span className="uppercase font-mono tracking-wide text-xs text-green-500">
											Click Here
										</span>
										<LikeIcon className="transform scale-125 text-yellow-500" />
									</Button>
								</div>
							))}
						</div>

						<div className="border-t-2 border-black pt-8 mt-16 text-right">
							<p className="font-mono text-xs tracking-widest uppercase text-purple-500">
								"©2088"
							</p>
						</div>
					</main>

					<footer className="row-start-3 border-t-2 border-black mx-8 md:mx-12 flex justify-between items-center">
						<span className="text-xs font-mono tracking-wider text-pink-500">
							NOT FOR RESALE
						</span>
						<span className="text-xs font-mono tracking-wider text-orange-500">
							"END"
						</span>
					</footer>
				</div>
			</div>
		</>
	);
}
