import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { Box, Text, useMediaQuery, Image, Input } from "@chakra-ui/react";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { getDonations, contract, address, donate } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();

  const fetchDonators = async () => {
    const data = await getDonations(state._id);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, contract]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state._id, amount);
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Box
        w={"100%"}
        display={"flex"}
        flexDirection={isLargerThan800 ? "row" : "column"}
        mt={10}
        gap={"30px"}
      >
        <Box flex={1} flexDirection={"column"}>
          <Image
            src={state.image}
            w={"100%"}
            h={"410px"}
            objectFit={"cover"}
            borderRadius={"xl"}
          />

          <Box position={"relative"} w={"100%"} h={"5px"} bg={"#3a3a43"} mt={2}>
            <Box
              w={`${calculateBarPercentage(
                state.target,
                state.amountCollected
              )}%`}
              maxW="100%"
              position="absolute"
              h="100%"
              bg={"#4acd8d"}
            ></Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          w={isLargerThan800 ? "150px" : "100%"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          gap={"30px"}
        >
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators?.length} />
        </Box>
      </Box>

      {/* Creators */}
      <Box
        mt={"60px"}
        display={"flex"}
        flexDirection={isLargerThan800 ? "row" : "column"}
        gap={5}
      >
        <Box flex={2} display={"flex"} flexDirection={"column"} gap={"40px"}>
          <Box>
            <Text
              fontFamily={"Epilogue"}
              fontWeight={"semibold"}
              fontSize={"18px"}
              color={"white"}
              textTransform={"uppercase"}
              w={"100%"}
              textAlign={"left"}
            >
              Creator
            </Text>

            <Box
              mt={"20px"}
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              gap={"14px"}
            >
              {/* user Image */}
              <Box
                w={"52px"}
                h={"52px"}
                display={"grid"}
                placeItems={"center"}
                borderRadius={"100%"}
                bg={"#2c2f32"}
                cursor={"pointer"}
              >
                <Image
                  src={thirdweb}
                  alt="user"
                  w={"60%"}
                  h={"60%"}
                  objectFit={"contain"}
                />
              </Box>

              {/* createor details */}
              <Box>
                <Text
                  fontFamily={"Epilogue"}
                  fontWeight={"semibold"}
                  fontSize={"14px"}
                  color={"white"}
                  wordBreak={"all"}
                >
                  {state.owner}
                </Text>
                <Text
                  mt={"4px"}
                  fontFamily={"Epilogue"}
                  fontWeight={"normal"}
                  fontSize={"12px"}
                  color={"#808191"}
                >
                  10 Campaigns
                </Text>
              </Box>
            </Box>
          </Box>

          <Box>
            <Text
              fontFamily={"Epilogue"}
              fontWeight={"semibold"}
              fontSize={"18px"}
              color={"white"}
              textTransform={"uppercase"}
              w={"100%"}
              textAlign={"left"}
            >
              Story
            </Text>

            <Text
              mt={"20px"}
              fontFamily={"Epilogue"}
              fontWeight={"normal"}
              fontSize={"16px"}
              textAlign={"justify"}
              color={"#808191"}
            >
              {state.description}
            </Text>
          </Box>

          <Box>
            <Text
              fontFamily={"Epilogue"}
              fontWeight={"semibold"}
              fontSize={"18px"}
              color={"white"}
              textTransform={"uppercase"}
              w={"100%"}
              textAlign={"left"}
            >
              Donators
            </Text>

            <Box mt={"20px"} display="flex" flexDirection="column" gap={4}>
              {donators?.length > 0 ? (
                donators?.map((item, index) => (
                  <Box
                    key={`${item?.donator}-${index}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                  >
                    <Text
                      fontStyle={"normal"}
                      fontSize={"16px"}
                      color={"#b2b3bd"}
                      wordBreak={"all"}
                    >
                      {index + 1}. {item?.donator}
                    </Text>

                    <Text
                      fontStyle={"normal"}
                      fontSize={"16px"}
                      color={"#808191"}
                      wordBreak={"all"}
                    >
                      {item?.donation}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text
                  mt={"20px"}
                  fontFamily={"Epilogue"}
                  fontWeight={"normal"}
                  fontSize={"16px"}
                  textAlign={"justify"}
                  color={"#808191"}
                >
                  No donators yet. Be the fist one!
                </Text>
              )}
            </Box>
          </Box>
        </Box>
        {/* funding card */}
        <Box flex={1}>
          <Text
            fontFamily={"Epilogue"}
            fontWeight={"semibold"}
            fontSize={"18px"}
            color={"white"}
            textTransform={"uppercase"}
            w={"100%"}
            textAlign={"left"}
          >
            Fund
          </Text>

          <Box
            mt={"20px"}
            display={"flex"}
            flexDirection={"column"}
            p={4}
            bg={"#1c1c24"}
            borderRadius={"10px"}
          >
            <Text
              fontFamily={"Epilogue"}
              fontWeight={"medium"}
              fontSize={"20px"}
              color={"#808191"}
              textAlign={"center"}
            >
              Fund the campaign
            </Text>

            <Box mt={"30px"}>
              <Input
                type="number"
                w={"100%"}
                py={"10px"}
                placeholder="ETH 0.1"
                outline="1px solid #3a3a43"
                px={isLargerThan800 ? "20px" : "15px"}
                border="none"
                color="white"
                bg="transparent"
                fontSize="18px"
                borderRadius="10px"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Box my={"20px"} p={4} bg={"#13131a"} borderRadius={"10px"}>
                <Text fontSize="14px" fontWeight={"semibold"} color={"white"}>
                  Back it because you believe in it.
                </Text>
                <Text fontWeight={"normal"} color={"#808191"} mt={"20px"}>
                  Support the project for no reward, just because it speaks to
                  you
                </Text>
              </Box>
            </Box>

            <CustomButton
              btnType="button"
              title="Fund Campaign"
              styles={"#8c6dfd"}
              handleClick={handleDonate}
              loading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CampaignDetails;
