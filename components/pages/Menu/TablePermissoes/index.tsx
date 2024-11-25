import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";

import { MenuModel } from "../../../../models/menu.model";
import { PerfilUsuarioModel } from "../../../../models/perfil.usuario.model";
import { PermissaoModel } from "../../../../models/permissao.model";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";
import AutenticacaoService from "../../../../services/autenticacao.service";

import MenuService from "../../../../services/menu.service";

import styles from "./styles.module.scss";

type TablePermissoesProps = {
  perfil: string;
};

const TablePermissoes = ({ perfil }: TablePermissoesProps) => {
  const [permissoes, setPermissoes] = useState<MenuModel[]>();
  const { perfilUsuarioItem, adicionarPerfilUsuario } = useCadastros();

  const perfilUsuario = perfilUsuarioItem;

  useEffect(() => {
    loadData();
  }, [perfil]);

  const loadData = async () => {
    try {
      const respModel = await MenuService.getAll();

      const menus: MenuModel[] = respModel.data;

      let listaMenu: MenuModel[] = [];

      menus.forEach((lista) => {
        if (lista.visivel) {
          listaMenu.push(lista);
        }
      });

      if (perfil) {
        const respPermissoes = await AutenticacaoService.getPermissoes(perfil);

        const permissoesModel: PermissaoModel[] = respPermissoes.data;

        if (permissoesModel) {
          let permissao: PermissaoModel | undefined = undefined;

          for (const key of listaMenu) {
            permissao = permissoesModel.find(
              (menu) => menu.descricao === key.claimWrite
            );

            if (permissao) {
              key!.isCheckedClaimWrite = Boolean(permissao.valor ?? false);
            }

            permissao = permissoesModel.find(
              (menu) => menu.descricao === key.claimRead
            );

            if (permissao) {
              key!.isCheckedClaimRead = Boolean(permissao.valor ?? false);
            }
          }
        }
      }

      setPermissoes(listaMenu);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleAddClaimReadClick = (event: any) => {
    const { name, checked } = event.target;

    let tempPermissoes;

    tempPermissoes = permissoes?.map((permissao) =>
      permissao.claimRead === name
        ? { ...permissao, isCheckedClaimRead: checked }
        : permissao
    );

    setPermissoes(tempPermissoes);

    let tempPerfilUsuario: PerfilUsuarioModel = Object.assign(
      {},
      perfilUsuario,
      {
        menuPermissoes: tempPermissoes,
      }
    );

    adicionarPerfilUsuario(tempPerfilUsuario);
  };

  const handleAddClaimWriteClick = (event: any) => {
    const { name, checked } = event.target;

    let tempPermissoes = permissoes?.map((permissao) =>
      permissao.claimWrite === name
        ? { ...permissao, isCheckedClaimWrite: checked }
        : permissao
    );

    setPermissoes(tempPermissoes);

    let tempPerfilUsuario: PerfilUsuarioModel = Object.assign(
      {},
      perfilUsuario,
      {
        menuPermissoes: tempPermissoes,
      }
    );

    adicionarPerfilUsuario(tempPerfilUsuario);
  };

  return (
    <div className={styles.tablePermissoes}>
      <div id="accordion">
        <div className="card">
          <div className="card-header bg-warning">
            <a
              className="btn"
              data-bs-toggle="collapse"
              href="#collapsePermissoes"
            >
              Seleciona as permissões
            </a>
          </div>
          <div
            id="collapsePermissoes"
            className="collapse show"
            data-bs-parent="#accordion"
          >
            <div className="card-body">
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <div className="table-responsive-sm">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Menu</th>
                        <th></th>
                        <th>Leitura</th>
                        <th></th>
                        <th>Escrita</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissoes?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.titulo}</td>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={item.claimRead}
                              checked={item?.isCheckedClaimRead || false}
                              onChange={handleAddClaimReadClick}
                            />
                          </td>
                          <td>{item.claimRead}</td>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={item.claimWrite}
                              checked={item?.isCheckedClaimWrite || false}
                              onChange={handleAddClaimWriteClick}
                            />
                          </td>
                          <td>{item.claimWrite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePermissoes;
