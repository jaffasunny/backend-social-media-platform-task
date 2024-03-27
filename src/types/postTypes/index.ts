import mongoose from "mongoose";
import { IComment } from "../commentTypes";

export interface IPost extends Document {
	title: string;
	description: string;
	image: string;
	authorId: mongoose.Schema.Types.ObjectId;
	likes: string[];
	comments: IComment[];
	createdAt: Date;
	updatedAt: Date;
}
