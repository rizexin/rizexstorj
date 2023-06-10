const express = require("express");
const { spawn } = require("child_process");

const app = express();

let sessionLoop;

function startSessionLoop() {
  // Spawn the session loop as a child process
  sessionLoop = spawn("node", ["loop.js"]);

  // Handle errors from the session loop
  sessionLoop.on("error", (error) => {
    console.error(`Session loop error: ${error.message}`);
  });
  // Pipe the session loop's stdout to the parent process's stdout
  sessionLoop.stdout.pipe(process.stdout);
  // Handle exit events from the session loop
  sessionLoop.on("exit", (code, signal) => {
    console.log(`Session loop exited with code ${code} and signal ${signal}`);

    // Respawn the session loop if it exited unexpectedly
    if (code !== 0 || code === 0) {
      console.log("Respawning session loop...");
      startSessionLoop();
    }
  });
}

startSessionLoop();

// Define a simple endpoint
app.get("/", (req, res) => {
  console.log("Endpoint hit!");
  res.send("Endpoint hit!");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
