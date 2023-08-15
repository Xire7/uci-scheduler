import { Form, useActionData, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import classes from "./css/CourseForm.module.css";

const CourseForm = ({ method, data, ids }) => {
  const hashID = () => {
    if (!ids) {
      return null;
    }
    let id = Number.parseInt(Math.random() * 100, 10); // choose 100 because hash table should be 100 or less..
    while (ids.includes(id) === true) {
      id = id + 1;
    }
    console.log("GENERATED ID:", id);
    return id;
  };
  let validID = hashID();

  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Form method={method} className={classes.form}>
      {console.log(method)}
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={data ? data.name : ""}
        />
      </p>
      <p>
        <label htmlFor="url">Channel/Page Link</label>
        <input
          id="url"
          type="text"
          name="url"
          required
          defaultValue={data ? data.url : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          rows="5"
          cols="5"
          required
          defaultValue={data ? data.description : ""}
        />
      </p>
      <p>
        <label htmlFor="imageURL">Image URL Link</label>
        <input
          id="imageURL"
          type="text"
          name="imageURL"
          rows="5"
          defaultValue={data ? data.imageURL : ""}
        />
      </p>
      <input type="hidden" name="id" defaultValue={data ? data.id : validID} />
      <div className={classes.control}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
};

export default CourseForm;

export const manipulateCreatorAction = async ({ request, params }) => {
  let data = await request.formData();
  const method = request.method;
  console.log(data, method);
  const courseObj = {
    name: data.get("name"),
    url: data.get("url"),
    description: data.get("description"),
    imageURL: data.get("imageURL"),
    id: data.get("id"),
  };
  console.log(data);
  let response;
  const url = "https://rnoxkhhmdlohjaiyxyhg.supabase.co/rest/v1/creators";

  if (method === "DELETE") {
    courseObj.id = params.courseId;
    console.log(url + `?id=eq.${courseObj.id}`);
    response = await fetch(url + `?id=eq.${courseObj.id}`, {
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Prefer: "return=minimal",
      },
      method: method,
    });
  } else if (method == "PATCH") {
    courseObj.id = params.creatorId;
    console.log(url + `?id=eq.${courseObj.id}`);
    response = await fetch(url + `?id=eq.${courseObj.id}`, {
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Prefer: "return=minimal",
      },
      method: method,
      body: JSON.stringify(courseObj),
    });
  } else {
    console.log(courseObj.id);
    console.log("goes through here", method, url);
    console.log(courseObj);
    response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3hraGhtZGxvaGphaXl4eWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNzU4MjIsImV4cCI6MjAwNjk1MTgyMn0.gFlrrwFzsu4syIqQTrT3mW2fphtB4ABUr1ives18f6k",
        Prefer: "return=minimal",
      },
      method: method,
      body: JSON.stringify(courseObj),
    });
  }

  // console.log(courseObj);

  if (!response.ok) {
    // console.log(response);
    return;
  } else {
    console.log(method);
    if (method === "DELETE") {
      console.log(method);
      return redirect("/");
    } else {
      console.log("WHY IS IT DEFAULTING HERE??");
      return redirect("/");
    }
  }
};
