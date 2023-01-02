import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { Box, Text, Image } from "@chakra-ui/react";
import { FundCard } from './'

const DisplayCampaigns = ({ title, loading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <Box>
      <Text
        fontWeight={"semibold"}
        color={"white"}
        fontSize={"18px"}
        textAlign={"left"}
      >
        {title} ({campaigns.length}){" "}
      </Text>

      <Box display={"flex"} flexWrap={"wrap"} mt={"20px"} gap={"26px"}>
        {loading && (
          <Image
            src={loader}
            alt="loader"
            w={"100px"}
            h={"100px"}
            objectFit={"contain"}
          />
        )}
        {!loading && campaigns.length === 0 && (
          <Text fontWeight={"semibold"} fontSize={"14px"} color={"#818183"}>
            You have not created any campaigns yet
          </Text>
        )}

        {!loading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign._id}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </Box>
    </Box>
  );
};

export default DisplayCampaigns;
