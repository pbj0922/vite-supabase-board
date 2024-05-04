import { Box, Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import supabaseClient from "../lib/supabaseClient";
import { IPost, IProfile } from "..";

export interface OutletContext {
  session: Session | null;
  profile: IProfile | undefined;
  setProfile: Dispatch<SetStateAction<IProfile>>;
  posts: IPost[];
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}

const Layout: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<IProfile>();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabaseClient.functions.invoke("get-me").then(({ data }) => {
      setProfile(data);
    });

    // page useState 추가
    supabaseClient.functions
      .invoke("get-posts", { body: { page: 0 } })
      .then(({ data }) => {
        setPosts(data);
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
      <Header session={session} profile={profile} />
      <Box bgColor="green.100" flexGrow={1}>
        <Outlet context={{ session, profile, setProfile, posts, setPosts }} />
      </Box>
    </Flex>
  );
};

export default Layout;
