import { ouvidoria, productCenter } from "../../api.routes";
import CheckTokenUpdate from "../components/CheckTokenUpdate";

import Title from "../components/Title";

const Administrativo = () => {
  return (
    <div>
      <CheckTokenUpdate />
      <Title nomeTela="Administrativo" />
      <div
        className="d-flex d-grid justify-content-around pt-4"
        style={{ marginLeft: "5rem", marginRight: "3.5rem" }}
      >
        <div className="row border">
          <div className="col-md-6 col-12 text-start">
            <a href={productCenter} target="_blank">
              <img
                src="/product_center_rvc.png"
                alt="RVC Auditoria"
                style={{ width: "20rem", height: "20rem", userSelect: "none" }}
              />
            </a>
          </div>
          <div className="col-md-6 col-12 text-end">
            <a href={ouvidoria} target="_blank">
              <img
                src="/ouvidoria_rvc.png"
                alt="RVC Auditoria"
                style={{ width: "20rem", height: "20rem", userSelect: "none" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administrativo;
