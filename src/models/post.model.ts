import mongoose, { Schema } from "mongoose";
import { IPost } from "../types/postTypes";

const postSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: [true, "Post Name is required!!"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "Post description is required!!"],
			trim: true,
		},
		image: {
			type: String,
			trim: true,
		},
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	},
	{
		timestamps: true,
	}
);

export const Post = mongoose.model<IPost>("Post", postSchema);
