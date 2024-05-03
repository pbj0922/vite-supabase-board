import { Button, Flex, Text } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IProfile } from "..";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
  session: Session | null;
  profile: IProfile | undefined;
}

const Header: FC<HeaderProps> = ({ session, profile }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={2}
      bgColor="red.100"
    >
      <Text>로고</Text>
      <Flex>
        {session ? (
          profile?.nickname ? (
            <ProfileMenu nickname={profile.nickname} />
          ) : (
            <ProfileMenu nickname={session.user.email || ""} />
          )
        ) : (
          <Link to="/sign-in">
            <Button>로그인</Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
