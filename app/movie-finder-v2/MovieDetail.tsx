"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import NavBar from "~/components/NavBar";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

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

			const data = await response.json();

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
	const navigate = useNavigate();
	const id = params.id as string;
	const [movie, setMovie] = useState<MovieDetail | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	const handleGoBack = () => {
		navigate("..");
	};

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

	return (
		<>
			<NavBar />
			<div className="max-w-5xl mx-auto px-6 py-12 relative bg-white border-x-2 border-black min-h-screen before:content-['DETAIL'] before:absolute before:top-4 before:right-6 before:text-xs before:tracking-widest before:font-mono">
				<div className="mb-6">
					<Button
						onClick={handleGoBack}
						className="font-mono tracking-widest text-xs uppercase"
					>
						← "Back to search"
					</Button>
				</div>

				{isLoading && (
					<div className="flex justify-center items-center py-24">
						<Loader2 className="h-8 w-8 animate-spin mr-2" />
						<p className="font-mono tracking-widest text-sm">
							"Loading movie details..."
						</p>
					</div>
				)}

				{error && (
					<Alert
						variant="destructive"
						className="mb-8 border-2 border-[#FF0000] bg-black text-white p-4 transform rotate-[0.2deg] relative before:content-['ERROR'] before:absolute before:-top-3 before:left-4 before:bg-[#FF0000] before:text-white before:px-2 before:text-xs before:font-mono before:tracking-widest before:border before:border-white"
					>
						<AlertDescription className="font-mono tracking-wide text-sm">
							{error}
						</AlertDescription>
					</Alert>
				)}

				{movie && (
					<Card className="border-2 border-black transform -rotate-[0.2deg] overflow-hidden">
						<CardContent className="p-0">
							<div className="flex flex-col md:flex-row">
								<div className="md:w-1/3 p-6 border-r-2 border-black bg-[#F9F9F9]">
									<div className="border-2 border-black p-2 transform rotate-[0.5deg] bg-white">
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

									<div className="mt-6 space-y-2">
										<div className="flex justify-between items-center">
											<span className="font-mono text-xs tracking-widest uppercase">
												"IMDB Rating"
											</span>
											<span className="font-bold text-lg bg-[#FFFF00] px-2 border border-black">
												{movie.imdbRating}/10
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="font-mono text-xs tracking-widest uppercase">
												"Runtime"
											</span>
											<span className="font-mono">{movie.Runtime}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="font-mono text-xs tracking-widest uppercase">
												"Rated"
											</span>
											<span className="font-mono">{movie.Rated}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="font-mono text-xs tracking-widest uppercase">
												"Year"
											</span>
											<span className="font-mono">{movie.Year}</span>
										</div>
									</div>
								</div>

								<div className="md:w-2/3 p-6">
									<h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
										{movie.Title}
									</h1>

									<div className="flex flex-wrap gap-2 mb-6">
										{movie.Genre.split(", ").map((genre) => (
											<span
												key={genre}
												className="uppercase font-mono text-xs tracking-widest px-3 py-1 border-2 border-black bg-[#39FF14]"
											>
												{genre}
											</span>
										))}
									</div>

									<div className="space-y-6 font-mono">
										<div>
											<h3 className="text-xs uppercase tracking-widest mb-2 border-b border-black pb-1 inline-block">
												"Plot"
											</h3>
											<p className="leading-relaxed">{movie.Plot}</p>
										</div>

										<div>
											<h3 className="text-xs uppercase tracking-widest mb-2 border-b border-black pb-1 inline-block">
												"Director"
											</h3>
											<p>{movie.Director}</p>
										</div>

										<div>
											<h3 className="text-xs uppercase tracking-widest mb-2 border-b border-black pb-1 inline-block">
												"Cast"
											</h3>
											<p>{movie.Actors}</p>
										</div>

										<div>
											<h3 className="text-xs uppercase tracking-widest mb-2 border-b border-black pb-1 inline-block">
												"Awards"
											</h3>
											<p>{movie.Awards}</p>
										</div>

										<div className="pt-4">
											<Button
												asChild
												className="uppercase font-mono tracking-widest text-xs"
											>
												<a
													href={`https://www.imdb.com/title/${movie.imdbID}/`}
													target="_blank"
													rel="noopener noreferrer"
												>
													"View on IMDB"
												</a>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</>
	);
}
