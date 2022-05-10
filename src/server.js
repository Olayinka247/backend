import express from "express";

const server = express();

// const port = 3001;

server.listen(3001, () => {
  console.log(`server is listening on port 3001 !`);
});

server.on("error", (err) => {
  console.log("Err", err);
});
