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
    <Avatar name="user" src="https://media.licdn.com/dms/image/C4E03AQFBYBdUfZNqFA/profile-displayphoto-shrink_800_800/0/1522973966658?e=2147483647&v=beta&t=yVBk-psxVrL0_EX69Qo1WnrXIyck85kG_3ySAp65oL4" size='xs'/>
  </WrapItem>
);

const SignIn = (
    <div style={{marginLeft: '80%', marginBottom: '0%'}}>
  <Menu>
    <MenuButton as={Button} colorScheme="blue" rightIcon={AccountIcon}>
      admin
    </MenuButton>
    <MenuList>
      <MenuGroup title="Settings">
        <MenuItem>Save Courses</MenuItem>
        <MenuItem>Change Password</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title="Account">
        <MenuItem>Sign Out</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
    </div>

);

const MainNavigation = () => {
  return SignIn;
};

export default MainNavigation;
