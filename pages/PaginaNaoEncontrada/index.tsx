import { Link, useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import styles from "./styles.module.scss";

const PaginaNaoEncontrada = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title nomeTela="Página não encontrada." />
      <div className={styles.container}>
        <div className="row justify-content-md-start me-1 mb-2">
          <div className="col-md-2">
            <button onClick={() => navigate("../")}>Home page</button>
          </div>
          <div className="d-flex justify-content-center align-items-center pt-4">
            <img
              src="/logo-rvc.png"
              alt="RVC Advocacia"
              style={{ width: "20rem", height: "20rem", userSelect: "none" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaNaoEncontrada;
