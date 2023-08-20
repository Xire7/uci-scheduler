import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

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

const deleteHandler = async (onReload, id, username, navigate) => {
  console.log(id, username);
  try {
    const result = await fetch("http://localhost:3005/api/v1/courses/delete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id: id, username: username }),
    });
    console.log(typeof onReload)
    onReload(true); // it doesnt rerender?
    navigate('/'); // cheap way to rerender (AKA REFRESH. Find some other better way later)
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
}) => {
  const navigate = useNavigate();
  return (
    <Tag
      display={"flex"}
      justifyContent={"space-between"}
      h={10}
      maxWidth={"auto"}
      colorScheme={'orange'}
      marginBottom={2}
    >
      {deptConvertor(id)}
      <TagCloseButton
        onClick={async () => {
          await deleteHandler(onReload, id, username, navigate);
        }}
      />
    </Tag>
  );
};

export default CourseCard;
