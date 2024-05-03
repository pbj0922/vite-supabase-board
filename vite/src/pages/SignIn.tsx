import { Button, Flex, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import supabaseClient from "../lib/supabaseClient";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");

  const onClickSignIn = async () => {
    try {
      if (!email) return;

      const response = await supabaseClient.auth.signInWithOtp({
        email,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={onClickSignIn}>로그인</Button>
    </Flex>
  );
};

export default SignIn;
