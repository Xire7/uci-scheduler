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


// basically you need like 4 courselists, each courselist will correspond to a year, and each element will need to be placed in a year's quarter
const CourseList = ({ courses, onReload }) => {
  return (
    <>
    <h1>2023-24 Course</h1>
      <SimpleGrid columns={4} spacing={3}>
          <Card>
            <CardHeader>
              <Heading size="md">Fall 2023</Heading>
            </CardHeader>
            <CardBody display="flex" flexDirection="column">
              {courses.length === 0 ? (
                <Text>No courses listed for this quarter!</Text>
              ) : (
                courses.map((element) => {
                  return (
                    <CourseCard
                      key={element.id}
                      id={element.id}
                      department={element.department}
                      description={element.description}
                      title={element.title}
                      username={element.username}
                      onReload={onReload}
                    />
                  );
                })
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Winter 2024</Heading>
            </CardHeader>
            <CardBody>
              <Text>No courses listed for this quarter!</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Spring 2024</Heading>
            </CardHeader>
            <CardBody>
              <Text>No courses listed for this quarter!</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Summer 2024</Heading>
            </CardHeader>
            <CardBody>
              <Text>No courses listed for this quarter!</Text>
            </CardBody>
          </Card>
      </SimpleGrid>
    </>
  );
};

export default CourseList;
