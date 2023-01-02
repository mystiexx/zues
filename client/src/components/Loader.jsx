import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { loader } from "../assets";

const Loader = () => {
  return (
    <Box
      position={"fixed"}
      inset={0}
      zIndex={10}
      h={"100vh"}
      bg={"rgba(0,0,0, 0.7)"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Image
        src={loader}
        alt="loader"
        w={"100px"}
        h={"100px"}
        objectFit={"contain"}
      />
      <Text
        mt={"20px"}
        fontWeight={"bold"}
        fontSize={"20px"}
        textAlign={"center"}
        color={'white'}
      >
        Transaction in progress <br />
        Please wait...
      </Text>
    </Box>
  );
};

export default Loader;
