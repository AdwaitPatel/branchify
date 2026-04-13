import mongoose from "mongoose";

const EnvironmentSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
    unique: true
  },
  port: Number,
  dbName: String,
  status: {
    type: String,
    default: "running"
  },
  pid: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Environment", EnvironmentSchema);

