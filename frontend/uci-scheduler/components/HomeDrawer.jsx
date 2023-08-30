import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Select,
  Button,
  shouldForwardProp,
  Spinner,
} from "@chakra-ui/react";
import SearchList from "./SearchList";
import React, { useState, useRef } from "react";

const HomeDrawer = ({ isOpen, onClose, values, setValues, courseIds }) => {
  const [exist, setExistence] = useState(isOpen);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeObj = React.useRef();
  const btnRef = React.useRef();
  const longestWord = React.useRef(0);

  const lengthChecker = (course) => {
    console.log(course);
    const results = course;
    longestWord.current = 0;
    for (let i = 0; i < results.length; ++i) {
      longestWord.current =
        results[i].metadata.title.length > longestWord.current
          ? results[i].metadata.title.length
          : longestWord.current;
    }
  };

  const onSearchHandler = async (event) => {
    event.preventDefault();
    timeObj.current = {
      quarter: event.target[1].value,
      year: parseInt(event.target[2].value, 10),
    };
    console.log(timeObj.current);
    const courseInput = {
      course: event.target[0].value.includes("ICS")
        ? event.target[0].value.replace("ICS", "I&CSCI")
        : event.target[0].value,
    };
    try {
      const result = await fetch("http://localhost:3005/api/v1/search", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(courseInput),
      });

      let resultData = await result.json();
      resultData = resultData.data.courses;
      console.log(resultData);
      const query = courseInput.course.toUpperCase();
      let query2;
      for (let i = 0; i < query.length; ++i) {
        if (query[i] === " ") {
          query2 = query.substring(0, i) + query.substring(i + 1);
          break;
        } else if (!isNaN(query[i])) {
          query2 = query.substring(0, i) + " " + query.substring(i);
          break;
        }
      }
      console.log(query2);
      console.log(query);
      for (let i = 0; i < resultData.length; ++i) {
        if (query === resultData[i].id || query2 === resultData[i].id) {
          [resultData[0], resultData[i]] = [resultData[i], resultData[0]];
          console.log("swapped");
        }
      }
      return resultData;
    } catch (err) {
      console.log(err);
    }
  };
  const changeDrawerSize = (word) => {
    if (word < 35) {
      return "lg";
    } else if (word <= 75) {
      return "general";
    } else if (word > 75) {
      return "heavy";
    }
  };
  const drawer = (
    <Drawer
      isOpen={exist}
      placement="right"
      onClose={() => {
        setValues(null);
        onClose();
      }}
      finalFocusRef={btnRef}
      size={changeDrawerSize(longestWord.current)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          onClick={() => {
            setValues(null);
          }}
        />
        <DrawerHeader marginBottom="-5">Search Courses</DrawerHeader>
        <DrawerBody>
          {/* BASICALLY ADD A PLUS SIGN TO ALL OF THE LISTS AND IF ITS CLICKED IT SHOULD OPEN THE MODAL WITH DEFAULT VALUES FOR THE INPUTS BELOW VVVV*/}
          <form
            id="courseForm"
            method="GET"
            onSubmit={async (event) => {
              setLoading(true);
              const result = await onSearchHandler(event);
              lengthChecker(result);
              setLoading(false);
              setSearchList(result);
            }}
          >
            <DrawerHeader marginLeft="-5">Course Name</DrawerHeader>
            <Input
              placeholder="Type course here..."
              size="lg"
              style={{ marginBottom: "2rem" }}
              name="courseName"
            />
            <Select
              placeholder="Select quarter"
              marginBottom="8"
              required
              name="quarter"
              defaultValue={values ? values.quarter : ""}
            >
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
            </Select>
            <Select
              placeholder="Select year"
              required
              name="year"
              defaultValue={values ? values.year : "2023"}
            >
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>

            </Select>
            {loading === false ? (
              <SearchList results={searchList} timeObj={timeObj.current} courseIds={courseIds}/>
            ) : (
              <>
                <Spinner
                  position="absolute"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                  left="350"
                  top="400"
                />
                <img
                  src="../images/UCIAnteater.gif"
                  style={{ position: "absolute", left: 175, bottom: 82 }}
                />
              </>
            )}
          </form>
        </DrawerBody>
        <DrawerFooter>
          {/* <Button variant="outline" mr={3} onClick={() => {onClose}}>
            Cancel
          </Button>  Bro this cancel button is bait*/}
          <Button type="submit" colorScheme="blue" form="courseForm">
            Search
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
  return exist === true && drawer;
};

export default HomeDrawer;
