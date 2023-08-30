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
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from "@chakra-ui/react";

const AccountIcon = (
  <WrapItem>
    <Avatar name="admin" src="../images/nerdpeter.jpg" size='xs'/>
  </WrapItem>
);

const SignIn = (
    <div style={{marginLeft: '80%', marginBottom: '0%'}}>
  <Menu>
    <MenuButton as={Button} colorScheme="blue" rightIcon={AccountIcon}>
      admin
    </MenuButton>
    <MenuList>
      <MenuGroup title="General">
        <MenuItem>Save Courses</MenuItem>
        <MenuItem>Write Feedback</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Account">
        <MenuItem>Change Users</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
    </div>

);

const MainNavigation = () => {
  return SignIn;
};

export default MainNavigation;
