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
  Divider,
} from "@chakra-ui/react";
import {EditIcon, SearchIcon} from "@chakra-ui/icons"

// basically you need like 4 courselists, each courselist will correspond to a year, and each element will need to be placed in a year's quarter
const CourseList = ({ courses, onReload, year, open, setValues }) => {
  const courseCardList = [];
  let key = 0;
  const createCardListArray = (quarterCourses, year, onReload) => {
    for (const quarter in quarterCourses) {
      let units = 0;
      courseCardList.push(
        <Card key={key++} boxShadow="lg">
          <CardHeader>
            <Heading size="md" cursor={'pointer'} onClick={() => {console.log(year, quarter, 'boom'); open(true); setValues({year: quarter != 'fall' ? parseInt(year) + 1 : year, quarter: quarter})}}>
              {quarter.toUpperCase()}{" "}
              {quarter === "fall" ? year : parseInt(year) + 1}
              <SearchIcon ml={2} h={4} />
            </Heading>
          </CardHeader>
          <CardBody display="flex" flexDirection="column">
            {quarterCourses[quarter].length === 0 ? (
              <Text>No courses listed for this quarter!</Text>
            ) : (
              quarterCourses[quarter].map((element) => {
                units = units + 4;
                return (
                  <CourseCard
                    key={element.id}
                    id={element.id}
                    department={element.department}
                    description={element.description}
                    title={element.title}
                    username={element.username}
                    onReload={onReload}
                    year={year}
                    quarter={quarter}
                  />
                );
              })
            )}
          </CardBody>
          Units: {units}
        </Card>
      );
    units = 0;
    }
    return courseCardList;
  };
  return (
    <>
      <h1>
        {year}-{parseInt(year) + 1} Courses
      </h1>
      <SimpleGrid columns={4} spacing={3} marginTop={4}>
        {createCardListArray(courses, year, onReload)}
      </SimpleGrid>
    </>
  );
};

export default CourseList;
