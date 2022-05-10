import express from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./apis/authors/index.js";

const server = express();

const port = 3001;

server.use(express.json());

//****************ENDPOINTS********************* */

server.use("/authors", authorsRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`server is listening on port ${port} !`);
});

server.on("error", (err) => {
  console.log("Error", err);
});
