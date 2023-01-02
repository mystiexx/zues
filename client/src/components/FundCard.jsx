import React from "react";
import { Box, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box
      w={isLargerThan800 ? "288px" : "100%"}
      borderRadius={"15px"}
      bg={"#1c1c24"}
      cursor={"pointer"}
      onClick={handleClick}
    >
      <Image
        src={image}
        alt="fund"
        w={"100%"}
        h={"158px"}
        objectFit={"cover"}
        borderRadius={"15px"}
      />

      <Box display={"flex"} flexDirection={"column"} p={4}>
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"center"}
          mb={"18px"}
        >
          <Image
            src={tagType}
            alt="tag"
            w={"17px"}
            h={"17px"}
            objectFit={"contain"}
          />
          <Text
            ml={"12px"}
            mt={"2px"}
            fontWeight={"meduim"}
            FontSize={"12px"}
            color={"#808191"}
          >
            Eduction
          </Text>
        </Box>

        <Box display={"block"}>
          <Text
            fontFamily={"Epilogue"}
            fontSize={"16px"}
            color={"white"}
            fontWeight={"semibold"}
            noOfLines={1}
          >
            {title}
          </Text>
          <Text
            fontFamily={"Epilogue"}
            fontSize={"12px"}
            color={"#808191"}
            fontWeight={"normal"}
            noOfLines={1}
            mt={"5px"}
            textTransform={"capitalize"}
          >
            {description}
          </Text>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          flexWrap={"wrap"}
          mt={"15px"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Text
              fontFamily={"Epilogue"}
              fontSize={"14px"}
              color={"#b2b3bd"}
              fontWeight={"semibold"}
            >
              {amountCollected}
            </Text>
            <Text
              fontFamily={"Epilogue"}
              fontSize={"12px"}
              color={"#b2b3bd"}
              fontWeight={"normal"}
              mt={"3px"}
              maxW={isLargerThan800 ? null : "120px"}
              noOfLines={isLargerThan800 ? null : 1}
            >
              Raised of {target}
            </Text>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Text
              fontFamily={"Epilogue"}
              fontSize={"14px"}
              color={"#b2b3bd"}
              fontWeight={"semibold"}
            >
              {remainingDays}
            </Text>
            <Text
              fontFamily={"Epilogue"}
              fontSize={"12px"}
              color={"#b2b3bd"}
              fontWeight={"normal"}
              mt={"3px"}
              maxW={isLargerThan800 ? null : "120px"}
              noOfLines={isLargerThan800 ? null : 1}
            >
              Days Left
            </Text>
          </Box>
        </Box>

        <Box display={"flex"} alignItems={"center"} mt={"20px"} gap={"12px"}>
          <Box
            w={"30px"}
            h={"30px"}
            borderRadius={"100%"}
            dispaly={"grid"}
            placeItems={"center"}
            bg={"#13131a"}
          >
            <Image
              src={thirdweb}
              alt="user"
              w={"1/2"}
              h={"1/2"}
              objectFit={"contain"}
            />
          </Box>
          <Text
            display={"flex"}
            flex={1}
            fontStyle={"normal"}
            fontSize={"12px"}
            color={"#808191"}
            noOfLines={1}
          >
            {/* by */}
            <Text color={"#b2b3bd"}>{owner}</Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default FundCard;
