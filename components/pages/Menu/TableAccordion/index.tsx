/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormEvent, useEffect, useState } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PerfilUsuarioModel } from "../../../../models/perfil.usuario.model";
import { PermissaoModel } from "../../../../models/permissao.model";
import { AuthResultType } from "../../../../models/auth.result.type";
import { UsuarioModel } from "../../../../models/usuario.model";

import AutenticacaoService from "../../../../services/autenticacao.service";

import { useCadastros } from "../../../../contexts/CadastrosContextData";

import Filter from "../../Avaliacoes/Filter";

import styles from "./styles.module.scss";
import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";
import { FuncionarioModel } from "../../../../models/funcionario.model";
import FuncionarioService from "../../../../services/funcionario.service";

type TableAccordionProps = {
  titulo: string;
  perfil: string;
};

const TableAccordion = ({ titulo, perfil }: TableAccordionProps) => {
  const [profissionais, setProfissionais] = useState<FuncionarioModel[]>();
  const [itemPesquisa, setItemPesquisa] = useState<string>();

  const { perfilUsuarioItem, adicionarPerfilUsuario } = useCadastros();

  const perfilUsuario = perfilUsuarioItem;

  useEffect(() => {
    loadData();
  }, [perfil]);

  useEffect(() => {
    pesquisar(itemPesquisa!);
  }, [itemPesquisa]);

  const loadData = async () => {
    try {
      const respProjetos = await FuncionarioService.getPorPerfil(perfil);

      let ordenarPorPerfil = (a: FuncionarioModel, b: FuncionarioModel) =>
        b.perfil!.localeCompare(a.perfil!);

      let ordenarPorApelido = (a: FuncionarioModel, b: FuncionarioModel) =>
        a.apelido!.localeCompare(b.apelido!);

      let ordenarPorCodigo = (a: FuncionarioModel, b: FuncionarioModel) =>
        a.codigo! - b.codigo!;

      const listaFuncionarios: FuncionarioModel[] =
        respProjetos.data.sort(ordenarPorPerfil);

      const listaFuncionariosPerfil: FuncionarioModel[] = listaFuncionarios.map(
        (prof) => {
          if (prof.perfil) {
            prof.isChecked =
              prof.perfil?.toLowerCase() === perfil.toLowerCase();
          }
          return prof;
        }
      );

      let emails: string[] = [];

      listaFuncionariosPerfil?.forEach((element) => {
        if (element.isChecked) {
          emails.push(element.email!);
        }
      });

      setProfissionais(listaFuncionariosPerfil);

      if (perfil) {
        const respPermissoes = await AutenticacaoService.getPermissoes(perfil);

        const permissoes: PermissaoModel[] = respPermissoes.data;

        let tempPerfilUsuario: PerfilUsuarioModel = Object.assign(
          {},
          {
            perfil,
            emails,
            permissoes,
          }
        );

        adicionarPerfilUsuario(tempPerfilUsuario);
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const pesquisar = (item: string) => {
    if (item === "") {
      loadData();
      return;
    }

    if (profissionais) {
      const listaFuncionariosFilter = profissionais?.map((prof) => {
        if (prof.perfil) {
          if (prof?.perfil?.match(item.toUpperCase())) {
            return prof!;
          }
        }
        if (prof.codigo) {
          if (prof?.codigo?.toString().match(item)) {
            return prof!;
          }
        }
        if (prof.apelido !== undefined) {
          if (prof.apelido?.match(item.toUpperCase())) {
            return prof!;
          }
        }
      });

      const listaFuncionariosPerfil = listaFuncionariosFilter.filter(
        (prof) => prof !== undefined
      );

      setProfissionais(listaFuncionariosPerfil as FuncionarioModel[]);
    }
  };

  const handleAddClick = (event: any) => {
    const { name, checked } = event.target;

    let tempFuncionario;

    if (name === "allSelect") {
      tempFuncionario = profissionais?.map((profissional) => {
        return { ...profissional, isChecked: checked };
      });

      setProfissionais(tempFuncionario);
    } else {
      tempFuncionario = profissionais?.map((profissional) =>
        profissional.apelido === name
          ? { ...profissional, isChecked: checked }
          : profissional
      );
      setProfissionais(tempFuncionario);
    }

    let emails: string[] = [];

    tempFuncionario?.forEach((element) => {
      if (element.isChecked) {
        emails.push(element.email!);
      }
    });

    let tempPerfilUsuario: PerfilUsuarioModel = Object.assign(
      {},
      perfilUsuario,
      {
        emails,
      }
    );

    adicionarPerfilUsuario(tempPerfilUsuario);
  };

  const handleRemoverClick = async (
    event: FormEvent,
    email: string,
    codigo: number
  ) => {
    event.preventDefault();

    try {
      const respRemoverPerfil = await AutenticacaoService.putRemoverPerfil(
        email,
        ""
      );

      const result: AuthResultType<UsuarioModel> = respRemoverPerfil.data;

      if (result) {
        ToastMessageAlert.fire("", `${result.description}`, "success");
      }

      const code: number = result.code.indexOf("Success");

      if (code >= 0) {
        let novaListaProfissionais = profissionais?.filter(
          (proj) => proj.codigo !== codigo
        );

        setProfissionais(novaListaProfissionais);
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onSearch = (value: string) => setItemPesquisa(value);

  return (
    <div className={styles.tableAccordion}>
      <div id="accordion">
        <div className="card">
          <div className="card-header bg-warning">
            <a className="btn" data-bs-toggle="collapse" href="#collapseOne">
              {titulo}
            </a>
          </div>
          <div
            id="collapseOne"
            className="collapse show"
            data-bs-parent="#accordion"
          >
            <div className="card-body">
              <Filter
                verPeriodo={false}
                verResultados={false}
                onSearch={onSearch}
              />
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <div className="table-responsive-sm">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            title="Selecionar todos"
                            name="allSelect"
                            onChange={handleAddClick}
                          />
                        </th>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Perfil</th>
                        <th className="text-center">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profissionais?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name={item?.apelido || ""}
                              checked={item?.isChecked || false}
                              onChange={handleAddClick}
                            />
                          </td>
                          <td>{item?.codigo}</td>
                          <td>{item?.apelido}</td>
                          <td>{item?.perfil}</td>
                          <td className="text-center">
                            {item?.perfil?.length! > 0 ? (
                              <a
                                href="#"
                                title="Excluir"
                                onClick={(event) => {
                                  handleRemoverClick(
                                    event,
                                    item?.email!,
                                    item?.codigo!
                                  );
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  size="1x"
                                  className="text-danger"
                                />
                              </a>
                            ) : (
                              <></>
                            )}
                          </td>
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

export default TableAccordion;
