import express from "express";

const authorsRouter = express.Router();

authorsRouter.post("/", (request, response) => {
  response.send({ message: "POSTED" });
});
authorsRouter.get("/", (request, response) => {
  response.send({ message: "Router Created" });
});
authorsRouter.get("/:authorId", (request, response) => {
  response.send({ message: "Created BY ID" });
});
authorsRouter.put("/:authorsId", (request, response) => {
  response.send({ message: "Edited" });
});
authorsRouter.delete("/:authorsId", (request, response) => {
  response.send({ message: "Deleted" });
});

export default authorsRouter;
