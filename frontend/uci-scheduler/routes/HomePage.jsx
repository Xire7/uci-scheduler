import ZotnZaza from "../images/zotngozaza.png";
import classes from "./css/HomePage.module.css";
import HomeDashboard from "../components/HomeDashboard";
import {
  useLoaderData,
  useNavigation,
  useLocation,
  useNavigate,
} from "react-router-dom";
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

// just need to account for the course that was added and its prerequisiteFors by checking current courses
const findPreReqs = async (addedCourse, courses, type) => {
  // ---->>>>>>>> check if addedCourse's prerequisiteFors have a match with the current courses, then get the prereq tree for the current courses.
  // this is also viable when a course is removed as well, just check if it changes the courses its a prerequisite for.
  // basically add/deleting a course will only impact the courses it is a prerequisite for.
  let prereqList = [];
  console.log(
    "This is without making a set out of the prereqFor yet",
    addedCourse.prereqfor
  );
  const fixedFormat = addedCourse.prereqfor.map((element) => {
    return element.replace(/ /g, "");
  });
  const prereqSet = new Set(fixedFormat);
  console.log("Prereq Set for this class:", prereqSet);
  for (let i = 0; i < courses.length; ++i) {
    if (prereqSet.has(courses[i])) {
      console.log("This course has a prereq for:", courses[i]);
      let prereqTree = await refreshPreReq(courses[i]);
      let prereqFulfilled = checkPreReqs(prereqTree, new Set(courses), "base");
      let prereqObj = {
        id: courses[i],
        prereqTree: prereqTree,
        prereqFulfilled: prereqFulfilled,
      };
      prereqList = [...prereqList, prereqObj];
    }
  }
  if (type === "POST") {
    const recentCoursePrereq = await refreshPreReq(addedCourse.id);
    const recentFulfilled = checkPreReqs(
      recentCoursePrereq,
      new Set(courses),
      "base"
    );
    const recentCourseObj = {
      id: addedCourse.id,
      prereqTree: recentCoursePrereq,
      prereqFulfilled: recentFulfilled,
    };
    prereqList = [...prereqList, recentCourseObj];
  }
  console.log("The Final Prereq List: ", prereqList);
  return prereqList;
};

// for performance, we will only check prereqs of this newly added object, and prereqs of any that this added/removed course would influence via PrerequisiteFor attribute.
// if none are on there, just have the added course's prereq be checked.
const refreshPreReq = async (id) => {
  if (id.includes("I&CSCI")) {
    id = id.replace("I&CSCI", "I%26CSCI");
  } else if (id.includes("CRM/LAW")) {
    id = id.replace("CRM/LAW", "CRM%2FLAW");
  }
  const additionalData = await fetch(
    `https://api-next.peterportal.org/v1/rest/courses/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  let additionalDataResults = await additionalData.json();
  const prereqTree = additionalDataResults.payload.prerequisiteTree;
  return prereqTree;
};
// my attempt at traversing the tree, its an object with an array of objects
function checkPreReqs(tree, courseSet, type) {
  // console.log(type);
  let orCheck = false;
  if (tree instanceof Array) {
    // console.log(tree, "Is array");
    for (let i = 0; i < tree.length; ++i) {
      // console.log(`element #${i}:`, type);
      if ("AND" in tree[i]) {
        const boolVal = checkPreReqs(tree[i], courseSet, "AND");
        if (type === "AND" && boolVal === false) return false;
        else if (type === "AND" && boolVal === true) {
          continue; // keep iterating
        } else if (type === "OR" && boolVal === false) {
          continue; // we need to see if something true is found
        } else if (type === "OR" && boolVal === true) {
          orCheck = true; // if AND was evaluated to be true
          return true;
        } else if (type === "base" && boolVal === true) {
          console.log("base passed AND check");
          return true;
        } else {
          // if type was AND and boolVal is true
          continue;
        }
      } else if ("OR" in tree[i]) {
        const boolVal = checkPreReqs(tree[i], courseSet, "OR");
        if (type === "OR" && boolVal === true) {
          orCheck = true;
          return true;
        } else if (type === "OR" && boolVal === false) {
          console.log("IT GOES THROUGH THIS OR CHECK INSTEAD?");
          continue; // keep checking through the elements
        } else if (type === "AND" && boolVal === true) {
          continue;
        } else if (type === "AND" && boolVal === false) {
          return false;
        } else if (type === "base" && boolVal === false) {
          continue;
        } else if (type === "base" && boolVal === true) {
          console.log("base passed OR check");
          return true;
        }
      } else {
        // BASE CASE || the case where the array element should be a regular object with a course id
        if ("courseId" in tree[i]) {
          const query = tree[i].courseId.replace(/ /g, "");
          // console.log("COURSE ID:", query);
          // console.log(courseSet.has(query));
          if (!courseSet.has(query) && type == "AND") {
            console.log("fails AND check");
            return false;
          }
          if (!courseSet.has(query) && type == "OR") {
            // console.log(
            //   "keep checking and see if orCheck is still false by the end. if it is, do a check out of this loop and return false"
            // );
          } else if (courseSet.has(query) && type == "OR") {
            console.log("passes OR check:", courseSet, query, tree, tree[i]);
            return true;
          }
        } else if ("examName" in tree[i]) {
          const query = tree[i].examName + ` (Min. Score: ${tree[i].minGrade})`;
          console.log("AP Exam:", query, "might cause a bug");
        }
      }
    }
  } else if (tree instanceof Object) {
    if ("AND" in tree) {
      // console.log("found 'AND' statement.. diving");
      const boolVal = checkPreReqs(tree.AND, courseSet, "AND");
      if (type === "base" && boolVal === false) {
        return false;
      }
      // trace this later, check if the upper layer is an "AND" already
    } else if ("OR" in tree) {
      // console.log("found 'OR' statement.. diving");
      const boolVal = checkPreReqs(tree.OR, courseSet, "OR");

      if (orCheck === false && boolVal === true) {
        orCheck = true;
      } else if (orCheck === false && boolVal === false) {
        orCheck = false;
        return false; // this works
      }
      // trace this later, check if the upper layer is an "OR", if so, keep cycling through that layer's elements. if it never becomes true, will be caught on the end check.
      // return boolVal;
    }
    // console.log("Tree in this Recursion:", tree);

    if (type === "OR" && orCheck === false) {
      // might fail for "BASE" type??? make sure to trace as well later.
      console.log("fails the OR check");
      return false;
    }

    orCheck = true;
    if (type === "base" && orCheck === false) {
      console.log("base failed the OR check");
      return false;
    }
    // case if its "AND" / "OR", and it never returned false from the loop above
  }
  if (type === "OR" && orCheck === false) {
    // might fail for "BASE" type??? make sure to trace as well later.
    console.log("fails the OR check");
    return false;
  }
  return true;
}

