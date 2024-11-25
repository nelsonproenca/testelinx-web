import React, { ReactNode, useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./tabs.css";

type TabsInfoProps = {
  links: string[];
  titulosTabs: string[];
  icones: IconDefinition[];
  visiveis: boolean[];
  children?: ReactNode;
  tabInicial?: number;
};

const TabsInfo = ({
  links,
  titulosTabs,
  children,
  icones,
  visiveis,
  tabInicial = 0,
}: TabsInfoProps) => {
  const [abaAtiva, setAbaAtiva] = useState<number>(tabInicial);

  const mudarAbaAtiva = (index: number) => {
    setAbaAtiva(index);
  };

  useEffect(() => {
    if (tabInicial!) {
      setAbaAtiva(tabInicial);
    }
  }, [tabInicial]);

  return (
    <div>
      {links.length !== titulosTabs.length &&
        titulosTabs.length !== icones.length && (
          <h1>
            Erro ao carregar o componente. Verifique se foram passados todos
            parametros necessários.
          </h1>
        )}
      <ul className="nav nav-tabs nav-justified bg-tab" role="tablist">
        {titulosTabs.map((titulo, index) => (
          <li
            className={"nav-item " + (visiveis[index] ? "d-block" : "d-none")}
            key={index}
          >
            <a
              className={
                "nav-link bg-tab check-tab " +
                (abaAtiva === index ? "active" : "")
              }
              data-bs-toggle="tab"
              href={"#" + links[index]}
              onClick={() => mudarAbaAtiva(index)}
            >
              <FontAwesomeIcon
                icon={icones[index]}
                size="1x"
                className="mt-2"
              />
              &nbsp;
              {titulo}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {React.Children.map(children, (child, index) => (
          <div
            id={links[index]}
            className={"tab-pane " + (abaAtiva === index ? "active" : "fade")}
          >
            <br />
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsInfo;
