import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
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
			required: [true, "Post image is required!!"],
			trim: true,
		},
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		price: {
			type: Number,
			required: [true, "Price is required!!"],
			trim: true,
		},
		quantity: {
			type: Number,
			required: [true, "Quantity is required!!"],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Post = mongoose.model("Post", postSchema);
