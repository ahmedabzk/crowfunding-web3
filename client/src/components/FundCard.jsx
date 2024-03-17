
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import style from '../styles/FundCard.module.css';

const FundCard = ({owner, title, description, target, deadline, amountCollected, image,handleClick}) => {
    const remainingDays = daysLeft(deadline);
    return (
      <div
        className={style.card_wrapper}
        onClick={handleClick}
      >
        <img
          src={image}
          alt="fund"
          className={style.card_img}
        />

        <div className={style.card_items}>
          <div className={style.card_header}>
            <img
              src={tagType}
              alt="tag"
              className={style.card_header_img}
            />
            <p className={style.campaign}>
              Education
            </p>
          </div>

          <div className={style.card_title_wrapper}>
            <h3 className={style.card_title}>
              {title}
            </h3>
            <p className={style.card_description}>
              {description}
            </p>
          </div>

          <div className={style.campaign_info}>
            <div className={style.amount_wrapper}>
              <h4 className={style.amount_collected}>
                {amountCollected}
              </h4>
              <p className={style.target}>
                Raised of {target}
              </p>
            </div>
            <div className={style.deadline_wrapper}>
              <h4 className={style.remaining_days}>
                {remainingDays < 0 ? "deadline passed": remainingDays}
              </h4>
              <p className={style.days_left}>
                Days Left
              </p>
            </div>
          </div>

          <div className={style.campaign_owner}>
            <div className={style.thirdweb_wrapper}>
              <img
                src={thirdweb}
                alt="user"
                className={style.thirdweb_img}
              />
            </div>
            <p className={style.owner}>
              by <span className={style.owner_span}>{owner}</span>
            </p>
          </div>
        </div>
      </div>
    );
}

export default FundCard
