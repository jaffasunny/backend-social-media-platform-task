import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(
	express.json({
		limit: "16kb",
	})
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// routes declaration
app.get("/", (req, res) => {
	return res
		.status(200)
		.send(
			"<h1>Welcome to intial route for Backend Social Media Platform...</h1>"
		);
});

// auth routes
app.use("/api/v1/users", userRouter);

// posts routes
app.use("/api/v1/posts", postRouter);

// http://localhost:8000/api/v1/users/register

export { app };
