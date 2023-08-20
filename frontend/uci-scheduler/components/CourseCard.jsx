import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Button,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import React from "react";

// will prolly not make random later..
const colorPicker = () => {
  const colors = [
    "teal",
    "yellow",
    "linkedin",
    "facebook",
    "red",
    "green",
    "blue",
    "pink",
    "orange",
    "twitter",
  ];
  const number = parseInt(Math.random() * 10);
  console.log(colors[number]);
  return colors[number];
  // return "pink";
};

const deleteHandler = async (onReload, id, username, navigate, year, title, quarter, description) => {
  console.log(id, username);
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id: id, username: username }),
    });
    console.log(typeof onReload);
    onReload(true); // it doesnt rerender?
    navigate("/", {
      state: {
        type: "DELETE",
        id: id,
        title: title,
        username: "admin",
        quarter: quarter,
        year: year,
      },
    }); // change username later!!! (its hardcoded rn)
  } catch (error) {
    console.log("Error:", error);
  }
};

const deptConvertor = (id) => {
  return id.includes("I&C SCI") ? id.replace("I&C SCI", "ICS") : id;
};

const CourseCard = ({
  department,
  description,
  id,
  title,
  onReload,
  username,
  year,
  quarter,
}) => {
  const navigate = useNavigate();
  const initRef = React.useRef();
  return (
    <Popover closeOnBlur={true} isLazy initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Tag
              cursor={"pointer"}
              display={"flex"}
              justifyContent={"space-between"}
              h={10}
              maxWidth={"auto"}
              colorScheme={"orange"}
              marginBottom={4}
            >
              {deptConvertor(id)}
              <TagCloseButton
                onClick={async () => {
                  await deleteHandler(onReload, id, username, navigate, year, title, quarter , description);
                }}
              />
            </Tag>
          </PopoverTrigger>
          <PopoverContent bg="aliceblue">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{id}</PopoverHeader>
            <PopoverBody>
              {description}
            </PopoverBody>
            <Button m={'auto'} colorScheme="blackAlpha" onClick={onClose} ref={initRef}>
                Close
              </Button>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default CourseCard;
