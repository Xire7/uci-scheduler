import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
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
} from "@chakra-ui/react";

import ZotnZaza from "../images/zotngozaza.png";
import classes from "./css/HomePage.module.css";

import React from "react";

const onSearchHandler = async (event) => {
  event.preventDefault();
  const courseInput = {course: (event.target[0].value.includes("ICS") ? event.target[0].value.replace("ICS", "I&CSCI") : event.target[0].value)};
  console.log(courseInput);
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses", {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(courseInput)
      });
  } catch (err) {
    console.log(err)
  }

};

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <Text>You don't have any courses planned yet!</Text>
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
      <div className={classes.header}>
        <img src={ZotnZaza} alt="Zot N Zaza" style={{ height: "7rem" }} />
        <h1>Peter Schedeater</h1>
      </div>
      {dashBoard}
      {drawer}
    </>
  );
}

export default DrawerExample;
