import { Box, Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import supabaseClient from "../lib/supabaseClient";

const Layout: FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => console.log(session), [session]);

  return (
    <Flex
      flexDir="column"
      bgColor="blue.100"
      maxW={1024}
      mx="auto"
      minH="100vh"
      px={2}
    >
      <Header />
      <Box bgColor="green.100" flexGrow={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
