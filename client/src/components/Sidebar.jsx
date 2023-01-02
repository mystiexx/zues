import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { Box, Image } from "@chakra-ui/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <Box
    w="48px"
    h="48px"
    borderRadius="10px"
    bg={isActive && isActive === name && "#2c2f32"}
    display="flex"
    justifyContent="center"
    alignItems="center"
    cursor={!disabled && "pointer"}
    onClick={handleClick}
    {...styles}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" w="1/2" h="1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt="fund_logo"
        w="1/2"
        h="1/2"
        filter={isActive === name ? "grayscale(0)" : "grayscale(100%)"}
      />
    )}
  </Box>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      position="sticky"
      top="3"
      h="93vh"
      ml="5px"
    >
      <Link to="/">
        <Icon styles={"bg=#2c2f32 w='52px' h='52px'"} imgUrl={logo} />
      </Link>

      <Box
        display="flex"
        flex="flex-1"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="#1c1c24"
        borderRadius="20px"
        w="76px"
        py="5px"
        mt="12px"
        h="93vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="4px"
        >
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </Box>
        <Icon styles={"bg='#1c1c24' boxShadow='sm' "} imgUrl={sun} />
      </Box>
    </Box>
  );
};

export default Sidebar;
