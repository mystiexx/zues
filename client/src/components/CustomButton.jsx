import React from "react";
import { Button } from "@chakra-ui/react";

const CustomButton = ({ btnType, title, handleClick, loading, styles }) => {
  return (
    <Button
      type={btnType}
      onClick={handleClick}
      fontWeight="semibold"
      fontSize="16px"
      minH="52px"
      isLoading={loading}
      borderRadius="10px"
      bg={styles}
      px={4}
      color="white"
      _hover={{
        background: `${styles}`,
      }}
      //   {...styles}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
