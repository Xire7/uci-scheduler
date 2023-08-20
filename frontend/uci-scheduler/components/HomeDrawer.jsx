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

const onSearchHandler = async (event) => {
  event.preventDefault();
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

    return result.json();
  } catch (err) {
    console.log(err);
  }
};

const HomeDrawer = ({ isOpen, onClose }) => {
  const [exist, setExistence] = useState(isOpen);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const btnRef = React.useRef();
  const drawer = (
    <Drawer
      isOpen={exist}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader marginBottom="-5">Search Courses</DrawerHeader>
        <DrawerBody>
          {/* BASICALLY ADD A PLUS SIGN TO ALL OF THE LISTS AND IF ITS CLICKED IT SHOULD OPEN THE MODAL WITH DEFAULT VALUES FOR THE INPUTS BELOW VVVV*/}
          <form
            id="courseForm"
            method="GET"
            onSubmit={async (event) => {
              setLoading(true);
              const result = await onSearchHandler(event);
              setLoading(false);
              setSearchList(result.data.courses);
              // console.log(result);
            }}
          >
            <DrawerHeader marginLeft="-5">Course Name</DrawerHeader>
            <Input
              placeholder="Type course here..."
              size="lg"
              style={{ marginBottom: "2rem" }}
              name="courseName"
            />
            <Select placeholder="Select quarter" marginBottom="8">
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
            </Select>
            <Select placeholder="Select year">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </Select>
            {loading === false ? (
              <SearchList results={searchList} />
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
              <img src="../images/UCIAnteater.gif" style={{position: 'absolute', left: 175, bottom: 82 }}/>
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
