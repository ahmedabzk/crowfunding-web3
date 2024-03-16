import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { logo, search, menu, thirdweb } from '../assets';

import { navlinks } from '../constants';
import CustomButton from './CustomButton';
import style from '../styles/Navbar.module.css';
import { useStateContext } from '../context';


function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { address, connect } = useStateContext();
  console.log(address);
  return (
    <div className={style.navbar_wrapper}>
      <div className={style.navbar_search}>
        <input
          type="text"
          placeholder="search for campaigns"
          className={style.search}
        />
        <div className={style.img_wrapper}>
          <img src={search} alt="search" className={style.search_image} />
        </div>
      </div>
      <div className={style.profile_wrapper}>
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? `${ style.address_bg }` : `${style.not_address_bg}`}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className={style.profile_image}>
            <img src={thirdweb} alt="thirdweb" className={style.thirdweb_image} />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}

      <div className={style.small_screen_wrapper}>
        <div className={style.logo_wrapper}>
          <img src={logo} alt="user" className={style.image_logo} />
        </div>
        <img
          src={menu}
          alt="menu"
          className={style.menu_image}
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`${style.navbar_items} ${
            !toggleDrawer ? `${style.toggle_false}` : `${style.toggle_true}`
          }`}
        >
          <ul>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`${style.menu_li} ${isActive === link.name && `${style.active_background}`
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`${style.menu_image} ${
                    isActive === link.name ? `${style.grayscale_0}` : `${style.grayscale}`
                  }`}
                />
                <p
                  className={`${style.menu_p} ${
                    isActive === link.name ? `${style.active_bg}` : `${style.not_active_bg}`
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className={style.btn_wrapper}>
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={
                address
                  ? `${style.address_bg}`
                  : `${style.not_address_bg}`
              }
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar