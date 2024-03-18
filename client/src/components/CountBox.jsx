import style from '../styles/CountBox.module.css';

const CountBox = ({title, value}) => {
  return (
    <div className={style.count_wrapper}>
      <h4 className={style.count_value}>{value}</h4>
      <p className={style.count_title}>{title}</p>
    </div>
  );
}

export default CountBox
