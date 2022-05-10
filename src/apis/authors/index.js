import express from "express";

const authorsRouter = express.Router();

authorsRouter.post("/", (request, response) => {});
authorsRouter.get("/", (request, response) => {
  response.send({ message: "Router Created" });
});
authorsRouter.get("/:authorId", (request, response) => {});
authorsRouter.put("/:authorsId", (request, response) => {});
authorsRouter.delete("/:authorsId", (request, response) => {});

export default authorsRouter;
