import CourseList from "./CourseList";
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
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const onSearchHandler = async (event) => {
  event.preventDefault();
  const courseInput = {
    course: event.target[0].value.includes("ICS")
      ? event.target[0].value.replace("ICS", "I&CSCI")
      : event.target[0].value,
  };
  console.log(courseInput);
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(courseInput),
    });
  } catch (err) {
    console.log(err);
  }
};

function HomeDashboard({ courses }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  console.log(courses);

  const cardComponent = (
    <Card>
      <CardHeader>
        <Heading size="md">Sample Course Title</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Department & Course Number
            </Heading>
            <Text pt="2" fontSize="sm">
              Sample course description here...
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );

  const dashBoard = (
    <Card align="center">
      <CardHeader>
        <Heading size="md"> Course Dashboard</Heading>
      </CardHeader>
      <CardBody>
        {courses.length === 0 ? (
          <Text>You don't have any courses planned yet!</Text>
        ) : (
          <CourseList courses={courses}/>
        )}
      </CardBody>
      <CardFooter>
        <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
          Add Courses
        </Button>{" "}
      </CardFooter>
    </Card>
  );

  const drawer = (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Search Courses</DrawerHeader>
        <DrawerBody>
          <form id="courseForm" method="GET" onSubmit={onSearchHandler}>
            <DrawerHeader>Course Name</DrawerHeader>
            <Input
              placeholder="Type course here..."
              size="lg"
              style={{ marginBottom: "2rem" }}
              name="courseName"
            />
            {cardComponent}
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue" form="courseForm">
            Search
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
  return (
    <>
      {dashBoard}
      {drawer}
    </>
  );
}

export default HomeDashboard;
