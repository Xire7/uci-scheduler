import CourseCard from "./CourseCard";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";

const scheduleGrid = (
  <SimpleGrid columns={4} spacing={3}>
    <Card>
      <CardHeader>
        <Heading size="md">Fall</Heading>
      </CardHeader>
      <CardBody>
        <Text>No courses listed for this quarter!</Text>
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <Heading size="md">Winter</Heading>
      </CardHeader>
      <CardBody>
        <Text>No courses listed for this quarter!</Text>
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <Heading size="md">Spring</Heading>
      </CardHeader>
      <CardBody>
        <Text>No courses listed for this quarter!</Text>
      </CardBody>
    </Card>
    <Card>
      <CardHeader>
        <Heading size="md">Summer</Heading>
      </CardHeader>
      <CardBody>
        <Text>No courses listed for this quarter!</Text>
      </CardBody>
    </Card>
  </SimpleGrid>
);

const CourseList = ({ courses }) => {
  return (
    <>
      {scheduleGrid}
      {courses.map((element) => {
        return (
          <CourseCard
            key={element.id}
            id={element.id}
            department={element.department}
            description={element.description}
            title={element.title}
            number={element.number}
          />
        );
      })}
    </>
  );
};

export default CourseList;
