import ZotnZaza from "../images/zotngozaza.png";
import classes from "./css/HomePage.module.css";
import HomeDashboard from "../components/HomeDashboard";
import { useLoaderData, useNavigation } from "react-router-dom";

import React from "react";

function HomePage() {
  const navigation = useNavigation();
  const data = useLoaderData().data.courses;
  console.log(data);
  return (
    <>
      <div className={classes.header}>
        <img src={ZotnZaza} alt="Zot N Zaza" style={{ height: "7rem" }} />
        <h1>Peter Schedeater</h1>
      </div>
      {navigation.state === "loading" ? (
        <Spinner size="xl" color="teal" />
      ) : (
        <HomeDashboard courses={data} />
      )}
    </>
  );
}

export default HomePage;

export const loadCourses = async (request, response) => {
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
