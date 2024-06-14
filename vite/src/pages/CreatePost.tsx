import { FC, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreatePost: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickCreatePost = async () => {
    try {
      if (!title || !content) return;

      setIsLoading(true);

      await supabaseClient.functions.invoke("create-post", {
        body: {
          title,
          content,
        },
      });

      setIsLoading(false);

      navigate("/");
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <Flex flexDir="column" maxW={600} mx="auto" mt={8} gap={8}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="글 제목"
        isDisabled={isLoading}
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="글 내용"
        h={400}
        resize="none"
        isDisabled={isLoading}
      />
      <Button
        alignSelf="end"
        onClick={onClickCreatePost}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        글 생성
      </Button>
    </Flex>
  );
};

export default CreatePost;
