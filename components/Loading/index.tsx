import styles from "./styles.module.scss";
import RvcLogo from "../../../Public/logo-rvc.png";
import Loader from "../../../Public/loader.svg";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logoLoader} src={RvcLogo} alt="RVC" />
      <img className={styles.loader} src={Loader} alt="Loading" />
    </div>
  );
};

export default Loading;
