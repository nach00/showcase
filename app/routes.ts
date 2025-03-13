import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
	index("./routes/home.tsx"),
	route("hello-world", "./routes/hello-world.tsx"),
	route("airbnb-clone", "./routes/airbnb-clone.tsx"),
	route("apple-clone", "./routes/apple-clone.tsx"),
	// route("newsweex-clone", "./routes/newsweek-clone.tsx"),
	route("stopwatch", "./routes/stopwatch.tsx"),
	route("stock-portfolio", "./routes/stock-portfolio.tsx"),
	route("currency-converter", "./routes/currency-converter.tsx"),
	route("movie-finder", "./routes/movie-finder.tsx"),
	route("todo-list", "./routes/todo-list.tsx"),
] satisfies RouteConfig;
