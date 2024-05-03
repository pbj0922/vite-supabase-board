import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import supabaseClient from "../lib/supabaseClient";
import { OutletContext } from "../components/Layout";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { session } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const onClickSignIn = async () => {
    try {
      if (!email) return;
      setIsLoading(true);

      await supabaseClient.auth.signInWithOtp({
        email,
      });

      setMessage("이메일을 확인하세요");
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;

    navigate("/");
  }, []);

  return (
    <Flex
      bgColor="orange.100"
      maxW={400}
      mx="auto"
      flexDir="column"
      alignItems="center"
    >
      <Flex justifyContent="center" my={4}>
        <Text>로그인</Text>
      </Flex>
      <Input
        my={4}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        isDisabled={message !== "" || isLoading}
      />
      <Button
        my={4}
        onClick={onClickSignIn}
        w="fit-content"
        isLoading={isLoading}
        isDisabled={message !== "" || isLoading}
      >
        로그인
      </Button>
      {message && <Text>{message}</Text>}
    </Flex>
  );
};

export default SignIn;
