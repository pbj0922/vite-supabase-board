import { FC, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const CreatePost: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { posts, setPosts } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const onClickCreatePost = async () => {
    try {
      if (!title || !content) return;

      setIsLoading(true);

      const { data } = await supabaseClient.functions.invoke("create-post", {
        body: {
          title,
          content,
        },
      });

      setIsLoading(false);

      setPosts([data, ...posts]);

      navigate("/");
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <Flex
      bgColor="orange.100"
      flexDir="column"
      maxW={600}
      mx="auto"
      mt={8}
      gap={8}
    >
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
