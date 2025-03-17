// MovieDetail.tsx
("use client");

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, X, ArrowLeft, ExternalLink } from "lucide-react";
import NavBar from "~/components/NavBar";
import { Button } from "@/components/ui/button";

import { Link, useParams } from "react-router";
interface MovieDetail {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Array<{ Source: string; Value: string }>;
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

const MovieService = {
	apiKey: "b7da8d63",
	baseUrl: "https://www.omdbapi.com",

	getById: async (id: string) => {
		try {
			const response = await fetch(
				`${MovieService.baseUrl}/?i=${id}&plot=full&apikey=${MovieService.apiKey}`,
			);

			if (!response.ok) {
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}

			// Safely handle the JSON parsing
			let data;
			try {
				data = await response.json();
			} catch (jsonError) {
				console.error("JSON parse error:", jsonError);
				throw new Error("Invalid response from movie database");
			}

			if (data.Response === "False") {
				throw new Error(data.Error || "Movie not found");
			}

			return data;
		} catch (error) {
			console.error("Get movie error:", error);
			throw error;
		}
	},
};

export default function MovieDetail() {
	const params = useParams();
	const id = params.id as string;
	const [movie, setMovie] = useState<MovieDetail | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchMovie = async () => {
			setIsLoading(true);
			setError("");

			try {
				const movieData = await MovieService.getById(id);
				setMovie(movieData);
			} catch (error: unknown) {
				setError(error instanceof Error ? error.message : String(error));
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovie();
	}, [id]);

	// Use a stable ID for rotations instead of random generation which causes hydration issues
	const getRotateClass = (index: number) => {
		const angles = [
			"-rotate-[1.5deg]",
			"rotate-[0.8deg]",
			"-rotate-[0.6deg]",
			"rotate-[2deg]",
		];
		return angles[index % angles.length];
	};

	return (
		<>
			<NavBar />
			<div className="max-w-6xl mx-auto px-4 py-12 relative bg-white min-h-screen overflow-hidden">
				{/* Background design elements */}
				<div className="absolute top-[20%] right-[5%] w-60 h-60 border-8 border-[#FF6C0A] opacity-10 transform rotate-12 z-0"></div>
				<div className="absolute bottom-[10%] left-[15%] w-80 h-80 border-4 border-[#39FF14] opacity-5 transform -rotate-12 z-0"></div>

				<div className="absolute top-6 left-6 font-mono text-xs tracking-[-1px] uppercase opacity-50">
					Film ID: {id}
				</div>

				<div className="mb-8 flex items-center justify-between">
					<Button
						asChild
						variant="ghost"
						className="bg-transparent hover:bg-[#FFF7D6] border-2 border-black font-mono text-sm tracking-tighter pl-2 pr-3 py-1 h-auto"
					>
						<Link href="/">
							<ArrowLeft className="mr-1 h-4 w-4" />
							<span className="uppercase">BACK</span>
						</Link>
					</Button>

					<span className="font-mono text-xs tracking-widest uppercase transform rotate-[270deg] border-t border-black pt-1">
						C.2088
					</span>
				</div>

				{isLoading && (
					<div className="flex flex-col justify-center items-center py-32 relative">
						<Loader2 className="h-12 w-12 animate-spin mb-6 text-[#39FF14]" />
						<div className="font-mono text-xs tracking-tighter uppercase">
							<span className="inline-block animate-pulse">LOADING...</span>
						</div>
						<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-black opacity-20"></div>
					</div>
				)}

				{error && (
					<Alert className="mb-8 border-2 border-[#FF0000] bg-[#1A1A1A] text-white p-8 relative">
						<div className="absolute -top-4 -right-4 bg-[#FF0000] p-1">
							<X className="h-6 w-6 text-white" />
						</div>
						<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#FF0000]"></div>
						<AlertDescription className="font-mono tracking-tighter text-sm uppercase">
							ERROR_RESPONSE: {error}
						</AlertDescription>
					</Alert>
				)}

				{movie && (
					<div className="relative z-10">
						{/* Title section with offset/layered effect */}
						<div className="relative mb-16 ml-4">
							<h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-black/90 mb-0 pb-0 leading-none">
								{movie.Title}
							</h1>
							<h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-[#FF6C0A]/20 absolute top-1 left-1">
								{movie.Title}
							</h1>
							<div className="absolute -bottom-3 -right-6">
								<span className="inline-block bg-[#FFFF00] border-2 border-black px-2 py-1 font-mono text-xs uppercase transform rotate-[-2deg]">
									{movie.Year}
								</span>
							</div>

							<div className="absolute -left-4 -bottom-8 flex">
								<span className="inline-block border-t-4 w-12 border-black"></span>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
							{/* Poster column */}
							<div className="md:col-span-5 relative">
								<div
									className={`border-4 border-black transform ${getRotateClass(
										1,
									)} bg-white relative`}
								>
									<div className="absolute top-0 right-0 -mt-4 -mr-2 bg-white px-2 py-1 font-mono text-[10px] uppercase border border-black transform -rotate-[15deg]">
										POSTER
									</div>
									<img
										src={
											movie.Poster !== "N/A"
												? movie.Poster
												: "https://via.placeholder.com/300x450?text=No+Poster"
										}
										className="w-full object-cover"
										alt={`${movie.Title} poster`}
									/>
								</div>

								{/* Rating badge, purposefully misaligned */}
								<div className="absolute top-12 -right-4 transform rotate-[8deg] bg-[#39FF14] border-2 border-black p-3">
									<div className="font-mono text-[10px] tracking-widest mb-1 uppercase">
										RATING
									</div>
									<div className="text-3xl font-bold">{movie.imdbRating}</div>
								</div>

								{/* Runtime badge */}
								<div className="mt-8 inline-block font-mono text-sm border-l-4 border-black pl-2 uppercase">
									Runtime: {movie.Runtime}
								</div>
							</div>

							{/* Details column */}
							<div className="md:col-span-7">
								<div className="mb-12">
									<div className="flex flex-wrap gap-2 mb-2">
										{movie.Genre.split(", ").map((genre, index) => (
											<span
												key={`genre-${index}-${genre}`}
												className="uppercase font-mono text-[10px] tracking-widest px-3 py-1 border border-black bg-[#F2F2F2] transform -rotate-[0.5deg]"
											>
												{genre}
											</span>
										))}
									</div>

									<div className="flex items-center gap-4 text-sm text-black mb-6">
										<span
											className={`uppercase font-mono text-[10px] tracking-widest px-3 py-1 ${
												movie.Type === "movie"
													? "bg-[#FF6C0A]"
													: movie.Type === "series"
														? "bg-[#39FF14]"
														: "bg-[#00BFFF]"
											} border border-black`}
										>
											{movie.Type}
										</span>
										<span className="font-mono text-xs transform -translate-y-1">
											—
										</span>
										<span className="uppercase font-mono text-[10px] tracking-widest bg-white border border-black px-3 py-1">
											{movie.Rated}
										</span>
									</div>

									<div
										className={`mb-10 font-serif relative ${getRotateClass(2)}`}
									>
										<span className="font-mono uppercase text-[10px] tracking-widest absolute -top-5 left-0 text-black/40">
											PLOT
										</span>
										<p className="leading-relaxed text-lg">{movie.Plot}</p>
										<div className="absolute -bottom-4 right-0 w-8 h-8 bg-[#FFFF00]/20"></div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
										<div className="border-l border-black pl-4 relative">
											<div className="font-mono uppercase text-[10px] tracking-widest absolute -top-2 -left-1 bg-white px-1">
												DIRECTED BY
											</div>
											<p className="mt-3 font-medium">{movie.Director}</p>
										</div>

										<div className="border-l border-black pl-4 relative">
											<div className="font-mono uppercase text-[10px] tracking-widest absolute -top-2 -left-1 bg-white px-1">
												STARRING
											</div>
											<p className="mt-3">{movie.Actors}</p>
										</div>

										<div className="border-l border-black pl-4 relative">
											<div className="font-mono uppercase text-[10px] tracking-widest absolute -top-2 -left-1 bg-white px-1">
												RELEASED
											</div>
											<p className="mt-3">{movie.Released}</p>
										</div>

										<div className="border-l border-black pl-4 relative">
											<div className="font-mono uppercase text-[10px] tracking-widest absolute -top-2 -left-1 bg-white px-1">
												AWARDS
											</div>
											<p className="mt-3">{movie.Awards || "None"}</p>
										</div>
									</div>
								</div>

								<div className="flex flex-wrap items-center justify-end gap-6 pt-6 border-t border-black/30">
									<Button className="bg-black hover:bg-[#FF6C0A] text-white border-2 border-black font-mono uppercase tracking-widest text-xs py-6 relative overflow-hidden group">
										<a
											href={`https://www.imdb.com/title/${movie.imdbID}/`}
											target="_blank"
											rel="noopener noreferrer"
											className="relative z-10 flex items-center"
										>
											<span>VIEW ON IMDB</span>
											<ExternalLink className="ml-2 h-4 w-4" />
											<span className="absolute inset-0 bg-[#FF6C0A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
										</a>
									</Button>

									<span className="font-mono uppercase text-[10px] tracking-widest opacity-40">
										ID: {movie.imdbID}
									</span>
								</div>
							</div>
						</div>

						{/* Footer design element */}
						<div className="mt-24 flex items-end justify-between">
							<span className="font-mono text-[10px] tracking-widest uppercase transform rotate-90 origin-bottom-left translate-y-6">
								CINEMA DATABASE
							</span>
							<div className="w-full h-px bg-black/20 mx-4"></div>
							<div className="w-12 h-12 border-2 border-[#39FF14] transform rotate-45"></div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
