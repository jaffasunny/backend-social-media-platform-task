import "dotenv/config";
import connectDB from "./db/index";
import { app } from "./app";

const PORT = process.env.PORT || 8000;

connectDB()
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running at port: ${PORT}`);
		})
	)
	.catch((err) => {
		console.log("MONGO db connection failed !!!", err);
		throw err;
	});
