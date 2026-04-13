import express from "express";
import mongoose from "mongoose";
import { fork } from "child_process";

import Environment from "./models/Environment.js";

const app = express();

app.use(express.json());

let basePort = 3000;

/* MongoDB connection */

mongoose.connect("mongodb://127.0.0.1:27017/branchify");

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});


/* IPC manager */

const manager = fork("./src/manager/envManager.js");

manager.on("message", (msg) => {
  console.log("Manager response:", msg);
});


/* helper functions */

function generateDBName(branch) {
  return branch.replace(/-/g, "_") + "_db";
}

function getNextPort() {
  basePort++;
  return basePort;
}


/* Create environment */

app.post("/env", async (req, res) => {

  const { branch, env } = req.body;

  if (!branch) {
    return res.status(400).json({ error: "Branch required" });
  }

  const exists = await Environment.findOne({ branch });

  if (exists) {
    return res.status(400).json({ error: "Environment already exists" });
  }

  const port = getNextPort();

  const dbName = generateDBName(branch);

  manager.send({
    type: "create",
    data: { branch, port }
  });

  const environment = await Environment.create({
    branch,
    port,
    dbName,
    pid: Math.floor(Math.random() * 10000)
  });

  res.json({
    message: "Environment created",
    environment: env
  });

});


/* List environments */

app.get("/env", async (req, res) => {

  const envs = await Environment.find();

  res.json(envs);

});


/* Stop environment */

app.post("/env/:branch/stop", async (req, res) => {

  const { branch } = req.params;

  const env = await Environment.findOne({ branch });

  if (!env) {
    return res.status(404).json({ error: "Not found" });
  }

  env.status = "stopped";

  await env.save();

  manager.send({
    type: "stop",
    data: { branch }
  });

  res.json({ message: "Environment stopped" });

});


/* Delete environment */

app.delete("/env/:branch", async (req, res) => {

  const { branch } = req.params;

  await Environment.deleteOne({ branch });

  res.json({ message: "Environment deleted" });

});


/* Aggregation report */

app.get("/env/report", async (req, res) => {

  const stats = await Environment.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(stats);

});

export default app;
