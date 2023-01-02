import React from "react";
import { Route, Routes } from "react-router-dom";
import { CampaignDetails, CreateCampaign, Profile, Home } from "./pages";
import { Sidebar, Navbar } from "./components";
import { Box, useMediaQuery, Container } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Box
      position="relative"
      p="4px"
      bg="#13131a"
      display="flex"
      flexDirection="row"
      h="auto"
    >
      <Toaster />

      <Box
        display={isLargerThan800 ? "flex" : "none"}
        mr="10px"
        position="relative"
      >
        <Sidebar />
      </Box>

      <Container maxW="container.lg" pb="100px">
        <Box
          display="flex-1"
          w="100%"
          maxWidth="1280px"
          mx="auto"
          pr={isLargerThan800 ? "5" : null}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
