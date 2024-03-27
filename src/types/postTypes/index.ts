import mongoose from "mongoose";

export interface IPost extends Document {
	title: string;
	description: string;
	image: string;
	authorId: mongoose.Schema.Types.ObjectId;
	price: number;
	quantity: number;
	createdAt: Date;
	updatedAt: Date;
}
