import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";

import { navlinks } from "../constants";

import style from '../styles/Sidebar.module.css';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`${style.icon} ${isActive && isActive === name && `${style.iconBg}`} ${
      !disabled && `${style.icon_disabled}`
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className={style.logo_not_active} />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`${style.logo_active} ${isActive !== name && `${style.grayscale}`}`}
      />
    )}
  </div>
);

function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className={style.sidebar_wrapper}>
      <Link to="/">
        <Icon
          styles={{ width: "52px", height: "52px", backgroundColor: "#2c2f32" }}
          imgUrl={logo}
        />
          </Link>
          
      <div className={style.sidebar_group}>
        <div className={style.sidebar_items}>
                  {navlinks.map((link) => (
                      <Icon key={link.name}
                          {...link}
                          isActive={isActive}
                          handleClick={() => {
                              if (!link.disabled) {
                                  setIsActive(link.name);
                                  navigate(link.name);
                              }
                          }}
                      />
                  ))}
              </div>
              <Icon styles={{backgroundColor: '#1c1c24',  boxShadow: '10px 10px 20px rgba(2, 2, 2, 0.25)'}} imgUrl={sun}/>
          </div>
    </div>
  );
}

export default Sidebar;
