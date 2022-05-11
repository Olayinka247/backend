import express from "express";
// import the core module for file path
import { fileURLToPath } from "url";
// import the core module for file directory(dir)
import { dirname, join } from "path";
// import the core module fs
import fs from "fs";
import uniqid from "uniqid";

const authorsRouter = express.Router();

// ways to locate author.json paths
// Target is to locate author.json C:\Users\olayi\OneDrive\Desktop\Backend\backend\src\apis\authors\authors.json
// begin with the index file which is the current path

// const currentFileURL = import.meta.url;
// console.log("PRESENT FILE URL :", currentFileURL);

// const currentFilePath = fileURLToPath(currentFileURL);
// console.log("PRESENT FILE PATH :", currentFilePath);

// locate parent folder path that has both

// const parentFolderPath = dirname(currentFilePath);
// console.log("PARENT FOLDER PATH :", parentFolderPath);

// concatenate/join both paths together
// const authorsJSONPath = join(parentFolderPath, "authors.json");
// console.log("AUTHORS JSON PATH :", authorsJSONPath);

// the shortest syntax
const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);
//  POST AUTHOR
authorsRouter.post("/", (req, res) => {
  console.log("Request Body :", req.body);
  // add server generated information
  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
  // read user.json file
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  // push new user to the array
  authors.push(newAuthor);
  // write the array back to file
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  //send a response
  res.status(201).send(newAuthor);
});

// GET AUTHORS
authorsRouter.get("/", (req, res) => {
  const authorFIleContent = fs.readFileSync(authorsJSONPath);
  const authorsArray = JSON.parse(authorFIleContent);
  res.send(authorsArray);
});

// GET AUTHORS BY ID

authorsRouter.get("/:id", (req, res) => {
  const authorID = req.params.id;
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const findAuthor = authors.find((author) => author.id === authorID);
  res.send(findAuthor);
});
authorsRouter.put("/:authorsId", (req, res) => {
  // read the file to edit
  const authorEdit = JSON.parse(fs.readFileSync(authorsJSONPath));
  console.log("Autor Edit :", authorEdit);
  // locate the details to edit using the ID
  const locateIndex = authorEdit.findIndex(
    (author) => author.id === req.params.authorsId
  );
  // connect all old authors with the edited and located authors
  const oldAuthor = authorEdit[locateIndex];

  //update the authors upon edit with ID
  const updatedAuthors = {
    ...oldAuthor,
    ...req.body,
    updatedAt: new Date(),
  };

  authorEdit[locateIndex] = updatedAuthors;
  // save the edited author array back to the file .
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorEdit));

  // send a response
  res.send(updatedAuthors);
});
authorsRouter.delete("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.authorId
  );
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));
  res.status(204).send;
});

export default authorsRouter;
