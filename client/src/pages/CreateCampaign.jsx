import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import {  FileUploadToCloud } from "../utils";
import {
  Box,
  FormControl,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  Image,
  Input,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";

const CreateCampaign = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
  });
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState("");
  const ref = useRef();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const open = () => {
    ref?.current?.click();
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image.length <= 0) return toast.error("Please pick a campaign image");
    setIsLoading(true);
    const response = await FileUploadToCloud(image);
    if (!response.secure_url) return toast.error("Product image is required");
    await createCampaign({
      ...form,
      target: ethers.utils.parseUnits(form.target, 18),
      image: response.secure_url,
    });
    setIsLoading(false);
    navigate("/");
  };
  return (
    <Box
      bg="#1c1c24"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      borderRadius="10px"
      p={isLargerThan800 ? 4 : 10}
    >
      {isLoading && <Loader/>}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"16px"}
        minW={isLargerThan800 ? null : "380px"}
        bg={"#3a3a43"}
        borderRadius={"10px"}
      >
        <Text
          fontWeight="bold"
          fontSize={isLargerThan800 ? "18px" : "25px"}
          color="white"
        >
          Start a Campaign{" "}
        </Text>
      </Box>

      <FormControl
        w={"100%"}
        mt={"65px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"30px"}
      >
        <Grid
          templateColumns={isLargerThan800 ? "repeat(2, 1fr)" : "auto"}
          gap={"40px"}
        >
          <GridItem>
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
          </GridItem>

          <GridItem>
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a  title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
          </GridItem>
        </Grid>
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <Box
          w={"100%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          p={4}
          bg={"#8c6dfd"}
          h={"120px"}
          borderRadius={"10px"}
        >
          <Image
            src={money}
            alt="money"
            w={"40px"}
            h={"40px"}
            objectFit={"contain"}
          />
          <Text
            fontSize={"25px"}
            color={"white"}
            fontWeight={"bold"}
            ml={"20px"}
          >
            You will get 100% of the raised amount
          </Text>
        </Box>

        <Grid
          templateColumns={isLargerThan800 ? "repeat(2, 1fr)" : "auto"}
          gap={"40px"}
        >
          <GridItem>
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="number"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
            />
          </GridItem>

          <GridItem>
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
            />
          </GridItem>
        </Grid>

        <Input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="image"
          display="none"
          ref={ref}
          onChange={(e) => handleImage(e)}
        />

        <Text
          fontWeight={"medium"}
          fontSize={"14px"}
          color={"#808191"}
          mb={"10px"}
        >
          Campaign Image *
        </Text>
        {preview ? (
          <Box
            display="grid"
            placeItems="center"
            color="white"
            cursor="pointer"
            width="150px"
            height="150px"
            border="1px solid #3a3a43"
            borderRadius="10px"
            onClick={open}
          >
            <Image
              src={preview}
              alt="preview"
              objectFit="cover"
              w="150px"
              h="150px"
            />
          </Box>
        ) : (
          <Box
            display="grid"
            placeItems="center"
            color="white"
            cursor="pointer"
            width="150px"
            height="150px"
            border="1px solid #3a3a43"
            borderRadius="10px"
            onClick={open}
          >
            <BiImageAdd size={40} color={"#808191"} />
          </Box>
        )}

        <Box display="grid" placeItems={"center"} mt={"40px"}>
          <CustomButton
            btnType={"submit"}
            title={"Submit new campaign"}
            styles={"#1dc071"}
            loading={isLoading}
            handleClick={handleSubmit}
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default CreateCampaign;
