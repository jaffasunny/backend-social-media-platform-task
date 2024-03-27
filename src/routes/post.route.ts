import { Router } from "express";
import {
	createSinglePost,
	getAllPosts,
	removePost,
	updatePost,
	getSinglePost,
} from "../controllers/post.controller";
import { authMiddleware, roleCheck } from "../middlewares/auth.middleware";

const router = Router();

router
	.route("/")
	.get(authMiddleware, getAllPosts)
	.post(authMiddleware, roleCheck("author"), createSinglePost);

router
	.route("/:id")
	.get(authMiddleware, getSinglePost)
	.patch(authMiddleware, roleCheck("author"), updatePost)
	.delete(authMiddleware, roleCheck("author"), removePost);

export default router;
