import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ModelSelect } from "../../../../models/select.model";
import { AreaModel } from "../../../../models/area.model";
import { useCadastros } from "../../../../contexts/CadastrosContextData";

import { VinculoTipos, PerfilTipos } from "../../../../seeds/tipo.seed";

import { FuncionarioModel } from "../../../../models/funcionario.model";

import FuncionarioService from "../../../../services/funcionario.service";
import AreaService from "../../../../services/area.service";
import CargoService from "../../../../services/cargo.service";

import imageUser from "../../../../assets/img/user-solid.svg";

import styles from "./styles.module.scss";

const FormCadFuncionario = () => {
  const [matricula, setMatricula] = useState<string | undefined>("");
  const [nome, setNome] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [apelido, setApelido] = useState<string | undefined>("");
  const [vinculo, setVinculo] = useState<string | undefined>("");
  const [perfil, setPerfil] = useState<string | undefined>("");
  const [codigoArea, setCodigoArea] = useState<number | undefined>(0);
  const [codigoCargo, setCodigoCargo] = useState<number | undefined>(0);
  const [codigoLider, setNomeLider] = useState<string | undefined>("");
  const [codigoCoach, setCodigoCoach] = useState<number | undefined>(0);
  const [dataAdmissao, setDataAdmissao] = useState<string | undefined>("");
  const [nomeArea, setNomeArea] = useState<string | undefined>("");
  const [nomeCargo, setNomeCargo] = useState<string | undefined>("");
  const [nomeCoach, setNomeCoach] = useState<string | undefined>("");
  const [foto, setFoto] = useState<string | undefined>("");
  const [listaArea, setListaArea] = useState<AreaModel[]>();
  const [optionsArea, setOptionsArea] = useState<ModelSelect[]>();
  const [optionsPerfil, setOptionsPerfil] = useState<ModelSelect[]>();
  const [optionsFuncionario, setOptionsFuncionario] = useState<ModelSelect[]>();

  const { adicionarFuncionarioDados } = useCadastros();

  const listaVinculo = VinculoTipos;
  const listaPerfil = PerfilTipos;

  useEffect(() => {
    loadFuncionario();
    loadArea();
    loadPerfil();
  }, []);

  const loadFuncionario = async () => {
    try {
      let option: ModelSelect[] = [];

      const respFuncionario = await FuncionarioService.getPorCoach(0);

      respFuncionario.data!.map((funcionario) => {
        let variavelOptionsMap: ModelSelect = {
          value: funcionario.codigo!.toString(),
          label: funcionario.nome!.toString(),
        };
        option.push(variavelOptionsMap);
      });

      let funcionarioResp = option?.sort((a, b) => {
        const nameA = a.label?.toUpperCase()!;
        const nameB = b.label?.toUpperCase()!;

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOptionsFuncionario(funcionarioResp);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const loadPerfil = async () => {
    try {
      let option: ModelSelect[] = [];

      const respPerfil = await CargoService.getAll();

      respPerfil.data!.map((perfil) => {
        let variavelOptionsMap: ModelSelect = {
          value: perfil.codigo!.toString(),
          label: perfil.nome!.toString(),
        };
        option.push(variavelOptionsMap);
      });
      setOptionsPerfil(option);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const loadArea = async () => {
    try {
      let option: ModelSelect[] = [];

      const respArea = await AreaService.getAll();

      let areaResp = respArea?.data.sort((a, b) => {
        const nameA = a.nome?.toUpperCase()!;
        const nameB = b.nome?.toUpperCase()!;

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setListaArea(areaResp);
      respArea.data!.map((area) => {
        let variavelOptionsMap: ModelSelect = {
          value: area.codigo!.toString(),
          label: area.nome!.toString(),
        };
        option.push(variavelOptionsMap);
      });

      setOptionsArea(option);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleSaveForm = async (event: FormEvent) => {
    event.preventDefault();
    let model: FuncionarioModel = {
      codigo: 0,
      matricula: "",
      nome,
      email,
      apelido,
      ativo: true,
      motivoDesligamento: 0,
      vinculo,
      perfil,
      codigoArea: Number(codigoArea),
      codigoCargo,
      codigoLider: 41,
      codigoCoach,
      dataAdmissao,
      nomeArea,
      nomeCargo,
      nomeCoach,
    };

    onSave(model);
  };

  const onSave = async (funcionarioModel: FuncionarioModel) => {
    try {
      const respFuncionario = await FuncionarioService.create(funcionarioModel);
      if (respFuncionario?.data) {
        Swal.fire("Cadastro", `Cadastro realizado com sucesso.`, "success");
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarFuncionarioDados({} as FuncionarioModel);
  };

  return (
    <div className={styles.formDadosPessoaisContainer}>
      <form id="formFuncionarios">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="row mt-1 p-2">
            <div className="row">
              <div className="col-md-3">
                <div className={styles["foto-colaborador"]}>
                  <img
                    src={foto?.length === 0 ? imageUser : foto}
                    className="img-thumbnail"
                    style={{
                      height: "380px",
                      width: "350px",
                      objectFit: "cover",
                    }}
                    alt="Foto Colaborador"
                  />
                </div>
              </div>
              <div className="col-sm-9 pt-3">
                <div className="row gy-4">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-sm-7">
                        <label className="form-label">Nome Completo</label>
                        <input
                          type="text"
                          title="nomeCompleto"
                          className="form-control"
                          name="nomeCompleto"
                          id="nomeCompleto"
                          value={nome || ""}
                          onChange={({ target: { value } }) => {
                            setNome(value);
                          }}
                        />
                      </div>
                      <div className="col-sm-5">
                        <label className="form-label">Apelido</label>
                        <input
                          type="text"
                          title="apelido"
                          className="form-control"
                          name="apelido"
                          id="apelido"
                          value={apelido || ""}
                          onChange={({ target: { value } }) => {
                            setApelido(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-2">
                        <label htmlFor="dataAdmissao" className="form-label">
                          Admissão
                        </label>
                        <input
                          type="date"
                          title="dataAdmissao"
                          className="form-control"
                          name="dataAdmissao"
                          id="dataAdmissao"
                          value={dataAdmissao || ""}
                          onChange={({ target: { value } }) => {
                            setDataAdmissao(value);
                          }}
                        />
                      </div>

                      <div className="col-md-3">
                        <div className="col-md-12">
                          <label htmlFor="area" className="form-label">
                            Área
                          </label>
                          <div className="input-group gap-12">
                            <select
                              className="form-select"
                              id="area"
                              name="area"
                              value={codigoArea || ""}
                              onChange={({ target: { value } }) => {
                                const { codigo, nome } = JSON.parse(value);
                                setCodigoArea(codigo);
                                setNomeArea(nome);
                              }}
                            >
                              <option value="">Selecione</option>
                              {optionsArea?.map((classif, index) => {
                                const optionValue = JSON.stringify({
                                  codigo: classif.value,
                                  nome: classif.label,
                                });
                                return (
                                  <option
                                    key={index}
                                    value={nome}
                                    selected={
                                      optionValue ===
                                      JSON.stringify({
                                        codigo: codigoArea,
                                        nome: nomeArea,
                                      })
                                    }
                                  >
                                    {classif.label}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Cargo</label>
                        <div className="input-group gap-12">
                          <select
                            className="form-select"
                            id="codigoCargo"
                            name="codigoCargo"
                            value={codigoCargo || ""}
                            onChange={({ target: { value } }) => {
                              setCodigoCargo(Number(value));
                            }}
                          >
                            <option>Selecione</option>
                            {optionsPerfil?.map((classif, index) => (
                              <option key={index} value={classif.value}>
                                {classif.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Vínculo</label>
                        <div className="input-group gap-12">
                          <select
                            className="form-select"
                            id="vinculo"
                            name="vinculo"
                            value={vinculo || ""}
                            onChange={({ target: { value } }) => {
                              setVinculo(value);
                            }}
                          >
                            <option>Selecione</option>
                            {listaVinculo?.map((item, index) => (
                              <option key={index} value={item.codigo}>
                                {item.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Coach</label>
                        <div className="input-group gap-12">
                          <select
                            className="form-select"
                            id="nomeCoach"
                            name="nomeCoach"
                            value={nomeCoach || ""}
                            onChange={({ target: { value } }) => {
                              setNomeCoach(value);
                              /*setCodigoCoach();*/
                            }}
                          >
                            <option>Selecione</option>
                            {optionsFuncionario?.map((classif, index) => (
                              <option key={index} value={classif.value}>
                                {classif.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Líder</label>
                        <select
                          className="form-select"
                          id="Lider"
                          name="Lider"
                          value={codigoLider || ""}
                          onChange={({ target: { value } }) => {
                            setNomeLider(value);
                          }}
                        >
                          <option>Selecione</option>
                          {optionsFuncionario?.map((classif, index) => (
                            <option key={index} value={classif.value}>
                              {classif.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-7 ">
                        <label htmlFor="email" className="form-label">
                          E-mail
                        </label>
                        <input
                          type="email"
                          title="E-mail"
                          className="form-control"
                          name="email"
                          id="email"
                          value={email || ""}
                          onChange={({ target: { value } }) => {
                            setEmail(value);
                          }}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Perfil</label>
                        <div className="input-group gap-12">
                          <select
                            className="form-select"
                            id="codigoPerfil"
                            name="codigoPerfil"
                            value={perfil || ""}
                            onChange={({ target: { value } }) => {
                              setPerfil(value);
                            }}
                          >
                            <option>Selecione</option>
                            {listaPerfil?.map((classif, index) => (
                              <option key={index} value={classif.codigo}>
                                {classif.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1 p-3"></div>
          </div>
        </fieldset>
      </form>
      <div className="row mt-4 justify-content-end">
        <div className="col-md-4 mt-4">
          <button
            className="w-100"
            type="button"
            onClick={(event) => handleSaveForm(event)}
          >
            Cadastrar Profissional
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCadFuncionario;
