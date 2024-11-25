import { useState, useEffect } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import useToken from "../../hooks/useToken";

import { SubMenuType } from "../../models/sub.menu.type";

import styles from "./styles.module.scss";

type DroppdownProps = {
  subMenu: SubMenuType[];
  onGetClick: (navegacaoFeita: boolean) => void;
};

const DropDown = ({ subMenu, onGetClick }: DroppdownProps) => {
  const { token } = useToken();
  const [novoMenu, setNovoMenu] = useState<SubMenuType[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    gerarMenu();
  }, []);

  const gerarMenu = () => {
    let listMenuItem: SubMenuType[] = [];

    subMenu.map((item) => {
      item.roles.map((role) => {
        const permissao = token.permissoes.find(
          (perm) => perm.descricao === role
        );

        if (permissao?.descricao.match("_write") && Boolean(permissao.valor)) {
          listMenuItem.push(item);
        }
      });
    });

    setNovoMenu(listMenuItem);
  };

  return (
    <ul className={novoMenu.length > 0 ? styles.ulStyle : ""}>
      {novoMenu.length > 0 &&
        novoMenu.map((item, index) =>
          item.submenu?.length > 0 ? (
            <li key={index}>
              <Link
                className=" fs-6"
                to={item.link}
                style={{ width: "350px" }}
                onClick={() => onGetClick(true)}
              >
                &nbsp;{item.title}&nbsp; <AiFillCaretRight />
              </Link>
              <ul>
                {item.submenu.map((item, index) => (
                  <li key={index} style={{ width: "350px" }}>
                    <Link
                      to={item.link}
                      className="fs-6"
                      style={{ width: "350px" }}
                      onClick={() => onGetClick(true)}
                    >
                      &nbsp;{item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={index}>
              <Link
                className="mb-1 fs-6"
                to={item.link}
                onClick={() => onGetClick(true)}
              >
                &nbsp;{item.title}&nbsp;
              </Link>
            </li>
          )
        )}
    </ul>
  );
};

export default DropDown;
