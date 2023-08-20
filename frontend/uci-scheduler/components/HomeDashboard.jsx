import CourseList from "./CourseList";
import SearchList from './SearchList'
import HomeDrawer from "./HomeDrawer";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
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
  Button,
  useDisclosure,
  Select
} from "@chakra-ui/react";
import {ChevronDownIcon, PlusSquareIcon, AddIcon} from '@chakra-ui/icons';
import {useState} from 'react';


// const onSearchHandler = async (event) => {
//   event.preventDefault();
//   const courseInput = {
//     course: event.target[0].value.includes("ICS")
//       ? event.target[0].value.replace("ICS", "I&CSCI")
//       : event.target[0].value,
//   };
//   try {
//     const result = await fetch("http://localhost:3005/api/v1/search", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(courseInput),
//     });
//     return result.json();
//   } catch (err) {
//     console.log(err);
//   }
// };

function HomeDashboard({ courses }) {
  const [openState, setIsOpen] = useState(false);
  const btnRef = React.useRef();
  const {onClose} = useDisclosure();
  
  const dashBoard = (
    <Card align="center" boxShadow={'md'}>
      <CardBody>
        {courses.length === 0 ? (
          <Text>You don't have any courses planned yet!</Text>
        ) : (
          <CourseList courses={courses}/>
        )}
      </CardBody>
      <CardFooter>
        <Button ref={btnRef} colorScheme="blue" onClick={() => {console.log('proc'); setIsOpen(true);}}>
        <AddIcon marginRight={1.5} h={4} w={4}/> Add Courses 
        </Button>{" "}
      </CardFooter>
    </Card>
  );

  // const drawer = (
  //   <Drawer
  //     isOpen={isOpen}
  //     placement="right"
  //     onClose={onClose}
  //     finalFocusRef={btnRef}
  //     size="lg"
  //   >
  //     <DrawerOverlay />
  //     <DrawerContent>
  //       <DrawerCloseButton />
  //       <DrawerHeader marginBottom='-5'>
  //         Search Courses
  //       </DrawerHeader>
  //       <DrawerBody>
  //         {/* BASICALLY ADD A PLUS SIGN TO ALL OF THE LISTS AND IF ITS CLICKED IT SHOULD OPEN THE MODAL WITH DEFAULT VALUES FOR THE INPUTS BELOW VVVV*/}
  //         <form id="courseForm" method="GET" onSubmit={async (event) => {const result = await onSearchHandler(event); console.log(result)}}>
  //           <DrawerHeader marginLeft='-5'>Course Name</DrawerHeader>
  //           <Input
  //             placeholder="Type course here..."
  //             size="lg"
  //             style={{ marginBottom: "2rem" }}
  //             name="courseName"
  //           />
  //           <Select placeholder='Select quarter' marginBottom='8'>
  //           <option value='fall'>Fall</option>
  //           <option value='winter'>Winter</option>
  //           <option value='spring'>Spring</option>
  //           <option value='summer'>Summer</option>
  //           </Select>
  //           <Select placeholder='Select year'>
  //           <option value='2024'>2024</option>
  //           <option value='2023'>2023</option>
  //           <option value='2022'>2022</option>
  //           <option value='2021'>2021</option>
  //           <option value='2020'>2020</option>
  //           </Select>

  //           <SearchList/>
  //         </form>
  //       </DrawerBody>
  //       <DrawerFooter>
  //         <Button variant="outline" mr={3} onClick={onClose}>
  //           Cancel
  //         </Button>
  //         <Button type="submit" colorScheme="blue" form="courseForm">
  //           Search
  //         </Button>
  //       </DrawerFooter>
  //     </DrawerContent>
  //   </Drawer>
  // );
  return (
    <>
      {dashBoard}
      {openState === true ? <HomeDrawer isOpen={openState} onClose={setIsOpen}/> : ""}
      {console.log(openState)}
      {/* {drawer} */}
    </>
  );
}

export default HomeDashboard;
