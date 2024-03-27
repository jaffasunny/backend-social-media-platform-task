import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/commentTypes";

const commentSchema = new Schema<IComment>(
	{
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			required: [true, "Comment content is required!!"],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
