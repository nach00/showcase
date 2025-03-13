"use client";

import { Button } from "@/components/ui/button";
import {
	AirplayIcon,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Globe,
	Menu,
	Search,
	Ticket,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Airbnb() {
	const support = [
		"Help Center",
		"AirCover",
		"Anti-discrimination",
		"Disablity support",
		"Cancelation options",
		"Report neighborhood concern",
	];

	const hosting = [
		"Airbnb your home",
		"AirCover for hosts",
		"Hosting resources",
		"Community sorum",
		"Hosting responsibly",
		"Airbnb-friendly apartments",
	];

	const airbnb = [
		"Newsroom",
		"New features",
		"Careers",
		"Investors",
		"Airbnb.org emergency stays",
	];

	const [position, setPosition] = React.useState("bottom");
	return (
		<>
			<div className="w-full px-6 sm:px-12 md:px-8 lg:px-20 flex flex-col">
				{/* navbar */}
				<section
					id="navbar"
					className="flex flex-row justify-between items-center pt-5 pb-5 mb-6 sm:mb-16 border-b-neutral-300 border-b"
				>
					<span className="flex gap-4 items-center text-lg font-bold">
						<AirplayIcon />
						Newsroom
					</span>

					<div className="gap-6 hidden md:flex items-center">
						<a className="text-sm" href="/">
							About us
						</a>
						<a className="text-sm" href="/">
							Media assets
						</a>
						<a className="text-sm" href="/">
							Product releases
						</a>
						<a className="text-sm" href="/">
							Contact
						</a>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost">
									<Globe />
									<ChevronDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="">
								<DropdownMenuLabel>Language</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup
									value={position}
									onValueChange={setPosition}
								>
									<DropdownMenuRadioItem value="top">
										English
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="bottom">
										Spanish
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="right">
										French
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<span className="text-sm flex flex-row items-center gap-1">
							<Search size="16" />
							Search
						</span>
					</div>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu />
					</Button>
				</section>

				{/* hero */}
				<section
					id="hero"
					className="flex flex-col-reverse sm:flex-row border-b-neutral-300 border-b pb-16 sm:pb-28 md:pb-24"
				>
					<div className="flex flex-col w-full md:w-3/4 justify-center">
						<span className="text-neutral-500 pb-1 pt-4">
							November 23, 2024
						</span>
						<span className="text-xl md:text-5xl md:pr-6 font-bold pb-4 md:pb-12 ">
							12 Airbnbs that make the holiday merrier
						</span>
						<Button
							className="w-min font-bold text-md"
							size="lg"
							style={{
								backgroundImage:
									"radial-gradient(circle at center center,#ff385c 0,#e61e4d 27.5%,#e31c5f 40%,#d70466 57.5%,#bd1e59 75%,#bd1e59 100%)",
							}}
						>
							Read more
						</Button>
					</div>
					<img
						src="/images/pic1.jpg"
						alt="stock"
						className="rounded-2xl w-1/2"
					/>
				</section>

				{/* latest news */}
				<section id="latest-news" className="flex flex-col pt-8 sm:pt-0 w-full">
					<span className="font-bold text-2xl pb-4">Latest News</span>
					<div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 md:flex-row md:flex">
						{[...Array(4)].map((_, index) => (
							<Card
								key={index}
								className="flex flex-row sm:flex-col border-none"
							>
								<CardHeader>
									<img
										src="/images/pic2.jpg"
										alt="stock"
										className="rounded-xl sm:rounded-t-2xl max-w-[150px] sm:max-w-full"
									/>
								</CardHeader>
								<CardContent className="p-0 pt-4">
									<CardTitle className="sm:text-2xl">
										Velit exercitation laboris sit esse sunt eiusmod irure
										officia sit Lorem mollit sit.
									</CardTitle>
									<CardDescription className="pt-2">
										Card Description
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				{/* social links */}
				<section
					id="social-links"
					className="py-32 flex flex-col text-center align-middle justify-center gap-4 md:py-24"
				>
					<span className="text-xl md:text-2xl font-bold">
						Follow Airbnb for news and travel inspiration
					</span>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							variant="outline"
							className="rounded-full border-black"
							size="icon"
						>
							<Ticket />
						</Button>
						<Button
							variant="outline"
							className="rounded-full border-black"
							size="icon"
						>
							<Ticket />
						</Button>
						<Button
							variant="outline"
							className="rounded-full border-black"
							size="icon"
						>
							<Ticket />
						</Button>
						<Button
							variant="outline"
							className="rounded-full border-black"
							size="icon"
						>
							<Ticket />
						</Button>
					</div>
				</section>

				{/* airbnb icons */}
				<section id="airbnb-icons" className="flex flex-col ">
					<div className="flex flex-col gap-3">
						<span className="text-2xl md:text-4xl font-bold md:text-[28px]">
							The latest Airbnb Icons
						</span>
						<div className="flex flex-col md:flex-row">
							<span className="text-sm sm:text-xl sm:max-w-[400px] md:text-xl w-full md:pb-8">
								Amet adipisicing adipisicing id irure magna ipsum irure ex eu.
								Ad nostrud voluptate qui est. Amet adipisicing adipisicing id
							</span>
							{/* left right buttons */}
							<div className="flex w-full justify-end items-end sm:pb-8">
								<Button variant="outline" className="rounded-full " size="icon">
									<ChevronLeft />
								</Button>
								<Button variant="outline" className="rounded-full " size="icon">
									<ChevronRight />
								</Button>
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-6 overflow-scroll">
						{[...Array(4)].map((_, i) => (
							<Card
								key={i}
								className="min-w-[240px] sm:min-w-[500px] md:min-w-[280px]"
							>
								<CardHeader>
									<img
										src="/images/pic2.jpg"
										alt="stock"
										className="rounded-t-2xl aspect-square"
									/>
								</CardHeader>
								<CardContent>
									<CardTitle className="sm:text-2xl">
										Dolore dolore in ullamco aliquip cupidatat aliqua sunt
										aliquip labore.
									</CardTitle>
								</CardContent>
								<CardFooter>
									<CardDescription>November 11, 2222</CardDescription>
								</CardFooter>
							</Card>
						))}
					</div>
				</section>

				<section id="news-by-topic" className="flex flex-col pt-32 sm:pt-24">
					<div className="flex flex-col">
						<span className="text-3xl font-bold pb-6 sm:pb-4">
							News by topic
						</span>

						<ToggleGroup
							variant="outline"
							type="multiple"
							className="flex flex-wrap sm:justify-start"
						>
							<ToggleGroupItem value="all" aria-label="all">
								All
							</ToggleGroupItem>
							<ToggleGroupItem value="company" aria-label="com">
								Company
							</ToggleGroupItem>
							<ToggleGroupItem value="stays" aria-label="sta">
								Stays
							</ToggleGroupItem>
							<ToggleGroupItem value="product" aria-label="prod">
								Product
							</ToggleGroupItem>
							<ToggleGroupItem value="policy" aria-label="pol">
								Policy
							</ToggleGroupItem>
							<ToggleGroupItem value="community" aria-label="com">
								Community
							</ToggleGroupItem>
							<ToggleGroupItem value="dotorg" aria-label="airbnb.org">
								Airbnb.org
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<div className="flex flex-col gap-6 pt-6 sm:grid sm:grid-cols-3 md:grid-cols-4">
						{[...Array(8)].map((_, i) => (
							<Card key={i} className="flex flex-row sm:flex-col pb-8">
								<CardHeader>
									<img
										src="/images/pic2.jpg"
										alt="stock"
										className="rounded-xl sm:rounded-t-xl max-w-[150px] sm:max-w-full"
									/>
								</CardHeader>
								<CardContent className="p-0 pt-4">
									<CardTitle className="leading-6 md:text-xl">
										Commodo Lorem qui amet sint ut irure in excepteur quis
										fugiat.
									</CardTitle>
									<CardDescription className="pt-2">
										November 11, 2222
									</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>

					<Button
						variant="outline"
						className="border-black rounded-lg w-min mt-10"
					>
						View more
					</Button>
				</section>
				<section id="footer" className="flex flex-col  pt-32">
					<div className="flex flex-col-reverse sm:flex-row justify-center align-middle gap-8 w-full">
						<div className="w-full">
							<img
								src="/images/pic2.jpg"
								alt="stock"
								className="rounded-2xl aspect-square md:aspect-auto lg:max-h-[300px] lg:w-full"
							/>
						</div>
						<div className="w-full flex flex-col gap-3 align-middle items-center sm:items-start sm:justify-center">
							<span className="text-2xl font-bold text-center sm:text-left sm:text-3xl">
								What makes Airbnb, Airbnb
							</span>
							<span className="text-lg text-center">
								A letter from our founders
							</span>
							<Button
								size="lg"
								className="border-black rounded-lg w-min text-lg font-bold"
							>
								Read more
							</Button>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-12 border-t-neutral-300 sm:mt-28 mt-12">
						<div className="flex flex-col gap-2 w-full">
							<span className="font-bold">Support</span>
							<div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 lg:flex-col lg:flex">
								{support.map((item) => (
									<span className="text-sm" key={item}>
										{item}
									</span>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<span className="font-bold">Hosting</span>
							<div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 lg:flex-col lg:flex">
								{hosting.map((item) => (
									<span key={item}>{item}</span>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<span className="font-bold">Airbnb</span>
							<div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 lg:flex-col lg:flex">
								{airbnb.map((item) => (
									<span key={item}>{item}</span>
								))}
							</div>
						</div>
					</div>
					<div className="pt-12 flex flex-col">
						<span className="font-bold">Disclaimer</span>
						<span className="max-w-screen-md">
							Sit exercitation cupidatat id sint duis ea nisi consequat
							adipisicing voluptate aliqua irure. Excepteur magna aliqua labore
							tempor elit cupidatat adipisicing et. Laborum nulla laborum
							reprehenderit sit. Est labore labore veniam consequat sit nostrud
							mollit ut. Anim enim est est voluptate minim duis nostrud.
						</span>
					</div>

					<div className="pt-4 mt-12 border-t border-t-neutral-300">
						(c) 2024 Airbnb Inc.
					</div>
				</section>
			</div>
		</>
	);
}
