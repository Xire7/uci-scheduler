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

const deleteHandler = async (
  onReload,
  id,
  username,
  navigate,
  year,
  title,
  quarter,
  description
) => {
  console.log(id, username);
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id: id, username: username }),
    });
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
  // let newId = id.includes("I&CSCI") ? id.replace("I&CSCI", "ICS") : id;
  let newId = id.includes("I&CSCI") ? id.replace("I&CSCI", "ICS") : id;
  for (let i = 0; i < newId.length; ++i) {
    if (!isNaN(newId[i])) {
      newId = newId.substring(0, i) + " " + newId.substring(i);
      return newId;
    }
  }
  return newId;
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
  courseLevel,
  prerequisiteFor,
  prerequisiteText,
  maxUnits,
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
                  await deleteHandler(
                    onReload,
                    id,
                    username,
                    navigate,
                    year,
                    title,
                    quarter,
                    description
                  );
                }}
              />
            </Tag>
          </PopoverTrigger>
          <PopoverContent bg="aliceblue">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontSize="1.3rem">
              {id}{" "}
              <p style={{ fontSize: "0.8rem", display: "inline" }}>
                ({maxUnits} units)
              </p>
            </PopoverHeader>
            <PopoverBody>{description}</PopoverBody>
            {prerequisiteText != "" || prerequisiteFor.length != 0 ? (
              <PopoverFooter fontSize="0.8rem">
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    Prerequisites:{" "}
                  </p>
                  {prerequisiteText}
                </div>
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    This is a Prerequisite For:{" "}
                  </p>
                  {prerequisiteFor.join(", ")}
                </div>
              </PopoverFooter>
            ) : (
              ""
            )}
            <Button
              m={"auto"}
              colorScheme="blackAlpha"
              onClick={onClose}
              ref={initRef}
            >
              Close
            </Button>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default CourseCard;
