// npm install -y <-- installs nodejs package.json
// npm install express <-- installs express
// npm install dotenv <-- .env made
// npm install nodemon <-- auto restarts server when backend code is updated
// npm i morgan <-- request logger

require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const db = require("./db"); // will look for index.js

const app = express();

app.use(express.json()); // takes the request body and puts it under the "body" tag of the req object

// http://localhost:3005/getCourses <--- if it gets this URL, directs it to this route and actions

// get all restauraunts
app.get("/api/v1/courses", async (request, response) => {
  const result = await db.query("select * from courses");
  console.log(result);
  response.status(200).json({
    status: "success",
    data: {
      id: 69,
      title: "Intro to Dabbing Dabbers",
      number: "420",
      department: "I&C SCI",
      description: "Sample programming course text here XD.",
    },
  });
});

// get one specific restauraunt
app.get("/api/v1/courses/:id", (request, response) => {
  console.log(request.params);
  response.status(200).json({
    status: "success",
    data: {
      id: Number.parseInt(request.params.id, 10),
      title: "Intro to Rizz and AI",
      number: "420",
      department: "I&C SCI",
      description: "Sample programming course text here XD.",
    },
  });
});

// update one specific restauraunt
app.patch("/api/v1/courses/:id", (request, response) => {
  console.log(request.body);
  const reqdata = request.body;
  response.status(200).json({
    status: "success",
    data: {
      id: reqdata.id,
      title: reqdata.title,
      number: reqdata.number,
      department: reqdata.department,
      description: reqdata.description,
    },
  });
});

// add one specific restauraunt
app.post("/api/v1/courses", (request, response) => {
  const reqdata = request.body;
  response.status(200).json({
    status: "success",
    data: {
      id: reqdata.id,
      title: reqdata.title,
      number: reqdata.number,
      department: reqdata.department,
      description: reqdata.description,
    },
  });
});

// delete one specific restauraunt
app.delete("/api/v1/courses/:id", (request, response) => {
  response.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(
    `Server exists, listening on: NO MATTER WHAT YOU SAY OR WHAT YOU DO WHEN IM ALONE ID RATHER BE WITH YOU. EFF THESE OTHER N WORDS ILL BE RIGHT BY YOURSIDE TILL ${port}.`
  );
});
