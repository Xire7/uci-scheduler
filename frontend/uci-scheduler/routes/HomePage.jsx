import ZotnZaza from "../images/zotngozaza.png";
import classes from "./css/HomePage.module.css";
import HomeDashboard from "../components/HomeDashboard";
import { useLoaderData, useNavigation } from "react-router-dom";

import React from "react";
import { CardFooter } from "@chakra-ui/react";

function HomePage() {
  const navigation = useNavigation();
  const data = useLoaderData().data.courses;
  console.log(data);
  return (
    <>
      <div className={classes.header}>
        <img src={ZotnZaza} alt="Zot N Zaza" style={{ height: "7rem" }} />
        <h1>Zot N' Schedule</h1>
      </div>
      {navigation.state === "loading" ? (
        <Spinner size="xl" color="teal" />
      ) : (
        <HomeDashboard courses={data} />
      )}
    <section style={{marginTop: '17.7rem'}}>
      hehe
    </section>
    <footer style={{position: 'fixed', bottom: '2px', right: '20px', textAlign: 'right', fontSize: '0.7rem'}}>
    ©2023 Made with ♡ by Zion M.
    </footer>
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
