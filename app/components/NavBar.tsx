import { Button } from "@/components/ui/button";
("use client");

import * as React from "react";

import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { projects } from "@/projects.ts";

import { H2, H3, H4 } from "@/components/typography";

export default function NavBar() {
	return (
		<NavigationMenu className="px-4 md:px-8 lg:px-12 flex items-baseline border-b-2 border-black relative z-10 py-6 after:content-['SHOWCASE'] after:absolute after:top-1 after:left-4 after:text-xs after:tracking-widest after:font-mono min-w-screen justify-between">
			<H4 className="text-2xl md:text-3xl font-bold tracking-tighter mr-12 uppercase relative">
				{/* <H4 className="text-2xl md:text-3xl font-bold tracking-tighter mr-12 uppercase relative before:content-['*'] before:absolute before:text-red-600 before:-left-4 before:top-0"> */}
				<Link to="/" className="hover:line-through transition-all duration-300">
					<i id="whirlybat" className="wb-icon text-red-600">
						E
					</i>
					Natcha Pradappet
				</Link>
			</H4>
			<NavigationMenuList className="ml-auto transform -rotate-1">
				{projects.map((project) => (
					<NavigationMenuItem>
						<Link to={project.demo}>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								{project.title}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
				{/* <NavigationMenuItem> */}
				{/* 	<NavigationMenuTrigger className="text-red-600 font-black font-mono tracking-wider uppercase border-dashed border border-black hover:bg-black hover:text-white transition-all"> */}
				{/* 		PROJECTS */}
				{/* 	</NavigationMenuTrigger> */}
				{/* 	<NavigationMenuContent> */}
				{/* 		<ul className="grid w-[400px] gap-3 p-6 md:w-[550px] md:grid-cols-2 lg:w-[650px] bg-white border-2 border-black relative before:content-['WORK'] before:absolute before:-top-3 before:left-4 before:bg-white before:px-2 before:text-xs before:tracking-widest before:font-mono"> */}
				{/* 			{projects.map((project) => ( */}
				{/* 				<ListItem */}
				{/* 					key={project.title} */}
				{/* 					title={project.title} */}
				{/* 					href={project.demo} */}
				{/* 				> */}
				{/* 					{project.description} */}
				{/**/}
				{/* 				</ListItem> */}
				{/* 			))} */}
				{/* 		</ul> */}
				{/* 	</NavigationMenuContent> */}
				{/* </NavigationMenuItem> */}
				<Button variant="outline">
					<Link to="https://github.com/nach00" className="text-red-600">
						Github
					</Link>
				</Button>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li className="relative">
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-black hover:text-white transform hover:translate-x-1 hover:-translate-y-1 border-l border-dotted border-black",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-mono uppercase tracking-wider">
						{title}
					</div>
					<p className="line-clamp-2 text-xs leading-snug text-muted-foreground font-light italic">
						"{children}"
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
