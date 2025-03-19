import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom"; // Use React Router Link component

interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
	const { Title, Year, imdbID, Type, Poster } = movie;

	const posterUrl =
		Poster === "N/A"
			? "https://via.placeholder.com/300x450?text=No+Poster"
			: Poster;

	// Get a consistent color based on movie type
	const getTypeColor = (type: string) => {
		switch (type.toLowerCase()) {
			case "movie":
				return "border-[#FF6C0A] bg-[#FF6C0A]";
			case "series":
				return "border-[#39FF14] bg-[#39FF14]";
			case "episode":
				return "border-[#00BFFF] bg-[#00BFFF]";
			default:
				return "border-[#FFFF00] bg-[#FFFF00]";
		}
	};

	const typeColorClass = getTypeColor(Type);

	return (
		<>
			<Card className="mb-8 border-2 border-black hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:translate-x-1 relative before:content-['FILM'] before:absolute before:-top-3 before:left-4 before:bg-white before:px-2 before:text-xs before:font-mono before:tracking-widest">
				<CardContent className="p-4">
					<div className="flex flex-col md:flex-row gap-6">
						<div className="w-full md:w-1/4 relative">
							{/* Change from direct link to IMDB to Link to detail page */}
							<Link to={`movie/${imdbID}`} className="block overflow-hidden">
								<div className="border-2 border-black p-2 transform rotate-[0.5deg]">
									<img
										src={posterUrl}
										className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-300"
										alt={`${Title} poster`}
									/>
									<span className="absolute bottom-3 right-3 bg-white px-2 py-1 text-xs font-mono tracking-widest border border-black">
										"VIEW"
									</span>
								</div>
							</Link>
						</div>
						<div className="w-full md:w-3/4 flex flex-col justify-between">
							{/* Change from direct link to IMDB to Link to detail page */}
							<Link
								to={`movie/${imdbID}`}
								className="no-underline hover:underline text-gray-900"
							>
								<h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight mb-2 transform -rotate-[0.5deg]">
									<span className="bg-gradient-to-r from-black to-black bg-[length:0%_2px] hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out pb-1">
										{Title}
									</span>
								</h3>
								<div className="flex items-center gap-4 text-sm text-black my-4">
									<span
										className={`uppercase font-mono tracking-widest text-black border-2 px-3 py-1 ${typeColorClass}`}
									>
										{Type}
									</span>
									<span className="font-mono text-xl transform -translate-y-1">
										—
									</span>
									<span className="uppercase font-mono tracking-widest bg-white border-2 border-black px-3 py-1">
										{Year}
									</span>
								</div>
								<p className="mt-4 font-mono text-xs tracking-widest uppercase border-b border-black pb-2 inline-block">
									"CLICK TO VIEW DETAILS"
								</p>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default MovieCard;
