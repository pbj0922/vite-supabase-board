import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
  nickname: string;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ nickname }) => {
  return (
    <Menu>
      <MenuButton as={Button}>{nickname}</MenuButton>
      <MenuList>
        <Link to="/profile">
          <MenuItem>내 프로필</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
