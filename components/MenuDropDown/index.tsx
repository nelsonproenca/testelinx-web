import { useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { BsVolumeDown } from "react-icons/bs";
import { FiUserCheck, FiDollarSign } from "react-icons/fi";
import {
  AiFillCaretDown,
  AiOutlineRise,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { MdOutlinePeople } from "react-icons/md";
import { BiData, BiGridAlt, BiPlus } from "react-icons/bi";

import useToken from "../../hooks/useToken";

import Header from "../Header";

import { ItemMenuType } from "../../models/item.menu.type";

import { menuItems } from "../../menuItems";

import DropDown from "./DropDown";

import styles from "./styles.module.scss";
import { VscGear, VscGraph, VscTable, VscTools, VscUnmute } from "react-icons/vsc";
import Swal from "sweetalert2";
import CheckTokenUpdate from "../CheckTokenUpdate";

const MenuDropDown = () => {
  const { token } = useToken();
  const [novoMenu, setNovoMenu] = useState<ItemMenuType[]>([]);
  const buttonRefCollapse = useRef<HTMLButtonElement>(null);
  const [menuCollapse, setMenuCollapse] = useState<boolean>(false);
  const [menuChange, setMenuChange] = useState<boolean>(false);

  useEffect(() => {
    setMenuShowProperty();
  }, []);

  const setMenuShowProperty = () => {
    let itensMenu = JSON.parse(JSON.stringify(menuItems));

    const hasPermission = (role: any) =>
      token.permissoes.some(
        (perm) => perm.descricao === role && perm.valor === "true"
      );

    const updateShowProperty = (menuItem: any) => {
      if (menuItem.roles) {
        menuItem.show = menuItem.roles.some(hasPermission);
      }

      if (menuItem.submenu && menuItem.submenu.length > 0) {
        menuItem.submenu.forEach(updateShowProperty);
        menuItem.submenu = menuItem.submenu.filter(
          (subMenuItem: any) => subMenuItem.show
        );
      }
    };

    itensMenu.forEach(updateShowProperty);

    itensMenu = itensMenu.filter(
      (menuItem: any) =>
        menuItem.show || (menuItem.submenu && menuItem.submenu.length > 0)
    );

    setNovoMenu(itensMenu);
  };

  const onGetClick = (navegacaoFeita: boolean) => {
    setMenuChange(true);
    try {
      setMenuChange(false);
      if (!menuCollapse) {
        return;
      }
      if (navegacaoFeita) {
        buttonRefCollapse?.current?.click();
        setMenuCollapse(false);
      }
    } catch (error) {
      Swal.fire("", `${error}`, "error");
    }
  };

  return (
    <>
      <CheckTokenUpdate />
      <Header />
      <div>
        <nav
          className={`navbar navbar-expand-xl navbar-dark ${styles.navbarExpand}`}
        >
          <button
            className="navbar-toggler text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
            onClick={() => setMenuCollapse(true)}
          >
            <span className="navbar-toggler-icon"></span>
            <span className={styles.NavbarTextButton}>Menu</span>
          </button>
          <button
            ref={buttonRefCollapse}
            type="button"
            style={{
              width: "0px",
              height: "0px",
              border: "none",
              boxShadow: "none",
            }}
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          ></button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className={styles.menu + " navbar-nav me-auto"}>
              {novoMenu?.length! > 0 &&
                novoMenu.map((item, index) => (
                  <li key={index} className={`nav-item ${styles.item} fs-6`}>
                    <Link to={item.link} onClick={() => onGetClick(true)}>
                      {item.link === "/" ? (
                        <BiGridAlt size="20" />
                      ) : item.link === "cadastros-gerais" ? (
                        <FiUserCheck size="20" />
                      ) : item.link === "financeiro" ? (
                        <FiDollarSign size="20" />
                      ) : item.link === "apps-integracoes" ? (
                        <AiOutlineUnorderedList size="20" />
                      ) : item.link === "rh" ? (
                        <MdOutlinePeople size="24" />
                      ) : item.link === "ti" ? (
                        <BiData size="20" />
                      ) : item.link === "timesheet" ? (
                        <VscTable size="20" />
                      ) : item.link === "gestao-projetos" ? (
                        <VscTools size="20" />
                      ) : item.link === "treinamentos" ? (
                        <VscUnmute size="20" />
                      ) : item.link === "wip" ? (
                        <VscGraph size="20" />
                      ) : (
                        <VscGear size="20" />
                      )}
                      &nbsp;{item.title}
                      {item?.submenu?.length! > 0 && (
                        <>
                          <AiFillCaretDown className={`${styles.caretRigth}`} />
                          <BiPlus className={`${styles.plusIcon}`} />
                        </>
                      )}
                    </Link>
                    {!menuChange && (
                      <>
                        {item?.submenu?.length! > 0 && (
                          <DropDown
                            subMenu={item?.submenu!}
                            onGetClick={onGetClick}
                          />
                        )}
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </nav>

        <Outlet />
      </div>
    </>
  );
};

export default MenuDropDown;