function chooseLogo() {
  const logoPaths = [
    "../images/zotngozaza.png",
    "../images/zotngozaza.png",
    "../images/zotngozaza.png",
    "../images/zotngozaza.png",
    "../images/zotngozaza.png",
    // "../images/dabbingeater.gif",
    // "../images/graduatingeater.png",
    // "../images/zot.gif",
    // "../images/zyzzfixed.png",
    // "../images/mariojudah.gif",
  ];
  const num = parseInt((Math.random() * 10) % logoPaths.length);
  // console.log(num);
  return logoPaths[num];
}

function HomePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  window.history.replaceState({}, document.title);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();
  const data = useLoaderData();
  let prereqs;

  if (state != null) {
    // console.log("STATE:", state);
    const stateObj = {
      id: state.id,
      prerequisitetree: state.prereqTree,
      prereqfor: state.prerequisitefor,
    };
    const courseIds = data.map((element) => {
      return element.id;
    });
    prereqs = findPreReqs(
      stateObj,
      courseIds,
      state.type === "DELETE" ? "DELETE" : "POST"
    );
    if (state.type === "POST" || state.type === "DELETE") {
      prereqs.then((result) => {
        console.log("RESULT OF PREREQ CHECK:", result);
        for (let i = 0; i < result.length; ++i) {
          for (let j = 0; j < data.length; ++j) {
            if (result[i].id === data[j].id) {
              data[j].prereqFulfilled = result[i].prereqFulfilled;
              break;
            }
          }
          const resultBody = {
            prereqFulfilled: result[i].prereqFulfilled,
            id: result[i].id,
            username: data[0].username,
          }; // remember you're getting username from data object here... might cause bugs later
          console.log("result body:", resultBody);
          console.log("PREREQS:", result[i]);
          try {
            const res = fetch("http://localhost:3005/api/v1/courses/updated", {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(resultBody),
            }).then((res) => {
              // window.history.replaceState({}, document.title);
              navigate("/");
            });
          } catch (error) {
            console.log("ERROR:", error);
          }
        }
        if (result.length === 0) {
          // setPrereq(true);
          window.history.replaceState({}, document.title);
        }
      });
    }
  }
  const logo = chooseLogo();
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
        <img
          src={logo}
          alt="Zot N Zaza"
          style={{
            height: "8rem",
            width: "8rem",
            marginRight: "2rem",
            textAlign: "center",
            position: "relative",
            left: logo === "../images/zotngozaza.png" ? 10 : 0,
            bottom: logo === "../images/zotngozaza.png" ? 7 : 0,
          }}
        />
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

    if (localStorage.getItem("username") != null) {
      console.log("Different log-in username detected");
    }
    return courseData;
  } catch (err) {
    console.log(err);
  }
};
