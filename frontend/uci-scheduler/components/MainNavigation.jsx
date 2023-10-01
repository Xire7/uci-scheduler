import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AccountIcon = (
  <WrapItem>
    <Avatar name="admin" src="../images/nerdpeter.jpg" size="xs" />
  </WrapItem>
);

const setSessionUsernameHandler = (onOpen) => {
  onOpen();

};

const changeUsername = (name) => {
  // set session username
  // if username doesn't exist, start with blank course state
  // if username does exist, have a check on homepage component
  // with guest username, make sure it doesn't save to database
  localStorage.setItem("username", name);
}

const SignIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div style={{ marginLeft: "80%", marginBottom: "0%" }}>
      <Menu>
        <MenuButton as={Button} colorScheme="blue" rightIcon={AccountIcon}>
          admin
        </MenuButton>
        <MenuList>
          <MenuGroup title="Account">
            <MenuItem onClick={onOpen} onClose={onClose}>
              Save Courses
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Misc.">
          <MenuItem>User Manual & FAQ 🤓</MenuItem>
            <MenuItem>Give Feedback ❤️</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save/Load Courses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="name" defaultValue={"admin"}/>
              <FormHelperText>Enter a username to save/load course data tied to the name.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={() => {}}>
              Load
            </Button>
            <Button variant="ghost" ml={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const MainNavigation = () => {
  return SignIn();
};

export default MainNavigation;
