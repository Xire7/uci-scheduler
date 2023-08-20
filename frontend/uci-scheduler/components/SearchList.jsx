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
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

const SearchList = ({ results }) => {
  return (
    <>
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
                    <Tr>
                      <Td>
                        <PlusSquareIcon />
                      </Td>
                      <Td paddingLeft={0}>
                        {element.id.includes("I&CSCI")
                          ? element.id.replace("I&CSCI", "ICS")
                          : element.id}
                      </Td>
                      <Td>
                        {element.metadata.title.length >= 40
                          ? element.metadata.title.substring(0, 40) + "..."
                          : element.metadata.title}
                      </Td>
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
