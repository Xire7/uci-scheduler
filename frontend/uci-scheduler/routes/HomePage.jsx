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

function HomePage() {
  const { state } = useLocation();
  console.log(state);
  window.history.replaceState({}, document.title);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();
  const data = useLoaderData().data.courses;
  return (
    <>
      {state != null && (
        <Alert status="success" variant="left-accent" mt={6} mb={4} >
          <AlertIcon />
          {state.type === "POST" ? `${state.id}: ${state.title} was ADDED to ${state.quarter.toUpperCase().substring(0,1) + state.quarter.substring(1)} ${state.year}!` : `${state.id}: ${state.title} was REMOVED from ${state.quarter.toUpperCase().substring(0,1) + state.quarter.substring(1)} ${state.quarter != 'fall' ? parseInt(state.year) + 1 : state.year}!`}
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
      <section style={{ marginTop: "17.7rem" }}>hehe</section>
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
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
