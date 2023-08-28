import ZotnZaza from "../images/zotngozaza.png";
import classes from "./css/HomePage.module.css";
import HomeDashboard from "../components/HomeDashboard";
import { useLoaderData, useNavigation, useLocation } from "react-router-dom";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { CardFooter } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";

async function prereqCheck(id) {
  if (id.includes("I&CSCI")) {
    id = id.replace("I&CSCI", "I%26CSCI");
  } else if (id.includes("CRM/LAW")) {
    id = id.replace("CRM/LAW", "CRM%2FLAW");
  }

  const result = await fetch(
    `https://api-next.peterportal.org/v1/rest/courses/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return result.json();
}

function HomePage() {
  const { state } = useLocation();
  console.log(state);
  window.history.replaceState({}, document.title);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();
  // const [courseData, setCourseData] = useState(useLoaderData());
  const data = useLoaderData();

  // check to see if valid prereqs for all of them, can probably optimize to make it worst case O(N).

  return (
    <>
      {state != null && (
        <Alert status="success" variant="left-accent" mt={6} mb={4}>
          <AlertIcon />
          {state.type === "POST"
            ? `${state.id}: ${state.title} was ADDED to ${
                state.quarter.toUpperCase().substring(0, 1) +
                state.quarter.substring(1)
              } ${state.year}!`
            : `${state.id}: ${state.title} was REMOVED from ${
                state.quarter.toUpperCase().substring(0, 1) +
                state.quarter.substring(1)
              } ${
                state.quarter != "fall" ? parseInt(state.year) + 1 : state.year
              }!`}
        </Alert>
      )}
      <div className={classes.header}>
        <img src={ZotnZaza} alt="Zot N Zaza" style={{ height: "7rem" }} />
        <h1>Zot N' Schedule</h1>
      </div>
      {navigation.state === "loading" ? (
        <Spinner size="xl" color="teal" />
      ) : (
        <HomeDashboard courses={data} onReload={setReload} />
      )}
      <section style={{ marginTop: "32rem" }}>hehe</section>
      <footer
        style={{
          position: "fixed",
          bottom: "2px",
          right: "20px",
          textAlign: "right",
          fontSize: "0.7rem",
        }}
      >
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
    let courseData = await result.json();
    courseData = courseData.data.courses;
    // console.log(courseData);

    if (localStorage.getItem("prereqCheck") != null) {
      localStorage.removeItem("prereqCheck");
      for (let i = 0; i < courseData.length; ++i) {
        const result = await prereqCheck(courseData[i].id);
        console.log(result);
        courseData.extraMetadata = result;
      }
    }
    return courseData;
  } catch (err) {
    console.log(err);
  }
};
