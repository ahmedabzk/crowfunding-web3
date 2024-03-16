import { loader } from '../assets';
import style from '../styles/Loader.module.css';

function Loader() {
  return (
    <div className={style.loader}>
      <img src={loader} alt="loader" className={style.loader_img} />
      <p className={style.loader_text}>Transaction is in progress <br/> Please wait...</p>
    </div>
  );
}

export default Loader