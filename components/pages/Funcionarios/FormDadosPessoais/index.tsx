import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { cpf } from "cpf-cnpj-validator";
import moment from "moment";

import useToken from "../../../../hooks/useToken";
import { useCadastros } from "../../../../contexts/CadastrosContextData";
import {
  Racas,
  IdentidadeGeneros,
  EstadoCivis,
  TipoDocumentoUpload,
  MotivoDesligamentos,
  handleOrdenarListaSeed,
} from "../../../../seeds/tipo.seed";

import FuncionarioService from "../../../../services/funcionario.service";
import MunicipioService from "../../../../services/municipio.service";
import FuncionarioArquivoService from "../../../../services/funcionario.arquivo.service";
import AreaService from "../../../../services/area.service";
import BancoCnabService from "../../../../services/banco.cnab.service";
import CargoService from "../../../../services/cargo.service";
import FuncaoService from "../../../../services/funcao.service";

import { FuncionarioModel } from "../../../../models/funcionario.model";
import { RegistroModel } from "../../../../models/registro.model";
import { FuncionarioArquivoModel } from "../../../../models/funcionario.arquivo.model";
import { ModelSelect } from "../../../../models/select.model";
import { BancoCnabModel } from "../../../../models/banco.cnab.model";
import { AreaModel } from "../../../../models/area.model";
import { CargoModel } from "../../../../models/cargo.model";
import { FuncaoModel } from "../../../../models/funcao.model";

import imageUser from "../../../../assets/img/user-solid.svg";

import Loading from "../../../Loading";

import styles from "./styles.module.scss";
import FormDependentes from "../FormDependentes";
import FormContatoEmergencia from "../FormContatoEmergencia";

type FormDadosPessoaisProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormDadosPessoais = ({
  codigoFuncionario,
  edicao,
}: FormDadosPessoaisProps) => {
  const [nome, setNome] = useState<string | undefined>("");
  const [dataNascimento, setDataNascimento] = useState<string | undefined>("");
  const [dataAdmissao, setDataAdmissao] = useState<string | undefined>("");
  const [matricula, setMatricula] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [estadoCivilCodigo, setEstadoCivilCodigo] = useState<
    number | undefined
  >(0);
  const [nacionalidade, setNacionalidade] = useState<string | undefined>("");
  const [naturalidade, setNaturalidade] = useState<string | undefined>("");
  const [numeroFilhos, setNumeroFilhos] = useState<number | undefined>(0);
  const [numeroDependentes, setNumeroDependentes] = useState<
    number | undefined
  >(0);
  const [deficienciaIntelectual, setDeficienciaIntelectual] = useState<
    boolean | undefined
  >(false);
  const [deficienciaFisica, setDeficienciaFisica] = useState<
    boolean | undefined
  >(false);
  const [deficienciaVisual, setDeficienciaVisual] = useState<
    boolean | undefined
  >(false);
  const [deficienciaAuditiva, setDeficienciaAuditiva] = useState<
    boolean | undefined
  >(false);
  const [deficienciaPsicossocial, setDeficienciaPsicossocial] = useState<
    boolean | undefined
  >(false);
  const [nomeSocial, setNomeSocial] = useState<string | undefined>("");
  const [racaCodigo, setRacaCodigo] = useState<number | undefined>(0);
  const [identidadeGeneroCodigo, setIdentidadeGeneroCodigo] = useState<
    number | undefined
  >(0);
  const [nomePai, setNomePai] = useState<string | undefined>("");
  const [nomeMae, setNomeMae] = useState<string | undefined>("");
  const [rg, setRg] = useState<string | undefined>("");
  const [orgaoEmissorRg, setOrgaoEmissorRg] = useState<string | undefined>("");
  const [dataEmissaoRg, setDataEmissaoRg] = useState<string | undefined>("");
  const [numeroCpf, setNumeroCpf] = useState<string | undefined>("");
  const [pisPasep, setPisPasep] = useState<string | undefined>("");
  const [ctps, setCtps] = useState<string | undefined>("");
  const [ctpsUf, setCtpsUf] = useState<string | undefined>("");
  const [serieCTPS, setSerieCTPS] = useState<string | undefined>("");
  const [cnh, setCnh] = useState<string | undefined>("");
  const [categoriaCnh, setCategoriaCnh] = useState<string | undefined>("");
  const [dataEmissaoCnh, setDataEmissaoCnh] = useState<string | undefined>("");
  const [dataValidadeCnh, setDataValidadeCnh] = useState<string | undefined>(
    ""
  );
  const [tituloEleitor, setTituloEleitor] = useState<string | undefined>("");
  const [secaoTituloEleitor, setSecaoTituloEleitor] = useState<
    number | undefined
  >(0);
  const [zonaTituloEleitor, setZonaTituloEleitor] = useState<
    number | undefined
  >(0);
  const [apelido, setApelido] = useState<string | undefined>("");

  const [codigoCargo, setCodigoCargo] = useState<number | undefined>(0);
  const [codigoCoach, setCodigoCoach] = useState<number | undefined>(0);
  const [codigoLider, setCodigoLider] = useState<number | undefined>(0);
  const [codigoArea, setCodigoArea] = useState<number | undefined>(0);
  const [codigoFuncao, setCodigoFuncao] = useState<number | undefined>(0);

  const [numeroConta, setNumeroConta] = useState<number | undefined>(0);
  const [digitoConta, setDigitoConta] = useState<string | undefined>("");
  const [digitoAgencia, setDigitoAgencia] = useState<string | undefined>("");
  const [codigoBanco, setCodigoBanco] = useState<number | undefined>(0);
  const [agencia, setAgencia] = useState<number | undefined>(0);

  const [codigoMotivoDesligamento, setCodigoMotivoDesligamento] =
    useState<number>(0);
  const [dataDesligamento, setDataDesligamento] = useState<string>("");
  const [ativo, setAtivo] = useState<boolean | undefined>(false);

  const [nomeArea, setNomeArea] = useState<string | undefined>("");
  const [nomeCargo, setNomeCargo] = useState<string | undefined>("");
  const [nomeCoach, setNomeCoach] = useState<string | undefined>("");
  const [nomeLider, setNomeLider] = useState<string | undefined>("");
  const [nomeFuncao, setNomeFuncao] = useState<string | undefined>("");

  const [coaches, setCoaches] = useState<ModelSelect[]>();
  const [lideres, setLideres] = useState<ModelSelect[]>();
  const [cargos, setCargos] = useState<CargoModel[]>();
  const [areas, setAreas] = useState<AreaModel[]>();
  const [ufs, setUfs] = useState<RegistroModel[] | undefined>();
  const [bancos, setBancos] = useState<BancoCnabModel[]>();
  const [funcoes, setFuncoes] = useState<FuncaoModel[]>();

  const [listaIdentidadeGenero, setListaIdentidadeGenero] = useState<
    RegistroModel[] | undefined
  >();
  const [listaMotivoDesligamento, setListaMotivoDesligamento] = useState<
    RegistroModel[] | undefined
  >();
  const [listaEstadoCivil, setListaEstadoCivil] = useState<
    RegistroModel[] | undefined
  >();
  const [listaRaca, setListaRaca] = useState<RegistroModel[] | undefined>();

  const [foto, setFoto] = useState<string | undefined>("");
  const [isLoadingDados, setIsLoadingDados] = useState<boolean>(true);

  const { token } = useToken();

  const { funcionarioDadosItem, adicionarFuncionarioDados } = useCadastros();

  const funcionarioDados = funcionarioDadosItem;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setNome(funcionarioDados?.nome);
    setDataNascimento(
      funcionarioDados?.dataNascimento !== null
        ? moment(funcionarioDados?.dataNascimento).format("YYYY-MM-DD")
        : ""
    );
    setDataAdmissao(
      moment(funcionarioDados?.dataAdmissao).format("YYYY-MM-DD")
    );
    setMatricula(funcionarioDados?.matricula);
    setEmail(funcionarioDados?.email);
    setEstadoCivilCodigo(funcionarioDados?.estadoCivil);
    setNacionalidade(funcionarioDados?.nacionalidade);
    setNaturalidade(funcionarioDados?.naturalidade);
    setNumeroFilhos(funcionarioDados?.numeroFilhos);
    setNumeroDependentes(funcionarioDados?.numeroDependentes);
    setDeficienciaIntelectual(funcionarioDados?.deficienciaIntelectual);
    setDeficienciaFisica(funcionarioDados?.deficienciaFisica);
    setDeficienciaVisual(funcionarioDados?.deficienciaVisual);
    setDeficienciaAuditiva(funcionarioDados?.deficienciaAuditiva);
    setDeficienciaPsicossocial(funcionarioDados?.deficienciaPsicossocial);
    setNomeSocial(funcionarioDados?.nomeSocial);
    setRacaCodigo(funcionarioDados?.tipoRaca);
    setIdentidadeGeneroCodigo(funcionarioDados?.identidadeGenero);
    setNomePai(funcionarioDados?.nomePai);
    setNomeMae(funcionarioDados?.nomeMae);
    setRg(funcionarioDados?.rg);
    setOrgaoEmissorRg(funcionarioDados?.orgaoEmissorRg);
    setDataEmissaoRg(
      moment(funcionarioDados?.dataEmissaoRg).format("YYYY-MM-DD")
    );
    setNumeroCpf(funcionarioDados?.cpf);
    setPisPasep(funcionarioDados?.pisPasep);
    setCtps(funcionarioDados?.ctps);
    setCtpsUf(funcionarioDados?.ctpsUf);
    setSerieCTPS(funcionarioDados?.serieCTPS);
    setCnh(funcionarioDados?.cnh);
    setCategoriaCnh(funcionarioDados?.categoriaCnh);
    setDataEmissaoCnh(
      funcionarioDados?.dataEmissaoCnh !== null
        ? moment(funcionarioDados?.dataEmissaoCnh).format("YYYY-MM-DD")
        : ""
    );
    setDataValidadeCnh(
      funcionarioDados?.dataValidadeCnh !== null
        ? moment(funcionarioDados?.dataValidadeCnh).format("YYYY-MM-DD")
        : ""
    );
    setTituloEleitor(funcionarioDados?.tituloEleitor);
    setSecaoTituloEleitor(funcionarioDados?.secaoTituloEleitor);
    setZonaTituloEleitor(funcionarioDados?.zonaTituloEleitor);
    setCodigoBanco(funcionarioDados?.codigoBanco!);
    setAgencia(funcionarioDados?.agencia);
    setNumeroConta(funcionarioDados?.numeroConta);
    setDigitoConta(funcionarioDados?.digitoConta);
    setNomeArea(funcionarioDados?.nomeArea);
    setNomeCargo(funcionarioDados?.nomeCargo);
    setNomeCoach(funcionarioDados?.nomeCoach);
    setNomeLider(funcionarioDados?.nomeLider);
    setApelido(funcionarioDados?.apelido);
    setCodigoLider(funcionarioDados?.codigoLider);
    setCodigoCoach(funcionarioDados?.codigoCoach);
    setCodigoCargo(funcionarioDados?.codigoCargo);
    setCodigoArea(funcionarioDados?.codigoArea);
    setCodigoFuncao(funcionarioDados?.codigoFuncao);
    setNomeFuncao(funcionarioDados?.nomeFuncao);
    setAtivo(funcionarioDados?.ativo);
    setCodigoMotivoDesligamento(funcionarioDados?.motivoDesligamento!);
    setDataDesligamento(
      funcionarioDados?.dataDesligamento !== null
        ? moment(funcionarioDados?.dataDesligamento).format("YYYY-MM-DD")
        : moment().format("0001-01-01")
    );

    setListaIdentidadeGenero(handleOrdenarListaSeed(IdentidadeGeneros));
    setListaEstadoCivil(handleOrdenarListaSeed(EstadoCivis));
    setListaRaca(handleOrdenarListaSeed(Racas));
    setListaMotivoDesligamento(handleOrdenarListaSeed(MotivoDesligamentos));
  }, [funcionarioDados]);

  const loadData = async () => {
    try {
      setIsLoadingDados(true);
      await loadDataDadosPessoais();
      await loadFoto();
      await loadDataOutros();
      await loadDataCoach();
      setIsLoadingDados(false);
    } catch (error) {
      setIsLoadingDados(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const loadDataDadosPessoais = async () => {
    let codigo: number = edicao!
      ? codigoFuncionario!
      : Number(token.codigoProfissional!);

    const respDadosFuncionarios = await FuncionarioService.getDadosPessoais(
      codigo!
    );

    if (respDadosFuncionarios) {
      const funcionarioModel: FuncionarioModel = respDadosFuncionarios.data;

      adicionarFuncionarioDados(funcionarioModel);
    }
  };

  const loadFoto = async () => {
    let codigo: number = edicao!
      ? codigoFuncionario!
      : Number(token.codigoProfissional!);

    const respFotoFuncionario = await FuncionarioArquivoService.get(
      codigo,
      TipoDocumentoUpload.Foto_3x4
    );

    let arquivoModel: FuncionarioArquivoModel = {} as FuncionarioArquivoModel;

    if (respFotoFuncionario.data) {
      arquivoModel = respFotoFuncionario.data;
      const respDownloadFoto = await FuncionarioArquivoService.download(
        arquivoModel.nome!,
        codigo
      );

      if (respDownloadFoto) {
        const imagem: string = respDownloadFoto.data;
        const nomeArquivo: string = arquivoModel.nome!;
        const extensao: string = nomeArquivo.substring(
          nomeArquivo.indexOf(".") + 1
        );

        if (imagem) {
          const base64ImageData = `data:image/${extensao};base64,${imagem}`;
          setFoto(base64ImageData);
        }
      }
    }
  };

  const loadDataOutros = async () => {
    const respCargo = await CargoService.getAll();

    if (respCargo) {
      setCargos(respCargo.data);
    }

    const respArea = await AreaService.getAll();

    if (respArea) {
      setAreas(respArea.data);
    }

    const respUfs = await MunicipioService.getUfs();

    if (respUfs) {
      setUfs(respUfs.data);
    }

    const respBancosCnab = await BancoCnabService.getAll();

    if (respBancosCnab) {
      setBancos(handleOrdenarListaSeed(respBancosCnab.data));
    }

    const respFuncao = await FuncaoService.getAll();

    if (respFuncao) {
      setFuncoes(respFuncao.data);
    }
  };

  const loadDataCoach = async () => {
    let option: ModelSelect[] = [];

    const respFuncionario = await FuncionarioService.getAtivos(0, true);

    if (respFuncionario) {
      respFuncionario.data?.map((funcionario) => {
        let variavelOptionsMap: ModelSelect = {
          value: funcionario.codigo!.toString(),
          label: funcionario.apelido!.toString(),
        };
        option.push(variavelOptionsMap);
      });

      setLideres(option);
      setCoaches(option);
    }
  };

  const validar = () => {
    if (!cpf.isValid(numeroCpf!)) {
      return "CPF Inválido. Verifique.";
    }

    if (!racaCodigo) {
      return "O campo Raça não está preenchido. Verifique.";
    }

    return "";
  };

  const mapear = () => {
    const dataNascimentoValida: string =
      !dataNascimento || dataNascimento === "Invalid date"
        ? "1900-01-01"
        : dataNascimento;
    const dataValidadeCnhValida: string =
      !dataValidadeCnh || dataValidadeCnh === "Invalid date"
        ? "1900-01-01"
        : dataValidadeCnh;
    const dataEmissaoCnhValida: string =
      !dataEmissaoCnh || dataEmissaoCnh === "Invalid date"
        ? "1900-01-01"
        : dataEmissaoCnh;
    const dataEmissaoRgValida: string =
      !dataEmissaoRg || dataEmissaoRg === "Invalid date"
        ? "1900-01-01"
        : dataEmissaoRg;
    const dataDesligamentoValida: string =
      !dataDesligamento || dataDesligamento === "Invalid date"
        ? "1900-01-01"
        : dataDesligamento;

    let model: FuncionarioModel = {
      codigo: Number(token.codigoProfissional),
      nome,
      dataAdmissao: dataAdmissao ?? "1900-01-01",
      dataNascimento: dataNascimentoValida,
      email,
      estadoCivil: estadoCivilCodigo,
      nacionalidade,
      naturalidade,
      numeroFilhos,
      numeroDependentes,
      deficienciaIntelectual,
      deficienciaFisica,
      deficienciaVisual,
      deficienciaAuditiva,
      deficienciaPsicossocial,
      nomeSocial,
      tipoRaca: racaCodigo,
      identidadeGenero: identidadeGeneroCodigo,
      nomePai,
      nomeMae,
      rg,
      orgaoEmissorRg,
      dataEmissaoRg: dataEmissaoRgValida,
      cpf: numeroCpf,
      pisPasep: pisPasep ?? "",
      ctps,
      ctpsUf,
      serieCTPS,
      cnh,
      categoriaCnh: categoriaCnh ?? "",
      dataEmissaoCnh: dataEmissaoCnhValida,
      dataValidadeCnh: dataValidadeCnhValida,
      tituloEleitor,
      secaoTituloEleitor,
      zonaTituloEleitor,
      codigoBanco,
      agencia,
      numeroConta,
      digitoConta,
      digitoAgencia,
      dataDesligamento: dataDesligamentoValida,
      codigoFuncao,
      codigoCargo: codigoCargo,
    };

    return model;
  };

  const handleSaveForm = async (event: FormEvent) => {
    event.preventDefault();

    const valido: string = validar();

    if (valido.length > 0) {
      Swal.fire("Validação", valido, "warning");
      return;
    }

    const model: FuncionarioModel = mapear();

    await onUpdate(model);
  };

  const onUpdate = async (model: FuncionarioModel) => {
    try {
      const respFuncionario = await FuncionarioService.updateDadosPessoais(
        model
      );

      if (respFuncionario?.data) {
        Swal.fire("Atualização", `Dados Atualizados com sucesso.`, "success");
      }

      await loadDataDadosPessoais();
      setIsLoadingDados(false);
    } catch (error) {
      setIsLoadingDados(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  return (
    <>
      {isLoadingDados && <Loading />}
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
                        height: "300px",
                        width: "270px",
                        objectFit: "cover",
                      }}
                      alt="Foto Colaborador"
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div
                        className={
                          styles["input-text"] +
                          " fw-bold text-center fs-2 w-100 mb-2"
                        }
                      >
                        {nomeCargo?.toUpperCase().match("SOCIO")
                          ? "Sócio"
                          : "Empregado"}
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <label className="form-label">Apelido</label>
                      {!edicao ? (
                        <label className={styles["input-text"]}>
                          {apelido}
                        </label>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-9 pt-3">
                  <div className="row gy-4">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-sm-7">
                          <label className="form-label">Nome Completo</label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {nome}
                            </label>
                          ) : (
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
                          )}
                        </div>
                        <div className="col-md-5">
                          <label
                            htmlFor="dataNascimento"
                            className="form-label"
                          >
                            Data de Nascimento
                          </label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {moment(dataNascimento).format("DD/MM/YYYY")}
                            </label>
                          ) : (
                            <input
                              type="date"
                              title="Digite a data de nascimento"
                              className="form-control"
                              name="dataNascimento"
                              id="dataNascimento"
                              value={dataNascimento || ""}
                              onChange={({ target: { value } }) => {
                                setDataNascimento(value);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor="matricula" className="form-label">
                            Matrícula
                          </label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {matricula}
                            </label>
                          ) : (
                            <input
                              type="text"
                              title="matricula"
                              className="form-control"
                              name="matricula"
                              id="matricula"
                              value={matricula || ""}
                              onChange={({ target: { value } }) => {
                                setMatricula(value);
                              }}
                            />
                          )}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="dataAdmissao" className="form-label">
                            Admissão
                          </label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {moment(dataAdmissao).format("DD/MM/YYYY")}
                            </label>
                          ) : (
                            <input
                              type="date"
                              title="Digite a data de Admissão"
                              className="form-control"
                              name="dataAdmissao"
                              id="dataAdmissao"
                              value={dataAdmissao || ""}
                              onChange={({ target: { value } }) => {
                                setDataAdmissao(value);
                              }}
                            />
                          )}
                        </div>
                        <div className="col-md-4 ">
                          <div className="col-md-12">
                            <label htmlFor="area" className="form-label">
                              Área
                            </label>
                            {!edicao ? (
                              <label className={styles["input-text"]}>
                                {nomeArea}
                              </label>
                            ) : (
                              <div className="input-group gap-12">
                                <select
                                  className="form-select"
                                  id="area"
                                  name="area"
                                  value={codigoArea || ""}
                                  onChange={({ target: { value } }) => {
                                    setCodigoArea(Number(value));
                                  }}
                                >
                                  <option>Selecione</option>
                                  {areas?.map((item, index) => (
                                    <option key={index} value={item.codigo}>
                                      {item.nome}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Cargo</label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {nomeCargo}
                            </label>
                          ) : (
                            <select
                              className="form-select"
                              id="nomeCargo"
                              name="nomeCargo"
                              value={codigoCargo || ""}
                              onChange={({ target: { value } }) => {
                                setNomeCargo(value);
                                setCodigoCargo(Number(value));
                              }}
                            >
                              <option>Selecione</option>
                              {cargos?.map((item, index) => (
                                <option key={index} value={item.codigo}>
                                  {item.nome}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div className="col-md-6">
                          <div className="col-md-12">
                            <label
                              htmlFor="codigoFuncao"
                              className="form-label"
                            >
                              Função
                            </label>
                            {!edicao ? (
                              <label className={styles["input-text"]}>
                                {nomeFuncao}
                              </label>
                            ) : (
                              <div className="input-group gap-12">
                                <select
                                  className="form-select"
                                  id="codigoFuncao"
                                  name="codigoFuncao"
                                  value={codigoFuncao || ""}
                                  onChange={({ target: { value } }) => {
                                    setCodigoFuncao(Number(value));
                                  }}
                                >
                                  <option>Selecione</option>
                                  {funcoes?.map((item, index) => (
                                    <option key={index} value={item.codigo}>
                                      {item.nome}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Coach</label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {nomeCoach}
                            </label>
                          ) : (
                            <select
                              className="form-select"
                              id="nomeCoach"
                              name="nomeCoach"
                              value={codigoCoach || ""}
                              onChange={({ target: { value } }) => {
                                setCodigoCoach(Number(value));
                                setNomeCoach(nomeCoach);
                              }}
                            >
                              <option>Selecione</option>
                              {coaches?.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Líder</label>
                          {!edicao ? (
                            <label className={styles["input-text"]}>
                              {nomeLider}
                            </label>
                          ) : (
                            <select
                              className="form-select"
                              id="nomeLider"
                              name="nomeLider"
                              value={codigoLider || ""}
                              onChange={({ target: { value } }) => {
                                setCodigoLider(Number(value));
                                setNomeLider(nomeLider);
                              }}
                            >
                              <option>Selecione</option>
                              {lideres?.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          )}
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
                        <div className="col-md-5">
                          <label htmlFor="estadoCivil" className="form-label">
                            Estado civil
                          </label>
                          <select
                            className="form-select"
                            id="estadoCivil"
                            name="estadoCivil"
                            value={estadoCivilCodigo || ""}
                            onChange={({ target: { value } }) => {
                              setEstadoCivilCodigo(Number(value));
                            }}
                          >
                            <option>Selecione</option>
                            {listaEstadoCivil?.map((classif, index) => (
                              <option key={index} value={classif.codigo}>
                                {classif.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1 p-3">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="nacionalidade" className="form-label">
                        Nacionalidade
                      </label>
                      <input
                        type="text"
                        title="Informe a sua nacionalidade"
                        className="form-control"
                        name="nacionalidade"
                        id="nacionalidade"
                        placeholder="Digite sua nacionalidade"
                        value={nacionalidade || ""}
                        onChange={({ target: { value } }) => {
                          setNacionalidade(value);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="naturalidade" className="form-label">
                        Naturalidade
                      </label>
                      <input
                        type="text"
                        title="Informe a sua naturalidade"
                        className="form-control"
                        name="naturalidade"
                        id="naturalidade"
                        placeholder="Digite sua naturalidade"
                        value={naturalidade || ""}
                        onChange={({ target: { value } }) => {
                          setNaturalidade(value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1 p-3">
                <div className="col-md-2">
                  <label htmlFor="numeroFilhos" className="form-label">
                    Número de filhos
                  </label>
                  <input
                    type="number"
                    title="Digite o número de filhos"
                    className="form-control w-75"
                    name="numeroFilhos"
                    id="numeroFilhos"
                    placeholder="0"
                    value={numeroFilhos || ""}
                    onChange={({ target: { value } }) => {
                      setNumeroFilhos(Number(value));
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="numeroDependentes" className="form-label">
                    N° de dependentes
                  </label>
                  <input
                    type="number"
                    title="Digite o número de dependentes"
                    className="form-control w-75"
                    name="numeroDependentes"
                    id="numeroDependentes"
                    placeholder="0"
                    value={numeroDependentes || ""}
                    onChange={({ target: { value } }) => {
                      setNumeroDependentes(Number(value));
                    }}
                  />
                </div>
                <div className="col-md-7">
                  <label className="form-label user-select-none">
                    Deficiência
                  </label>
                  <div className="col-md-12">
                    <div className="form-check form-switch form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deficienciaIntelectual"
                        name="deficienciaIntelectual"
                        checked={deficienciaIntelectual || false}
                        onChange={(event) => {
                          setDeficienciaIntelectual(event.target.checked);
                        }}
                      />
                      <label
                        htmlFor="deficienciaIntelectualL"
                        className="form-check-label user-select-none"
                      >
                        Intelectual
                      </label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deficienciaFisica"
                        name="deficienciaFisica"
                        checked={deficienciaFisica || false}
                        onChange={(event) => {
                          setDeficienciaFisica(event.target.checked);
                        }}
                      />
                      <label
                        htmlFor="deficienciaFisicaL"
                        className="form-check-label user-select-none"
                      >
                        Física
                      </label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deficienciaVisual"
                        name="deficienciaVisual"
                        checked={deficienciaVisual || false}
                        onChange={(event) => {
                          setDeficienciaVisual(event.target.checked);
                        }}
                      />
                      <label
                        htmlFor="deficienciaVisualL"
                        className="form-check-label user-select-none"
                      >
                        Visual
                      </label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deficienciaAuditiva"
                        name="deficienciaAuditiva"
                        checked={deficienciaAuditiva || false}
                        onChange={(event) => {
                          setDeficienciaAuditiva(event.target.checked);
                        }}
                      />
                      <label
                        htmlFor="deficienciaAuditivaL"
                        className="form-check-label user-select-none"
                      >
                        Auditiva
                      </label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="deficienciaPsicossocial"
                        name="deficienciaPsicossocial"
                        checked={deficienciaPsicossocial || false}
                        onChange={(event) => {
                          setDeficienciaPsicossocial(event.target.checked);
                        }}
                      />
                      <label
                        htmlFor="deficienciaPsicossocialL"
                        className="form-check-label user-select-none"
                      >
                        Psicossocial
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1 p-3">
                <div className="col-md-6">
                  <label htmlFor="nomeSocial" className="form-label">
                    Nome Social
                  </label>
                  <input
                    type="text"
                    title="Informe o Nome Social"
                    className="form-control"
                    name="nomeSocial"
                    id="nomeSocial"
                    placeholder="Digite o nome social"
                    value={nomeSocial || ""}
                    onChange={({ target: { value } }) => {
                      setNomeSocial(value);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="raca" className="form-label">
                    Raça
                  </label>
                  <select
                    className="form-select"
                    id="raca"
                    name="raca"
                    value={racaCodigo || ""}
                    onChange={({ target: { value } }) => {
                      setRacaCodigo(Number(value));
                    }}
                    required
                  >
                    <option>Selecione</option>
                    {listaRaca?.map((classif, index) => (
                      <option key={index} value={classif.codigo}>
                        {classif.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="genero" className="form-label">
                    Identidade de gênero
                  </label>
                  <select
                    className="form-select"
                    id="genero"
                    name="genero"
                    value={identidadeGeneroCodigo || ""}
                    onChange={({ target: { value } }) => {
                      setIdentidadeGeneroCodigo(Number(value));
                    }}
                  >
                    <option>Selecione</option>
                    {listaIdentidadeGenero?.map((classif, index) => (
                      <option key={index} value={classif.codigo}>
                        {classif.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Filiação</legend>
            <div className="row p-3">
              <div className="col-md-6">
                <label htmlFor="nomePai" className="form-label">
                  Nome do Pai
                </label>
                <input
                  type="text"
                  title="Nome Completo"
                  className="form-control"
                  name="nomePai"
                  id="nomePai"
                  placeholder="Digite o nome do pai"
                  value={nomePai || ""}
                  onChange={({ target: { value } }) => {
                    setNomePai(value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="nomeMae" className="form-label">
                  Nome da Mãe
                </label>
                <input
                  type="text"
                  title="Nome da Mãe"
                  className="form-control"
                  name="nomeMae"
                  id="nomeMae"
                  placeholder="Digite o nome da mãe"
                  value={nomeMae || ""}
                  onChange={({ target: { value } }) => {
                    setNomeMae(value);
                  }}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Documentos</legend>
            <div className="row mt-1 p-3">
              <div className="col-md-3">
                <label htmlFor="rg" className="form-label">
                  RG
                </label>

                <input
                  type="text"
                  title="Digite o numero do RG"
                  className="form-control"
                  name="rg"
                  id="rg"
                  placeholder="00.000.000-0"
                  value={rg || ""}
                  onChange={({ target: { value } }) => {
                    setRg(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="orgaoEmissor" className="form-label">
                  Orgão Emissor
                </label>
                <input
                  type="text"
                  title="Digite o número do orgão Emissor"
                  className="form-control"
                  name="orgaoEmissor"
                  id="orgaoEmissor"
                  placeholder="Digite o orgão emissor do RG"
                  value={orgaoEmissorRg || ""}
                  onChange={({ target: { value } }) => {
                    setOrgaoEmissorRg(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="dataEmissao" className="form-label">
                  Data de Emissão (RG)
                </label>
                <input
                  type="date"
                  title="Digite a data de emissão"
                  className="form-control"
                  name="dataEmissao"
                  id="dataEmissao"
                  value={dataEmissaoRg || ""}
                  onChange={({ target: { value } }) => {
                    setDataEmissaoRg(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="numeroCpf" className="form-label">
                  CPF
                </label>
                <input
                  type="text"
                  title="Digite um CPF no formato: xxx.xxx.xxx-xx"
                  className="form-control"
                  name="numeroCpf"
                  id="numeroCpf"
                  placeholder="000.000.000-00"
                  value={numeroCpf || ""}
                  onChange={({ target: { value } }) => {
                    setNumeroCpf(value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-1 p-3">
              <div className="col-md-3 ">
                <label htmlFor="pisEPasep" className="form-label">
                  Número do PIS/PASEP
                </label>
                <input
                  type="number"
                  title="Digite o número do PIS/PASEP"
                  className="form-control"
                  name="pisEPasep"
                  id="pisEPasep"
                  placeholder="00000000000"
                  value={pisPasep || ""}
                  onChange={({ target: { value } }) => {
                    setPisPasep(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="ctps" className="form-label">
                  Número da CTPS
                </label>
                <input
                  type="text"
                  title="Digite o número da CTPS"
                  className="form-control"
                  name="ctps"
                  id="ctps"
                  placeholder="00000"
                  value={ctps || ""}
                  onChange={({ target: { value } }) => {
                    setCtps(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="cptsUf" className="form-label">
                  CTPS-Uf
                </label>
                <input
                  type="text"
                  title="Digite a sigla do estado da CTPS"
                  className="form-control"
                  name="cptsUf"
                  id="cptsUf"
                  value={ctpsUf || ""}
                  onChange={({ target: { value } }) => {
                    setCtpsUf(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="serie" className="form-label">
                  Série
                </label>
                <input
                  type="text"
                  title="Digite o número da série"
                  className="form-control"
                  name="serie"
                  id="serie"
                  placeholder="0000"
                  value={serieCTPS || ""}
                  onChange={({ target: { value } }) => {
                    setSerieCTPS(value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-1 p-3">
              <div className="col-md-3">
                <label htmlFor="cnh" className="form-label">
                  CNH
                </label>
                <input
                  type="number"
                  title="CNH"
                  className="form-control"
                  name="cnh"
                  id="cnh"
                  placeholder="Somente números ..."
                  value={cnh || ""}
                  onChange={({ target: { value } }) => {
                    setCnh(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="categoriaCNH" className="form-label">
                  Categoria da CNH
                </label>
                <input
                  type="text"
                  title="Digite Categoria da CNH"
                  className="form-control"
                  name="categoriaCNH"
                  id="categoriaCNH"
                  value={categoriaCnh || ""}
                  onChange={({ target: { value } }) => {
                    setCategoriaCnh(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="dataEmissaoCnh" className="form-label">
                  Data de Emissão (CNH)
                </label>
                <input
                  type="date"
                  title="Digite a data de emissão (CNH)"
                  className="form-control"
                  name="dataEmissaoCnh"
                  id="dataEmissaoCnh"
                  value={dataEmissaoCnh || ""}
                  onChange={({ target: { value } }) => {
                    setDataEmissaoCnh(value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="dataValidadeCNH" className="form-label">
                  Data de Validade (CNH)
                </label>
                <input
                  type="date"
                  title="Digite a data de validade (CNH)"
                  className="form-control"
                  name="dataValidadeCNH"
                  id="dataValidadeCNH"
                  value={dataValidadeCnh || ""}
                  onChange={({ target: { value } }) => {
                    setDataValidadeCnh(value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-1 p-3">
              <div className="col-md-4">
                <label htmlFor="tituloEleitor" className="form-label">
                  Número do título de eleitor
                </label>
                <input
                  type="number"
                  title="Digite o número do título de eleitor"
                  className="form-control"
                  name="tituloEleitor"
                  id="tituloEleitor"
                  placeholder="000000000000"
                  value={tituloEleitor || ""}
                  onChange={({ target: { value } }) => {
                    setTituloEleitor(value);
                  }}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="secao" className="form-label">
                  Seção
                </label>
                <input
                  type="number"
                  title="Digite o número da seção"
                  className="form-control"
                  name="secao"
                  id="secao"
                  placeholder="0000"
                  value={secaoTituloEleitor || ""}
                  onChange={({ target: { value } }) => {
                    setSecaoTituloEleitor(Number(value));
                  }}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="zona" className="form-label">
                  Zona
                </label>
                <input
                  type="number"
                  title="Digite o número da zona"
                  className="form-control"
                  name="zona"
                  id="zona"
                  placeholder="000"
                  value={zonaTituloEleitor || ""}
                  onChange={({ target: { value } }) => {
                    setZonaTituloEleitor(Number(value));
                  }}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Contato de emergência</legend>
            <FormContatoEmergencia
              codigoFuncionario={Number(codigoFuncionario)}
            />
          </fieldset>
          <fieldset>
            <legend>Dados Bancários</legend>
            <div className="row p-3">
              <div className="col-md-4">
                <label htmlFor="codigoBanco" className="form-label">
                  Banco
                </label>
                <select
                  className="form-select"
                  id="codigoBanco"
                  name="codigoBanco"
                  value={codigoBanco || ""}
                  onChange={({ target: { value } }) => {
                    setCodigoBanco(Number(value));
                  }}
                >
                  <option>Selecione</option>
                  {bancos?.map((banco, index) => (
                    <option key={index} value={banco.codigo}>
                      {banco.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="agencia" className="form-label">
                  Agência
                </label>
                <div className="row">
                  <div className="col-md-7">
                    <input
                      type="number"
                      title="Agencia"
                      className="form-control"
                      name="agencia"
                      id="agencia"
                      placeholder="Informe a Agência"
                      value={agencia || ""}
                      onChange={({ target: { value } }) => {
                        setAgencia(Number(value));
                      }}
                    />
                  </div>
                  <div className="col-md-1">
                    <span> - </span>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      name="digitoAgencia"
                      id="digitoAgencia"
                      maxLength={2}
                      value={digitoAgencia || ""}
                      onChange={({ target: { value } }) => {
                        setDigitoAgencia(value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="numeroConta" className="form-label">
                  Número da conta
                </label>
                <div className="row">
                  <div className="col-md-7">
                    <input
                      type="number"
                      title="Informe o número da conta"
                      className="form-control"
                      name="numeroConta"
                      id="numeroConta"
                      placeholder="Digite o número da conta"
                      value={numeroConta || ""}
                      onChange={({ target: { value } }) => {
                        setNumeroConta(Number(value));
                      }}
                    />
                  </div>
                  <div className="col-md-1">
                    <span> - </span>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      title=""
                      className="form-control"
                      name="digitoConta"
                      id="digitoConta"
                      maxLength={2}
                      value={digitoConta || ""}
                      onChange={({ target: { value } }) => {
                        setDigitoConta(value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          {edicao && (
            <fieldset>
              <legend>Dados RH</legend>
              <div className="row p-3">
                <div className="col-md-4">
                  <label
                    htmlFor="codigoMotivoDesligamento"
                    className="form-label"
                  >
                    Motivo Desligamento
                  </label>
                  <select
                    className="form-select"
                    id="codigoMotivoDesligamento"
                    name="codigoMotivoDesligamento"
                    value={codigoBanco || ""}
                    onChange={({ target: { value } }) => {
                      setCodigoMotivoDesligamento(Number(value));
                    }}
                  >
                    <option>Selecione</option>
                    {listaMotivoDesligamento?.map((banco, index) => (
                      <option key={index} value={banco.codigo}>
                        {banco.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="dataDesligamento" className="form-label">
                    Data Desligamento
                  </label>
                  <div className="row">
                    <div className="col-md-7">
                      <input
                        type="date"
                        title="Data Desligamento"
                        className="form-control"
                        name="dataDesligamento"
                        id="dataDesligamento"
                        placeholder="Informe a Agência"
                        value={dataDesligamento || ""}
                        onChange={({ target: { value } }) => {
                          setDataDesligamento(value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="ativo" className="form-label">
                    Ativo
                  </label>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-check form-switch form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="ativo"
                          name="ativo"
                          checked={ativo || false}
                          onChange={(event) => {
                            setAtivo(event.target.checked);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          )}
        </form>
        <div className="row mt-4 justify-content-end">
          <div className="col-md-4 mt-4">
            <button
              className="w-100"
              type="button"
              onClick={(event) => handleSaveForm(event)}
            >
              Atualizar Dados
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDadosPessoais;
