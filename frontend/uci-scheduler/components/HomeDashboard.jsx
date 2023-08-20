import CourseList from "./CourseList";
import HomeDrawer from "./HomeDrawer";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  filter,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Divider,
  Box,
  Text,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon, PlusSquareIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function HomeDashboard({ courses, onReload }) {
  const [openState, setIsOpen] = useState(false);
  const [defaultValues, setValues] = useState(null);
  const btnRef = React.useRef();
  let key = 0;
  const filterCourses = (courses) => {
    let courseYears = {
    };

    // if its Fall, it belongs in another group basically
    // therefore: check if courseYear exists and not fall, if so add it to that year.
    // if courseYear doesn't exist and is fall, check if courseYear-1 exists
    // for example lets say [2023-2024]. if winter/spring/summer 2024, make a 2023-2024 (note it goes back 1)
    // however if fall 2024, make a 2024-2025 range
    // caveat is that form input retrieves the "quarter" and "year". You still want to group them with the same Year | "Winter/Spring/Summer" ==> ID: Year - 1 \ Fall ==> ID: Year
    for (let i = 0; i < courses.length; ++i) {
      let courseQuarter = courses[i].quarter;
      let courseYear = (courseQuarter === "fall" ? courses[i].year : courses[i].year - 1);
      if (courseYear in courseYears && courseYears) {
        courseYears[courseYear][courseQuarter] = [
          ...courseYears[courseYear][courseQuarter],
          courses[i],
        ];
      } else {
        courseYears[courseYear] = {
          fall: [],
          winter: [],
          spring: [],
          summer: [],
        };
        courseYears[courseYear][courseQuarter] = [
          ...courseYears[courseYear][courseQuarter],
          courses[i],
        ];
      }
    }
    return dashBoard(courseYears);
  };
  // separate the courses into different arrays based on 'year' attribute, also perhaps at that, nest another array where you can designate them into quarters, if undefined then give it a card
  // that says undefined

  const dashBoard = (result) => {
    const designateYears = (courses) => {
      let courseYears = [];
      for (const year in courses) {
        courseYears.push(
          <CourseList courses={courses[year]} year={year} onReload={onReload} open={setIsOpen} setValues={setValues}/>
        );
      }
      return courseYears;
    };

    const courseArrays = designateYears(result);
    return (
      <Card align="center" boxShadow={"lg"}>
        {courseArrays.map((element) => {
          return (
            <Card align="center" boxShadow={"none"} key={key++}>
              <CardBody>
                {courses.length === 0 ? (
                  <Text>You don't have any courses planned yet!</Text>
                ) : (
                  <>{element}</>
                )}
              </CardBody>
            </Card>
          );
        })}
        <CardFooter>
          <Button
            ref={btnRef}
            colorScheme="blue"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <AddIcon marginRight={1.5} h={4} w={4} /> Add Courses
          </Button>{" "}
        </CardFooter>
      </Card>
    );
  };

  // const drawer = (
  //   <Drawer
  //     isOpen={isOpen}
  //     placement="right"
  //     onClose={onClose}
  //     finalFocusRef={btnRef}
  //     size="lg"
  //   >
  //     <DrawerOverlay />
  //     <DrawerContent>
  //       <DrawerCloseButton />
  //       <DrawerHeader marginBottom='-5'>
  //         Search Courses
  //       </DrawerHeader>
  //       <DrawerBody>
  //         {/* BASICALLY ADD A PLUS SIGN TO ALL OF THE LISTS AND IF ITS CLICKED IT SHOULD OPEN THE MODAL WITH DEFAULT VALUES FOR THE INPUTS BELOW VVVV*/}
  //         <form id="courseForm" method="GET" onSubmit={async (event) => {const result = await onSearchHandler(event); console.log(result)}}>
  //           <DrawerHeader marginLeft='-5'>Course Name</DrawerHeader>
  //           <Input
  //             placeholder="Type course here..."
  //             size="lg"
  //             style={{ marginBottom: "2rem" }}
  //             name="courseName"
  //           />
  //           <Select placeholder='Select quarter' marginBottom='8'>
  //           <option value='fall'>Fall</option>
  //           <option value='winter'>Winter</option>
  //           <option value='spring'>Spring</option>
  //           <option value='summer'>Summer</option>
  //           </Select>
  //           <Select placeholder='Select year'>
  //           <option value='2024'>2024</option>
  //           <option value='2023'>2023</option>
  //           <option value='2022'>2022</option>
  //           <option value='2021'>2021</option>
  //           <option value='2020'>2020</option>
  //           </Select>

  //           <SearchList/>
  //         </form>
  //       </DrawerBody>
  //       <DrawerFooter>
  //         <Button variant="outline" mr={3} onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button type="submit" colorScheme="blue" form="courseForm">
  //           Search
  //         </Button>
  //       </DrawerFooter>
  //     </DrawerContent>
  //   </Drawer>
  // );
  return (
    <>
      {filterCourses(courses)}
      {openState === true ? (
        <HomeDrawer isOpen={openState} onClose={setIsOpen} values={defaultValues} setValues={setValues}/>
      ) : (
        ""
      )}
      {/* {drawer} */}
    </>
  );
}

export default HomeDashboard;
