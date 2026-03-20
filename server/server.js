import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config({
	path: ".env.dev"
});

const port = process.env.port || 3000;

app.listen(port, () => {
	console.log(`Server is running on => http://localhost:${port}`)
})
