"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search } from "lucide-react";
import NavBar from "~/components/NavBar";
// Import necessary router components
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";

interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

const MovieService = {
	apiKey: "b7da8d63",

	baseUrl: "https://www.omdbapi.com",

	search: async (searchTerm: string) => {
		try {
			const response = await fetch(
				`${MovieService.baseUrl}/?s=${encodeURIComponent(searchTerm)}&apikey=${
					MovieService.apiKey
				}`,
			);

			if (!response.ok) {
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();

			if (data.Response === "False") {
				throw new Error(data.Error || "No results found");
			}

			return data.Search || [];
		} catch (error) {
			console.error("Search error:", error);
			throw error;
		}
	},
};

interface SearchFormProps {
	onSearch: (searchTerm: string) => void;
	isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const trimmedSearchTerm = searchTerm.trim();

		if (trimmedSearchTerm) {
			onSearch(trimmedSearchTerm);
		}
	};

	// Convert to boolean to avoid hydration mismatches
	const isDisabled = Boolean(isLoading || !searchTerm.trim());

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col sm:flex-row gap-4 pb-8 relative before:content-['QUERY'] before:absolute before:-top-3 before:right-0 before:text-xs before:font-mono before:bg-white before:px-2 before:tracking-widest"
		>
			<div className="relative flex-1">
				<Input
					type="text"
					placeholder="Enter movie title (e.g. Frozen)"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1 pl-12 py-6 border-2 border-black focus:ring-0 focus:border-[#FF6C0A] bg-transparent font-mono placeholder:text-gray-600 placeholder:uppercase placeholder:text-xs placeholder:tracking-wider"
				/>
				<Search
					className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black"
					size={20}
				/>
				<div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#39FF14] border border-black"></div>
			</div>
			<Button
				type="submit"
				disabled={isDisabled}
				className="py-6 px-8 bg-black text-white border-2 border-black hover:bg-[#FF6C0A] hover:border-[#FF6C0A] hover:text-black transition-colors uppercase font-mono tracking-widest text-xs"
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						"Searching..."
					</>
				) : (
					'"Search"'
				)}
			</Button>
		</form>
	);
};

interface ResultsSectionProps {
	results: Movie[];
	onMovieClick: (movieId: string) => void;
}

const ResultsSection = ({ results, onMovieClick }: ResultsSectionProps) => {
	if (results.length === 0) return null;

	return (
		<div className="space-y-6 relative before:content-['RESULTS'] before:absolute before:-top-3 before:left-4 before:bg-white before:px-2 before:text-xs before:font-mono before:tracking-widest before:border before:border-dashed before:border-black">
			<div className="flex justify-between items-center border-t-2 border-b-2 border-black py-4">
				<h2 className="text-xl font-mono uppercase tracking-widest">
					Search Results
				</h2>
				<span className="text-sm font-mono tracking-widest px-2 py-1 bg-[#FFFF00] border border-black">
					"{results.length} FILMS FOUND"
				</span>
			</div>
			<div className="space-y-4 transform -rotate-[0.3deg]">
				{results.map((movie: Movie) => (
					<div key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
						<MovieCard movie={movie} />
					</div>
				))}
			</div>
		</div>
	);
};

const EmptyState = () => (
	<div className="text-center py-24 border-2 border-dashed border-black transform rotate-[0.3deg] relative before:content-['EMPTY'] before:absolute before:-top-3 before:left-4 before:bg-white before:px-2 before:text-xs before:font-mono before:tracking-widest">
		<i
			id="whirlybat"
			className="wb-icon text-8xl mx-auto h-16 w-16 text-[#00BFFF] mb-12 transform rotate-[-45deg]"
		>
			≈
		</i>
		<p className="uppercase font-mono tracking-widest text-sm">
			"Search for movies to see results"
		</p>
		<div className="absolute -top-3 -right-3 w-6 h-6 bg-[#FFFF00] border-2 border-black transform rotate-12"></div>
	</div>
);

// Search component separated from routing
function MovieFinderSearch() {
	const [results, setResults] = useState<Movie[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSearch = async (searchTerm: string) => {
		setError("");
		setIsLoading(true);

		try {
			const searchResults = await MovieService.search(searchTerm);
			setResults(searchResults);
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : String(error));
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleMovieClick = (movieId: string) => {
		navigate(`movie/${movieId}`);
	};

	const hasSearched = isLoading || error || results.length > 0;

	return (
		<>
			<NavBar />
			<div className="max-w-5xl mx-auto px-6 py-12 relative bg-white border-x-2 border-black min-h-screen before:content-['CINEMA'] before:absolute before:top-4 before:right-6 before:text-xs before:tracking-widest before:font-mono">
				<Card className="mb-12 border-2 border-black transform -rotate-[0.2deg]">
					<CardHeader className="pb-4 border-b-2 border-black bg-gradient-to-r from-white via-[#F9F9F9] to-[#FFFF00]/20">
						<CardTitle className="text-center text-3xl md:text-5xl font-bold uppercase tracking-tighter relative after:content-['DATABASE'] after:absolute after:text-xs after:font-mono after:tracking-widest after:-top-4 after:right-0 after:text-gray-500">
							"Movie Finder Version 2.0"
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-8">
						<SearchForm onSearch={handleSearch} isLoading={isLoading} />
					</CardContent>
				</Card>

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

				<ResultsSection results={results} onMovieClick={handleMovieClick} />

				{!hasSearched && <EmptyState />}

				<div className="mt-16 text-right text-xs font-mono tracking-widest uppercase border-t-2 border-black pt-4">
					<span className="bg-[#00BFFF] px-2 py-1">"© FILM DATABASE 2088"</span>
				</div>
			</div>
		</>
	);
}

// Main component that renders a specific route based on the URL
export default function MovieFinder() {
	// Client-side only rendering to avoid hydration mismatches
	const [isClient, setIsClient] = useState(false);

	// Only render the Routes after component mounts on client
	useEffect(() => {
		setIsClient(true);
	}, []);

	// During server-side rendering or initial client render, show minimal placeholder
	if (!isClient) {
		return (
			<div className="p-8 text-center">
				<p className="font-mono tracking-widest text-sm">
					Loading movie finder...
				</p>
			</div>
		);
	}

	// Only render routes on client after mounted (no SSR for routes)
	return (
		<Routes>
			<Route index element={<MovieFinderSearch />} />
			<Route path="movie/:id" element={<MovieDetail />} />
		</Routes>
	);
}
