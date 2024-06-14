import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileMenuProps {
  nickname: string;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ nickname }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton as={Button}>{nickname}</MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/profile")}>내 프로필</MenuItem>
        <MenuItem onClick={() => navigate("/create-post")}>글쓰기</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
