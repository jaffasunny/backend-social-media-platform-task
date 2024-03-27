import mongoose from "mongoose";

export interface IComment extends Document {
	authorId: mongoose.Schema.Types.ObjectId;
	content: string;
}
