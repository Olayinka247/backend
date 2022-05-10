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

authorsRouter.post("/", (request, response) => {
  // read request body
  console.log("Request Body :", request.body);
  // add server generated information
  const newAuthor = { ...request.body, createdAt: new Date(), id: uniqid() };
  console.log("NEW AUthor :", newAuthor);
  // read user.json file
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
  // push new user to the array
  authors.push(newAuthor);
  // write the array back to file
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));
  //send a response
  response.status(201).send({ id: newAuthor.id });
});

// authorsRouter.get("/", (request, response) => {
//   // Steps to follow
//   //1.read the content in authors.json file
//   const fileContent = fs.readFileSync(authorsJSONPath);
//   console.log("File Details:", fileContent);
//   //2.obtain an array from the file
//   const authorsArray = JSON.parse(fileContent);
//   console.log("Array information:", authorsArray);
//   //3. send back the array as response

//   response.send(authorsArray);
// });

// authorsRouter.get("/:authorId", (request, response) => {
//   // fetching by ID  STEPS
//   //locate the authors ID from the url
//   const authorID = request.params.authorId;
//   console.log("Author ID :", authorID);
//   // read the file obtain array
//   const authors = JSON.parse(fs.readFileSync(authorsJSONPath));
//   console.log("Read File :", authors);
//   // use FIND to locate the author according to the authorsID
//   const findAuthorID = authors.find((author) => author.id === authorID);

//   response.send(findAuthorID);
// });
// authorsRouter.put("/:authorsId", (request, response) => {
//   // read the file to edit
//   const authorEdit = JSON.parse(fs.readFileSync(authorsJSONPath));
//   console.log("Autor Edit :", authorEdit);
//   // locate the details to edit using the ID
//   const locateIndex = authorEdit.findIndex(
//     (author) => author.id === request.params.authorsId
//   );
//   // connect all old authors with the edited and located authors
//   const oldAuthor = authorEdit[locateIndex];

//   //update the authors upon edit with ID
//   const updatedAuthors = {
//     ...oldAuthor,
//     ...request.body,
//     updatedAt: newDate(),
//   };

//   authorEdit[locateIndex] = updatedAuthors;
//   // save the edited author array back to the file .
//   fs.writeFileSync(authorsJSONPath, JSON.stringify(authorEdit));

//   // send a response
//   response.send(updatedAuthors);
// });
// authorsRouter.delete("/:authorsId", (request, response) => {
//   response.send({ message: "Deleted" });
// });

export default authorsRouter;
