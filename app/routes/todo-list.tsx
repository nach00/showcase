import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import NavBar from "~/components/NavBar";

// Define interfaces for type safety
interface Task {
	id: number;
	content: string;
	completed: boolean;
}

interface TaskResponse {
	tasks: Task[];
}

// Helper functions for fetch requests
const checkStatus = (response: Response): Response => {
	if (response.ok) {
		return response;
	}
	throw new Error("Request was either a 404 or 500");
};

const json = (response: Response) => response.json();

// Task component for rendering individual tasks
const Task = ({
	task,
	onDelete,
	onComplete,
}: {
	task: Task;
	onDelete: (id: number) => void;
	onComplete: (id: number, completed: boolean) => void;
}) => {
	const { id, content, completed } = task;
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div
			className={`flex items-center p-4 border-b border-black transform transition-all duration-300 ${
				isHovered ? "translate-x-2 bg-yellow-50" : ""
			}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<p
				className={`flex-grow font-mono uppercase tracking-tight ${
					completed ? "line-through text-gray-600 italic" : "text-black"
				}`}
			>
				{content}
			</p>
			<Button
				className="rounded-none ml-2 px-3 py-1 bg-black text-yellow-300 hover:bg-yellow-300 hover:text-black border border-black transition-all duration-300 uppercase text-xs tracking-widest transform hover:scale-105 active:scale-95"
				onClick={() => onDelete(id)}
			>
				DELETE
			</Button>
			<div className="ml-4 relative">
				<input
					className="h-5 w-5 opacity-0 absolute z-10 cursor-pointer"
					type="checkbox"
					onChange={() => onComplete(id, completed)}
					checked={completed}
				/>
				<div
					className={`h-5 w-5 border ${
						completed ? "bg-yellow-300" : "bg-transparent"
					} border-black transition-all duration-300 ${
						isHovered && !completed ? "bg-yellow-100" : ""
					}`}
				></div>
			</div>
		</div>
	);
};

// Main TodoList component
const TodoList = () => {
	const API_KEY = "1361"; // Replace with your API key

	const [newTask, setNewTask] = useState<string>("");
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
	const [error, setError] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [animateTitle, setAnimateTitle] = useState<boolean>(false);

	// Fetch tasks from API
	const fetchTasks = () => {
		fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${API_KEY}`)
			.then(checkStatus)
			.then(json)
			.then((response: TaskResponse) => {
				setTasks(response.tasks);
			})
			.catch((error: Error) => {
				setError(error.message);
				console.error(error.message);
			});
	};

	// Load tasks when component mounts
	useEffect(() => {
		fetchTasks();

		// Add title animation on initial load
		setAnimateTitle(true);
		const timer = setTimeout(() => setAnimateTitle(false), 1000);

		return () => clearTimeout(timer);
	}, []);

	// Handle new task input change
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTask(event.target.value);
	};

	// Handle form submit to create new task
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let taskContent = newTask.trim();
		if (!taskContent) {
			return;
		}

		setIsSubmitting(true);

		fetch(`https://fewd-todolist-api.onrender.com/tasks?api_key=${API_KEY}`, {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				task: {
					content: taskContent,
				},
			}),
		})
			.then(checkStatus)
			.then(json)
			.then(() => {
				setNewTask("");
				fetchTasks();
				setIsSubmitting(false);
			})
			.catch((error: Error) => {
				setError(error.message);
				console.error(error);
				setIsSubmitting(false);
			});
	};

	// Delete a task
	const deleteTask = (id: number) => {
		if (!id) {
			return;
		}

		fetch(
			`https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=${API_KEY}`,
			{
				method: "DELETE",
				mode: "cors",
			},
		)
			.then(checkStatus)
			.then(json)
			.then(() => {
				fetchTasks();
			})
			.catch((error: Error) => {
				setError(error.message);
				console.error(error);
			});
	};

	// Toggle task completion status
	const toggleComplete = (id: number, completed: boolean) => {
		if (!id) {
			return;
		}

		const newState = completed ? "active" : "complete";

		fetch(
			`https://fewd-todolist-api.onrender.com/tasks/${id}/mark_${newState}?api_key=${API_KEY}`,
			{
				method: "PUT",
				mode: "cors",
			},
		)
			.then(checkStatus)
			.then(json)
			.then(() => {
				fetchTasks();
			})
			.catch((error: Error) => {
				setError(error.message);
				console.error(error);
			});
	};

	// Handle filter change
	const toggleFilter = (filterName: "all" | "active" | "completed") => {
		setFilter(filterName);
	};

	// Filter tasks based on current filter
	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") {
			return true;
		} else if (filter === "active") {
			return !task.completed;
		} else {
			return task.completed;
		}
	});

	return (
		<>
			<NavBar />
			<div className="container mx-auto max-w-xl p-8 bg-white min-h-screen">
				<h2
					className={`text-5xl font-bold mb-8 uppercase tracking-tighter italic transform -rotate-1 border-b-4 border-yellow-400 pb-3 transition-all duration-500 ${
						animateTitle ? "scale-105 text-yellow-400" : "text-black"
					}`}
					onClick={() => setAnimateTitle(!animateTitle)}
				>
					<span className="font-normal">TO-DO</span> LIST
				</h2>

				{/* Task list */}
				<div className="mb-8 border-2 border-black transform rotate-0.5 bg-white shadow-lg overflow-hidden">
					{filteredTasks.length > 0 ? (
						filteredTasks.map((task) => (
							<Task
								key={task.id}
								task={task}
								onDelete={deleteTask}
								onComplete={toggleComplete}
							/>
						))
					) : (
						<p className="p-4 font-mono uppercase tracking-wide italic text-black">
							NO TASKS HERE
						</p>
					)}
				</div>

				{/* Filter options */}
				<div className="flex mb-8 space-x-4 justify-center">
					<Button
						className={`rounded-none px-4 py-2 uppercase text-xs tracking-widest transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 ${
							filter === "all"
								? "bg-black text-yellow-300 border-2 border-black"
								: "bg-transparent text-black border-2 border-black hover:bg-yellow-100"
						}`}
						onClick={() => toggleFilter("all")}
					>
						All
					</Button>
					<Button
						className={`rounded-none px-4 py-2 uppercase text-xs tracking-widest transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 ${
							filter === "active"
								? "bg-black text-yellow-300 border-2 border-black"
								: "bg-transparent text-black border-2 border-black hover:bg-yellow-100"
						}`}
						onClick={() => toggleFilter("active")}
					>
						Active
					</Button>
					<Button
						className={`rounded-none px-4 py-2 uppercase text-xs tracking-widest transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 ${
							filter === "completed"
								? "bg-black text-yellow-300 border-2 border-black"
								: "bg-transparent text-black border-2 border-black hover:bg-yellow-100"
						}`}
						onClick={() => toggleFilter("completed")}
					>
						Completed
					</Button>
				</div>

				{/* New task form */}
				<form
					onSubmit={handleSubmit}
					className="flex items-center mb-8 transform -rotate-0.5 group"
				>
					<input
						type="text"
						className="flex-grow p-4 border-2 border-black font-mono uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-400 transition-all duration-300"
						placeholder="ADD A NEW TASK"
						value={newTask}
						onChange={handleChange}
					/>
					<Button
						type="submit"
						className={`rounded-none h-full px-8 py-4 bg-black text-yellow-300 uppercase tracking-widest text-sm hover:bg-yellow-300 hover:text-black border-6 border-black transition-all duration-300 transform active:scale-95 ${
							isSubmitting ? "animate-pulse" : ""
						}`}
						disabled={isSubmitting}
					>
						{isSubmitting ? "..." : "Add"}
					</Button>
				</form>

				{/* Error message */}
				{error && (
					<div className="mt-6 p-4 border-2 border-black bg-yellow-100 text-black font-mono uppercase tracking-wide transform rotate-0.5 animate-pulse">
						{error}
					</div>
				)}

				{/* Virgil-style signature */}
				<div className="mt-12 text-right">
					<p className="text-xs text-black font-mono tracking-widest uppercase hover:tracking-wider transition-all duration-300">
						<span className="bg-yellow-300 px-2 py-0.5 transform inline-block -rotate-1 hover:rotate-0 transition-transform duration-300">
							TODO LIST
						</span>{" "}
						c/o 2088
					</p>
				</div>
			</div>
		</>
	);
};

export default TodoList;
