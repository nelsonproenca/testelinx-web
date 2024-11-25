import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";

import { AuthResultType } from "../../../../models/auth.result.type";
import { MenuModel } from "../../../../models/menu.model";
import { PerfilUsuarioModel } from "../../../../models/perfil.usuario.model";
import { PermissaoModel } from "../../../../models/permissao.model";
import { UsuarioModel } from "../../../../models/usuario.model";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import AutenticacaoService from "../../../../services/autenticacao.service";
import MenuService from "../../../../services/menu.service";

import Loading from "../../../Loading";
import TableAccordion from "../TableAccordion";
import TablePermissoes from "../TablePermissoes";

import styles from "./styles.module.scss";

const FormPerfil = () => {
  const [removeLoading, setRemoveLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [perfil, setPerfil] = useState<string>();
  const [novoPerfil, setNovoPerfil] = useState<string>();
  const [listaPerfis, setListaPerfis] = useState<string[]>();
  const [listaMenuItens, setListaMenuItens] = useState<MenuModel[]>();

  const { perfilUsuarioItem, adicionarPerfilUsuario } = useCadastros();

  const perfilUsuario = perfilUsuarioItem;

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    if (!isLoading) {
      return;
    }

    try {
      const respPerfis = await AutenticacaoService.getPerfis();

      const perfis: string[] = respPerfis.data;

      const respMenuItens = await MenuService.getMenuItens(0);

      const menuItens: MenuModel[] = respMenuItens.data;

      setListaPerfis(perfis);
      setListaMenuItens(menuItens);

      setIsLoading(false);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const obtemPermisoes = () => {
    let permissoesModel: PermissaoModel[] = [];

    perfilUsuario?.menuPermissoes?.forEach((element) => {
      if (element.isCheckedClaimRead) {
        let permissao: PermissaoModel = {
          descricao: element.claimRead,
          valor: "true",
        };

        permissoesModel.push(permissao);
      }

      if (element.isCheckedClaimWrite) {
        let permissao: PermissaoModel = {
          descricao: element.claimWrite,
          valor: "true",
        };

        permissoesModel.push(permissao);
      }
    });

    return permissoesModel;
  };

  const handlePerfilChange = (value: string) => {
    setPerfil((perfil) => (perfil = value));

    let tempPerfilUsuario: PerfilUsuarioModel = Object.assign(
      {},
      perfilUsuario,
      {
        perfil: value,
      }
    );

    adicionarPerfilUsuario(tempPerfilUsuario);
  };

  const handleSaveForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (perfilUsuario!.perfil === "Selecione") {
        ToastMessageAlert.fire("", "Selecione um perfil válido", "warning");
        return;
      }

      setRemoveLoading(true);
      let tempPermissoes = obtemPermisoes();

      const respMenuItens =
        await AutenticacaoService.postAdicionarPermissoesUsuario({
          emails: perfilUsuario!.emails,
          perfil: perfilUsuario!.perfil,
          permissoes: tempPermissoes,
        });

      const result: AuthResultType<UsuarioModel> = respMenuItens.data;

      if (result) {
        setRemoveLoading(false);
        ToastMessageAlert.fire("", `${result.description}`, "success");
      }
    } catch (error) {
      setRemoveLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  return (
    <>
      {removeLoading && <Loading />}
      <div className={styles.formPerfilContainer}>
        <form onSubmit={handleSaveForm}>
          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="perfil">
                Perfil:
              </label>
              <div className="row">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    id="perfil"
                    name="perfil"
                    value={perfil || ""}
                    onChange={({ target: { value } }) =>
                      handlePerfilChange(value)
                    }
                  >
                    <option value="Selecione">Selecione</option>
                    {listaPerfis?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8 text-end mt-0">
                  <button
                    title="Adicionar novo perfil"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    type="button"
                    className={styles.buttonAdd}
                  >
                    Novo Perfil
                  </button>
                </div>
              </div>
              <div id="separador" className="w-100 mt-5"></div>
              <div className="row">
                <TableAccordion
                  perfil={perfil!}
                  titulo="Lista de Funcionários"
                />
              </div>
              <div id="separador" className="w-100 mt-5"></div>
              <div className="row">
                <TablePermissoes perfil={perfil!} />
              </div>
              <div id="separador" className="w-100 mt-5"></div>
              <div className="row">
                <div className="col-md-9"></div>
                <div className="col-md-3 mt-5 mb-5">
                  <button type="submit">Salvar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#22304E", color: "#FFFFFF" }}
                >
                  <h4 className="modal-title">Adicionar novo perfil.</h4>
                </div>

                <div className="modal-body">
                  <div className="mb-3 mt-3">
                    <label htmlFor="novoPerfil" className="form-label">
                      Novo Perfil:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="novoPerfil"
                      name="novoPerfil"
                      value={novoPerfil}
                      onChange={({ target: { value } }) =>
                        handlePerfilChange(value)
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="w-25"
                    data-bs-dismiss="modal"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPerfil;
