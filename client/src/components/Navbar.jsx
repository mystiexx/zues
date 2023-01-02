import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import {
  Box,
  useMediaQuery,
  Image,
  Input,
  Text,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useStateContext } from "../context";

const Navbar = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const { connect, address } = useStateContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection={isLargerThan800 ? "row" : "column-reverse"}
      justifyContent="space-between"
      mb="35px"
      gap="6"
    >
      <Box
        display="flex"
        flex={isLargerThan800 && "flex-1"}
        flexDirection="row"
        maxW="458px"
        py={2}
        pl={4}
        pr={2}
        h="52px"
        bg="#1c1c24"
        borderRadius="100px"
      >
        <Input
          type="text"
          display="flex"
          bg="transparent"
          placeholder="Search for campaigns"
          fontStyle="normal"
          fontSize="14px"
          outline="none"
          color="white"
          border="none"
          _placeholder={{
            color: "#4b5264",
          }}
        />
        <Box
          w="72px"
          h="auto"
          borderRadius="20px"
          bg="#4acd8d"
          display="grid"
          placeItems="center"
          cursor="pointer"
        >
          <Image
            src={search}
            alt="search"
            w="15px"
            h="15px"
            objectFit="contain"
          />
        </Box>
      </Box>

      <Box
        display={isLargerThan800 ? "flex" : "none"}
        flexDirection="row"
        justifyContent="flex-end"
        gap={4}
      >
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "#1dc071" : "#8c6dfd"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <Box
            w="52px"
            h="52px"
            borderRadius="100%"
            bg="#2c2f32"
            display="grid"
            placeItems="center"
          >
            <Image
              src={thirdweb}
              alt="user"
              w="60%"
              h="60%"
              objectFit="contain"
            />
          </Box>
        </Link>
      </Box>

      {/* Small screen */}
      <Box
        display={isLargerThan800 ? "none" : "flex"}
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Box
          w="40px"
          h="40px"
          borderRadius="10px"
          bg="#2c2f32"
          display="grid"
          placeItems="center"
        >
          <Image src={logo} alt="user" w="60%" h="60%" objectFit="contain" />
        </Box>

        <Image
          src={menu}
          alt="menu"
          cursor="pointer"
          w="34px"
          h="34px"
          objectFit="contain"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <Box
          position="absolute"
          top={toggleDrawer ? "60px" : "-5000%"}
          right="0"
          left="0"
          bg="#1c1c24"
          zIndex="10"
          boxShadow="lg"
          py={4}
          transition="0.7s ease-in-out"
        >
          <OrderedList spacing={3} textDecoration="none" listStyleType="none">
            {navlinks.map((link) => (
              <ListItem
                key={link.name}
                p={4}
                display="flex"
                bg={isActive === link.name && "#3a3a43"}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.name}
                  w="24px"
                  h="24px"
                  objectFit={"contain"}
                  filter={
                    isActive === link.name ? "grayscale(0)" : "grayscale(100%)"
                  }
                />
                <Text
                  ml="20px"
                  fontWeight="semibold"
                  fontSize="14px"
                  textTransform="capitalize"
                  color={isActive === link.name ? "#1dc071" : "#808191"}
                >
                  {link.name}
                </Text>
              </ListItem>
            ))}
          </OrderedList>
          <Box display="flex" mx={4}>
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "#1dc071" : "#8c6dfd"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
