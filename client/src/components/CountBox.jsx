import React from "react";
import { Box, Text } from "@chakra-ui/react";

const CountBox = ({ title, value }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      w={"150px"}
    >
      <Text
        fontFamily={"Epilogue"}
        fontWeight={"bold"}
        fontSize={"30px"}
        color={"white"}
        bg={"#1c1c24"}
        borderTopRadius={"10px"}
        w={"100%"}
        textAlign={"center"}
        noOfLines={1}
      >
        {value}
      </Text>
      <Text
        fontFamily={"Epilogue"}
        fontWeight={"normal"}
        fontSize={"16px"}
        color={"#808191 "}
        bg={"#28282e"}
        px={3}
        py={2}
        borderBottomRadius={"10px"}
        w={"100%"}
        textAlign={"center"}
        noOfLines={1}
      >
        {title}
      </Text>
    </Box>
  );
};

export default CountBox;
