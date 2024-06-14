import { Button } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";

interface PageButtonProps {
  index: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const PageButton: FC<PageButtonProps> = ({ index, setPage }) => {
  const onClickPage = () => {
    setPage(index);
  };

  return (
    <Button mx={1} size="xs" rounded="full" onClick={onClickPage}>
      {index + 1}
    </Button>
  );
};

export default PageButton;
