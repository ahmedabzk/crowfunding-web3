import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import CountBox from '../components/CountBox';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

import style from '../styles/CampaignDetails.module.css';


function CampaignDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className={style.details_headers}>
        <div className={style.details}>
          <img
            src={state.image}
            alt="campaign"
            className={style.details_img}
          />
          <div className={style.details_amount}>
            <div
              className={style.amount}
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className={style.count_box}>
          <CountBox title="Days Left" value={remainingDays < 0 ? "deadline passed": remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className={style.campaign}>
        <div className={style.campaign_creator}>
          <div>
            <h4 className={style.creator}>
              Creator
            </h4>

            <div className={style.thirdweb_wrapper}>
              <div className={style.thirdweb_img_wrapper}>
                <img
                  src={thirdweb}
                  alt="user"
                  className={style.thirdweb_img}
                />
              </div>
              <div>
                <h4 className={style.campaign_owner}>
                  {state.owner}
                </h4>
                <p className={style.number_of_campaigns}>
                  2 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className={style.campaign_story}>
              Story
            </h4>

            <div className={style.description_wrapper}>
              <p className={style.description}>
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className={style.donators_wrapper}>
              Donators
            </h4>

            <div className={style.donators}>
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className={style.item_donator}
                  >
                    <p className={style.number_of_donators}>
                      {index + 1}. {item.donator}
                    </p>
                    <p className={style.donation}>
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className={style.no_donators}>
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={style.fund_wrapper}>
          <h4 className={style.fund}>
            Fund
          </h4>

          <div className={style.fund_campaign_wrapper}>
            <p className={style.fund_campaign}>
              Fund the campaign
            </p>
            <div className={style.input_wrapper}>
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className={style.input_ether}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className={style.info_wrapper}>
                <h4 className={style.back_it}>
                  Back it because you believe in it.
                </h4>
                <p className={style.support_project}>
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles={style.custom_btn_style}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails