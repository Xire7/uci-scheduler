import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";

const CourseCard = ({ department, description, id, number, title }) => {
  return (
    <Card width={200} height={200}>
      <CardHeader>
        {department}
        {number}: {title}
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <CardFooter>ID: {id}</CardFooter>
    </Card>
  );
};

export default CourseCard;
