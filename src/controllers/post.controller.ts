import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Post } from "../models/post.model";
import { Request, Response } from "express";
import { IComment } from "../types/commentTypes";

const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
	const posts = await Post.find().populate("authorId");

	if (!posts) {
		throw new ApiError(404, "No posts available!");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, posts, "Posts successfully fetched!"));
});

const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const post = await Post.findById(id).populate("authorId");

	if (!post) {
		throw new ApiError(404, "No such post available!");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, post, "Posts successfully fetched!"));
});

const createSinglePost = asyncHandler(async (req: Request, res: Response) => {
	const { title, description, image } = req.body;

	// extracting author id from authentication middleware
	const { _id: authorId } = req.user;

	if (!title || !description) {
		throw new ApiError(400, "Please enterall fields!");
	}

	const post = await Post.create({
		title,
		authorId,
		description,
		image,
	});

	const createdPost = await Post.findById(post._id);

	if (!createdPost) {
		throw new ApiError(500, "Something went wrong while creating post!");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, createdPost, "Post created successfully!"));
});

const updatePost = asyncHandler(async (req: Request, res: Response) => {
	const { title, authorId, description, image } = req.body;
	const { id } = req.params;

	const posts = await Post.findById(id);

	if (!posts) {
		throw new ApiError(404, "Post doesn't exist!");
	}

	const updatedPost = await Post.findByIdAndUpdate(
		id,
		{
			title,
			authorId,
			description,
			image,
		},
		{ new: true, runValidators: true }
	);

	if (!updatedPost) {
		throw new ApiError(500, "Something went wrong while creating post!");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, updatedPost, "Post updated successfully!"));
});

const removePost = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;

	const posts = await Post.findById(id);

	if (!posts) {
		throw new ApiError(404, "Post doesn't exist!");
	}

	const deletedPost = await Post.findByIdAndDelete(id, {
		runValidators: true,
	});

	if (!deletedPost) {
		throw new ApiError(500, "Something went wrong while creating post!");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, deletedPost, "Post deleted successfully!"));
});

const likePost = asyncHandler(async (req: Request, res: Response) => {
	const { postId } = req.params;

	const { _id: authorId } = req.user;

	const post = await Post.findById(postId);

	if (!post) {
		throw new ApiError(400, "Post not found!");
	}

	const likedIndex = post.likes.indexOf(authorId);

	if (likedIndex !== -1) {
		post.likes.splice(likedIndex, 1);
	} else {
		post.likes.push(authorId);
	}

	await post.save();

	return res
		.status(201)
		.json(
			new ApiResponse(
				200,
				likedIndex !== -1
					? "Post unliked successfully"
					: "Post liked successfully"
			)
		);
});

const commentPost = asyncHandler(async (req: Request, res: Response) => {
	const { postId } = req.params;
	const { content } = req.body;
	const { _id: authorId } = req.user;

	const post = await Post.findById(postId);

	if (!post) {
		throw new ApiError(400, "Post not found!");
	}

	const newComment = {
		authorId,
		content,
	} as IComment;

	post.comments.push(newComment);
	await post.save();

	return res
		.status(201)
		.json(
			new ApiResponse(
				200,
				{ comment: newComment },
				"Comment added successfully"
			)
		);
});

export {
	getAllPosts,
	createSinglePost,
	updatePost,
	removePost,
	getSinglePost,
	likePost,
	commentPost,
};
