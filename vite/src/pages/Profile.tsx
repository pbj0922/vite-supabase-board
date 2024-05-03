import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { useOutletContext, useNavigate } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const Profile: FC = () => {
  const { profile, setProfile } = useOutletContext<OutletContext>();

  const [nickname, setNickname] = useState<string>(profile?.nickname || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickNickname = async () => {
    try {
      if (!nickname) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke(
        "update-nickname",
        {
          body: { nickname },
        }
      );

      setProfile(data);
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <Flex
      bgColor="orange.100"
      maxW={400}
      mx="auto"
      flexDir="column"
      alignItems="center"
    >
      <Flex justifyContent="center" my={4}>
        <Text>프로필</Text>
      </Flex>
      <Input
        my={4}
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        isDisabled={isLoading}
      />
      <Button
        my={4}
        onClick={onClickNickname}
        w="fit-content"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        닉네임 설정
      </Button>
    </Flex>
  );
};

export default Profile;
