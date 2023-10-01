// npm install -y <-- installs nodejs package.json
// npm install express <-- installs express
// npm install dotenv <-- .env made
// npm install nodemon <-- auto restarts server when backend code is updated
// npm i morgan <-- request logger

const { embedCourses } = require("./apis/embedCourses");
const { queryDB } = require("./apis/query");

const express = require("express");
const cors = require("cors");

require("dotenv").config();
const db = require("./db"); // will look for index.js

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json()); // takes the request body and puts it under the "body" tag of the req object

// http://localhost:3005/getCourses <--- if it gets this URL, directs it to this route and actions

app.get("/api/v1/courses", async (request, response) => {
  // embedCourses();
  try {
    const result = await db.query("select * from courses");
    response.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        courses: result.rows,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
});

app.post("/api/v1/courses", async (request, response) => {
  // try {
  const courseInput = request.body.course;
  try {
    const result = await queryDB(courseInput);
    response.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        courses: result.rows,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
});

app.post("/api/v1/search", async (request, response) => {
  // try {
  const courseInput = request.body.course;
  try {
    const result = await queryDB(courseInput);
    response.status(200).json({
      status: "success",
      data: {
        courses: result,
      },
    });
  } catch (error) {
    console.log("Error:", error);
  }
});

app.get("/api/v1/courses/:id", async (request, response) => {
  const param = Number.parseInt(request.params.id, 10);
  try {
    const result = await db.query("select * from courses WHERE id = $1");
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

app.post("/api/v1/courses/add", async (request, response) => {
  const reqdata = request.body;
  // console.log(reqdata);
  try {
    const result = await db.query(
      "INSERT INTO courses (title, department, description, id, username, year, quarter, prerequisiteFor, prerequisiteText, courseLevel, maxUnits, prereqFulfilled) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *",
      [
        reqdata.title,
        reqdata.department,
        reqdata.description,
        reqdata.id,
        reqdata.username,
        reqdata.year,
        reqdata.quarter,
        reqdata.prerequisiteFor,
        reqdata.prerequisiteText,
        reqdata.courseLevel,
        reqdata.maxUnits,
        reqdata.prereqFulfilled,
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

app.delete("/api/v1/courses/delete", async (request, response) => {
  console.log(request.body);
  try {
    const result = await db.query(
      "DELETE FROM courses where id = $1 AND username = $2",
      [request.body.id, request.body.username]
    );
    response.status(200).json({
      status: "success",
    });
  } catch (err) {
    response.status(400).json({
      error: err,
    });
  }
});

app.post("/api/v1/courses/updated", async (request, response) => {
  console.log(request.body);
  console.log("UPDATING RN....")
  try {
    const result = await db.query(
      "UPDATE courses SET prereqFulfilled = $1 WHERE id = $2 AND username = $3", [request.body.prereqFulfilled, request.body.id, request.body.username]
    );
    response.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("Database Error:", err)
    response.status(400).json({error: err});
  }
})

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(
    `Server exists, listening on: NO MATTER WHAT YOU SAY OR WHAT YOU DO WHEN IM ALONE ID RATHER BE WITH YOU. EFF THESE OTHER N WORDS ILL BE RIGHT BY YOURSIDE TILL ${port}.`
  );
});
