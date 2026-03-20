import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Branchify backend is running......")
})

export default app;
