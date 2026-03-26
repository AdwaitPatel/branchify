import express from "express";

const app = express();
app.use(express.json());

let environments = {};
let basePort = 3000;

// generate DB name from branch name
function generateDBName(branch) {
  return branch.replace(/-/g, "_") + "_db";
}

// to get next available port for new environment
function getNextPort() {
  basePort++;
  return basePort;
}

// here we have create environment for given branch, we will generate port and db name based on branch name
app.post("/env", (req, res) => {
  const { branch } = req.body;

  if (!branch) {
    return res.status(400).json({ error: "Branch is required" });
  }

  if (environments[branch]) {
    return res.status(400).json({ error: "Environment already exists" });
  }

  const port = getNextPort();
  const dbName = generateDBName(branch);

  environments[branch] = {
    port,
    dbName,
    status: "running",
    pid: Math.floor(Math.random() * 10000)
  };

  res.json({
    message: "Environment created",
    environment: environments[branch]
  });
});

// here we will return all the environments with their details
app.get("/env", (req, res) => {
  res.json(environments);
});

// now we will stop the environment for given branch, we will just change the status to stopped
app.post("/env/:branch/stop", (req, res) => {
  const { branch } = req.params;

  if (!environments[branch]) {
    return res.status(404).json({ error: "Not found" });
  }

  environments[branch].status = "stopped";

  res.json({ message: "Environment stopped" });
});

// delete the environment for given branch, we will remove it from our environments object 
app.delete("/env/:branch", (req, res) => {
  const { branch } = req.params;

  if (!environments[branch]) {
    return res.status(404).json({ error: "Not found" });
  }

  delete environments[branch];

  res.json({ message: "Environment deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;