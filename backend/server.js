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
  try {
    const result = await db.query("select * from courses");
    console.log(result);
    response.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        courses: result.rows,
      },
    });
  } catch (err) {
    response.status(400).json({ Error: err });
  }
});

// get one specific restauraunt
app.get("/api/v1/courses/:id", async (request, response) => {
  const param = Number.parseInt(request.params.id, 10);
  try {
    const result = await db.query("select * from courses WHERE id = $1");
    console.log(result);
    response.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        course: result.rows[0],
      },
    });
  } catch (err) {
    response.status(400).json({ Error: err });
  }
});

// update one specific restauraunt
app.patch("/api/v1/courses/:id", async (request, response) => {
  const reqdata = request.body;
  try {
    const result = await db.query(
      "UPDATE courses SET title = $1, number = $2, department = $3, description = $4 WHERE id = $5 returning *",
      [
        reqdata.title,
        reqdata.number,
        reqdata.department,
        reqdata.description,
        request.params.id,
      ]
    );
    response.status(200).json({
      status: "success",
      course: result.rows[0],
    });
  } catch (error) {
    response.status(200).json({
      error: error,
    });
  }
});

// add one specific restauraunt
app.post("/api/v1/courses", async (request, response) => {
  const reqdata = request.body;
  try {
    const result = await db.query(
      "INSERT INTO courses (title, number, department, description, id) VALUES ($1, $2, $3, $4, $5) returning *",
      [
        reqdata.title,
        reqdata.number,
        reqdata.department,
        reqdata.description,
        reqdata.id,
      ]
    );
    response.status(201).json({
      status: "success",
      data: {
        course: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    response.status(400).json({
      error: err,
    });
  }
});

// delete one specific restauraunt
app.delete("/api/v1/courses/:id", async (request, response) => {
  try {
    const result = await db.query("DELETE FROM courses where id = $1", [request.params.id])
    response.status(200).json({
      status: "success",
    });
  } catch (err) {
    response.status(400).json({
      error: err
    })
  }
});

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(
    `Server exists, listening on: NO MATTER WHAT YOU SAY OR WHAT YOU DO WHEN IM ALONE ID RATHER BE WITH YOU. EFF THESE OTHER N WORDS ILL BE RIGHT BY YOURSIDE TILL ${port}.`
  );
});
