import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const onAddHandler = async (data, timeObj, navigate) => {
  let dataObj = {
    department: data.metadata.department,
    description: data.metadata.description,
    title: data.metadata.title,
    id: data.id,
    username: "admin",
    year: timeObj.year,
    quarter: timeObj.quarter,
  };
  try {
    let id = dataObj.id;
    if (id.includes("I&CSCI")) {
      id = id.replace("I&CSCI", "I%26CSCI");
    } else if (id.includes("CRM/LAW")) {
      id = id.replace("CRM/LAW", "CRM%2FLAW");
    }
    const additionalData = await fetch(
      `https://api-next.peterportal.org/v1/rest/courses/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    let additionalDataResults = await additionalData.json();
    console.log("Should find PreReq in this json.." , additionalDataResults);
    const prereqTree = additionalDataResults.payload.prerequisiteTree;
    additionalDataResults = {
      prerequisiteText: additionalDataResults.payload.prerequisiteText,
      prerequisiteFor: additionalDataResults.payload.prerequisiteFor,
      courseLevel: additionalDataResults.payload.courseLevel,
      maxUnits: additionalDataResults.payload.maxUnits,
      prereqFulfilled: true,
    };
    dataObj = { ...dataObj, ...additionalDataResults };

    console.log("PREREQ???", prereqTree)
    const result = await fetch("http://localhost:3005/api/v1/courses/add", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(dataObj),
    });
    localStorage.setItem("prereqCheck", "true");
    navigate("/", {
      state: {
        type: "POST",
        id: data.id,
        title: data.metadata.title,
        username: "admin",
        quarter: timeObj.quarter,
        year: timeObj.year,
        prereqTree: prereqTree,
        prerequisitefor: dataObj.prerequisiteFor
      },
    }); // change username later!!! (its hardcoded rn)
  } catch (error) {
    console.log("Error", error);
  }
};

const SearchList = ({ results, timeObj }) => {
  const navigate = useNavigate();
  return (
    <>
      {console.log(timeObj)}
      {results.length != 0 && (
        <TableContainer marginTop={10} maxWidth="100%">
          <Table variant="striped" colorScheme="linkedin">
            <TableCaption>Course Results</TableCaption>
            <Thead>
              <Tr>
                <Th paddingRight={0}>ADD</Th>
                <Th paddingLeft={0}>Course ID</Th>
                <Th>Title</Th>
                <Th>Dept.</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((element) => {
                return (
                  <Tr key={element.id}>
                    <Td>
                      <Button
                        w={5}
                        h={7}
                        left={-1}
                        onClick={async () => {
                          await onAddHandler(element, timeObj, navigate);
                        }}
                      >
                        <PlusSquareIcon w={5} h={5} />
                      </Button>
                    </Td>
                    <Td paddingLeft={0}>
                      {element.id.includes("I&CSCI")
                        ? element.id.replace("I&CSCI", "ICS")
                        : element.id}
                    </Td>
                    <Td>{element.metadata.title}</Td>
                    <Td>{element.metadata.department}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ADD</Th>
                <Th>Course ID</Th>
                <Th>Title</Th>
                <Th>Dept.</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SearchList;
