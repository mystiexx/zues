import React from "react";
import { Box, Input, Text, Textarea, useMediaQuery } from "@chakra-ui/react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box dispaly="flex" flex={"flex-1"} w={"100%"} flexDirection={"column"}>
      {labelName && (
        <Text
          fontWeight={"medium"}
          fontSize={"14px"}
          color={"#808191"}
          mb={"10px"}
        >
          {labelName}{" "}
        </Text>
      )}
      {isTextArea ? (
        <Textarea
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          py={"15px"}
          px={isLargerThan800 ? "15px" : "25px"}
          minW={isLargerThan800 ? "100%" : "300px"}
          outline={"1px solid #3a3a43"}
          border="none"
          bg={"transparent"}
          color={"white"}
          fontSize={"14px"}
          borderRadius={"10px"}
          _placeholder={{
            color: "#4b5264",
          }}
          required
        />
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          type={inputType}
          step={"0.1"}
          placeholder={placeholder}
          py={"15px"}
          px={isLargerThan800 ? "15px" : "25px"}
          minW={isLargerThan800 ? "100%" : "300px"}
          outline={"1px solid #3a3a43"}
          border="none"
          bg={"transparent"}
          color={"white"}
          fontSize={"14px"}
          borderRadius={"10px"}
          _placeholder={{
            color: "#4b5264",
          }}
          required
        />
      )}
    </Box>
  );
};

export default FormField;
