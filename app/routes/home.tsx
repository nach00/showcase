import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { projects } from "@/projects.ts";
import NavBar from "~/components/NavBar";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Altcademy Projects" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="relative min-h-screen px-4 py-12 bg-gradient-to-r from-blue-50 to-blue-100 border-x-2 border-black">
				<h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-16 transform -rotate-1 relative ml-8 text-blue-900">
					<i id="whirlybat" className="wb-icon mr-3 rotate-3 text-blue-700">
						+
					</i>
					ALTCADEMY
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto relative">
					{projects.map((project, index) => (
						<Link to={project.demo}>
							<Card
								key={index}
								className={`group border-2 border-black relative overflow-visible transform ${
									index % 3 === 0
										? "rotate-[0.4deg]"
										: index % 3 === 1
											? "-rotate-[0.3deg]"
											: ""
								} hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 bg-gradient-to-r from-white to-blue-50`}
							>
								{/* <span className="absolute -top-3 left-3 bg-white px-2 font-mono text-[10px] tracking-widest normal-case border border-black"> */}
								{/* {String(index + 1)} */}
								{/* {String(index + 1)} */}
								{/* {String(index + 1)} */}
								{/* <i id="whirlybat" className="wb-icon"> */}
								{/* {project.icon} */}
								{/* </i> */}
								{/* </span> */}
								{/* {index % 4 === 0 && ( */}
								{/* <div className="absolute -top-2 -right-2 w-4 h-4 bg-black transform rotate-12 z-[-1]"></div> */}
								{/* )} */}
								<CardHeader className="_border-b border-black bg-gradient-to-r from-white via-gray-50 to-gray-100">
									<CardTitle className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-1 relative text-blue-900">
										<i
											id="whirlybat"
											className="wb-icon normal-case mr-3 border-black border-b-4 pb-1"
										>
											{project.icon}
										</i>
										{project.title}
									</CardTitle>
									<CardDescription className="font-mono text-sm tracking-tight opacity-70 text-blue-700 pb-3">
										{project.description}
									</CardDescription>
								</CardHeader>
								{/* <CardFooter className="flex justify-between items-end pt-3 h-full bg-blue-200"> */}
								{/* 	<div className="flex gap-4"> */}
								{/* 		<Link to={project.github}> */}
								{/* 			<Button className="border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors uppercase font-mono text-xs tracking-widest px-4 py-2"> */}
								{/* 				Github */}
								{/* 			</Button> */}
								{/* 		</Link> */}
								{/* 		<Link to={project.demo}> */}
								{/* 			<Button className="border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors uppercase font-mono text-xs tracking-widest px-4 py-2 relative after:content-['LIVE'] after:absolute after:-top-3 after:right-0 after:text-[8px] after:font-mono after:bg-white after:text-black after:px-1 after:border after:border-black"> */}
								{/* 				Demo */}
								{/* 			</Button> */}
								{/* 		</Link> */}
								{/* 	</div> */}
								{/* 	<span className="font-mono text-[10px] tracking-widest opacity-50 uppercase"> */}
								{/* 		CIRCA.{new Date().getFullYear()} */}
								{/* 	</span> */}
								{/* </CardFooter> */}
							</Card>
						</Link>
					))}
				</div>

				<footer className="mt-24 border-t-2 border-black pt-4 flex justify-between items-center max-w-6xl mx-auto font-mono text-xs tracking-widest">
					<span className="uppercase relative transform -rotate-[0.5deg] text-blue-900">
						see source code at my{" "}
						<Link to="https://github.com/nach00" className="text-red-600">
							github
						</Link>
					</span>
					<div className="flex gap-3 items-center">
						{/* <div className="w-4 h-4 bg-black"></div> */}

						<i
							id="whirlybat"
							className="wb-icon mr-3 text-3xl text-blue-700 normal-case"
						>
							·
						</i>
						<span className="uppercase text-blue-900">PORTFOLIO</span>
					</div>
				</footer>
			</div>
		</>
	);
}
