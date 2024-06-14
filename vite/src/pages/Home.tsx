import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { IPost } from "..";
import PostCard from "../components/PostCard";
import PageButton from "../components/PageButton";

const Home: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageComp, setPageComp] = useState<JSX.Element[]>([]);

  const getPosts = async () => {
    try {
      const { data } = await supabaseClient.functions.invoke("get-posts", {
        body: {
          page,
        },
      });

      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostsCount = async () => {
    try {
      const { data } = await supabaseClient.functions.invoke("get-posts-count");

      setTotalPage(Math.ceil(data / 10));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostsCount();
  }, []);

  useEffect(() => {
    getPosts();
  }, [page]);

  useEffect(() => {
    if (!totalPage) return;

    const temp = [];

    for (let i = 0; i < totalPage; i++) {
      temp.push(<PageButton key={i} index={i} setPage={setPage} />);
    }

    setPageComp(temp);
  }, [totalPage]);

  return (
    <Flex>
      <TableContainer w="full">
        <Table variant="striped" colorScheme="teal" maxW={640} mx="auto">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th w="50%" textAlign="center">
                내용
              </Th>
              <Th>작성자</Th>
              <Th>작성일</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((v) => (
              <PostCard key={v.id} post={v} />
            ))}
          </Tbody>
          <TableCaption>{pageComp.map((v) => v)}</TableCaption>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Home;
