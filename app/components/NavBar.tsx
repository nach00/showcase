import { Button } from "@/components/ui/button";

import * as React from "react";

import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { projects } from "@/projects.ts";

import { H4 } from "@/components/typography";

export default function NavBar() {
  return (
    <NavigationMenu className="px-4 md:px-8 lg:px-12 flex items-baseline border-b-2 border-black relative z-10 py-6 after:content-['SHOWCASE'] after:absolute after:top-1 after:left-4 after:text-xs after:tracking-widest after:font-mono min-w-screen justify-between">
      <H4 className="text-2xl md:text-3xl font-bold tracking-tighter mr-12 uppercase relative">
        <Link to="/" className="hover:line-through transition-all duration-300">
          <i id="whirlybat" className="wb-icon text-red-600">
            E
          </i>
          Natcha Pradappet
        </Link>
      </H4>
      <NavigationMenuList className="ml-auto transform -rotate-1">
        {projects.map((project, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to={project.demo}>{project.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <Button variant="outline">
          <Link to="https://github.com/nach00" className="text-red-600">
            Github
          </Link>
        </Button>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
