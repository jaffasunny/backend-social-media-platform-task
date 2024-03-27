import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";

const getAllPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find().populate("authorId");

	if (!posts) {
		throw new ApiError(404, "No posts available!");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, posts, "Posts successfully fetched!"));
});

const getSinglePost = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const post = await Post.findById(id).populate("authorId");

	if (!post) {
		throw new ApiError(404, "No such post available!");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, post, "Posts successfully fetched!"));
});

const createSinglePost = asyncHandler(async (req, res) => {
	const { title, description, image } = req.body;

	// extracting seller id from authentication middleware
	const { _id: authorId } = req.user;

	const posts = await Post.find({ title });

	if (posts.length) {
		throw new ApiError(404, "Post already exists!");
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

const updatePost = asyncHandler(async (req, res) => {
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

const removePost = asyncHandler(async (req, res) => {
	const { title, authorId, description, image } = req.body;
	const { id } = req.params;

	const posts = await Post.findById(id);

	if (!posts) {
		throw new ApiError(404, "Post doesn't exist!");
	}

	const deletedPost = await Post.findByIdAndDelete(
		id,
		{
			title,
			authorId,
			description,
			image,
		},
		{ runValidators: true }
	);

	if (!deletedPost) {
		throw new ApiError(500, "Something went wrong while creating post!");
	}

	return res
		.status(201)
		.json(new ApiResponse(200, deletedPost, "Post deleted successfully!"));
});

export { getAllPosts, createSinglePost, updatePost, removePost, getSinglePost };
