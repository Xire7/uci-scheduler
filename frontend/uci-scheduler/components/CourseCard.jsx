import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
  } from '@chakra-ui/react'

const deptConvertor = (dept) => {
    if (dept.includes("I&C SCI")) {
        return dept.replace("I&C SCI", "ICS");
    } else {
        return dept;
    }
}

const CourseCard = ({ department, description, id, number, title }) => {
  return (
    <Tag h={10} maxWidth={250} colorScheme="green">
        {deptConvertor(department)}{id}: {title}
        <TagCloseButton/>
    </Tag>
  );
};

export default CourseCard;
