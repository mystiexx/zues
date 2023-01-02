import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const response = await getUserCampaigns();
    setCampaigns(response);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      loading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
