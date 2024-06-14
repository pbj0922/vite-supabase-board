import { Td, Tr } from "@chakra-ui/react";
import { FC } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { IPost } from "..";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Tr>
      <Td>{post.id}</Td>
      <Td>{post.content}</Td>
      <Td>
        {post.profile.nickname ??
          `#${post.profile.id.substring(post.profile.id.length - 4)}`}
      </Td>
      <Td>
        {formatDistanceToNow(parseISO(post.created_at), { locale: ko })} 전
      </Td>
    </Tr>
  );
};

export default PostCard;
