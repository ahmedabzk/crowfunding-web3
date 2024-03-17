import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { v4 as uuidv4 } from "uuid";
import style from "../styles/DisplayCampaign.module.css";
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  return (
    <div>
      <h1 className={style.campaing_length}>
        {title}({campaigns.length})
      </h1>
      <div className={style.campaign_wrapper}>
        {isLoading && (
          <img src={loader} alt="loader" className={style.campaign_img} />
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className={style.no_campaigns}> You have not created any campigns yet</p>
              )}
              {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
                  <FundCard key={uuidv4()} {...campaign} handleClick={() =>handleNavigate(campaign)} />
              ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
