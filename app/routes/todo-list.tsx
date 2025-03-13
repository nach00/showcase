import { LikeIcon } from "@/components/icons/like";
import { Button } from "@/components/ui/button";
import type { Route } from "./+types/hello-world";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Hello World React Project" },
		{ name: "description", content: "Hello World" },
	];
}

export default function ToDoList() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				ToDo List
			</main>
		</div>
	);
}
