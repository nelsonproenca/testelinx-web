import { FormEvent, useEffect, useState } from "react";
import moment from "moment";
import QuillEditor from "../RichText";
import Swal from "sweetalert2";

import {
  CriticidadeNotificacao,
  NotificacaoCriticidade,
  NotificacaoTipo,
  TipoDocumentoUpload,
  TipoNotificacao,
  ToastMessageAlert,
} from "../../../../seeds/tipo.seed";

import { useCadastros } from "../../../../contexts/CadastrosContextData";

import useToken from "../../../../hooks/useToken";

import { RegistroModel } from "../../../../models/registro.model";
import { NotificacaoModel } from "../../../../models/notificacao.model";
import { FuncionarioModel } from "../../../../models/funcionario.model";
import { NotificacaoArquivoModel } from "../../../../models/notificacao.arquivo.model";

import NotificacaoArquivoService from "../../../../services/notificacao.arquivo.service";
import NotificacaoService from "../../../../services/notificacao.service";

import AddFuncionario from "../../../AddFuncionario";
import UploadFiles from "../../../UploadFiles";

import styles from "./styles.module.scss";

const AddNotificacao = () => {
  const [titulo, setTitulo] = useState<string | undefined>("");
  const [enviarEmail, setEnviarEmail] = useState<boolean | undefined>(false);
  const [codigoFuncionario, setCodigoFuncionario] = useState<
    number | undefined
  >(0);
  const [codigoNotificacao, setCodigoNotificacao] = useState<
    number | undefined
  >(0);
  const [descricao, setDescricao] = useState<string | undefined>("");
  const [nomeFuncionario, setNomeFuncionario] = useState<string | undefined>(
    ""
  );
  const [tipoSelecionado, setTipoSelecionado] = useState<number>(0);
  const [criticidadeSelecionada, setCriticidadeSelecionada] =
    useState<number>(0);

  const [arquivoSelecionado, setArquivoSelecionado] = useState<FormData>();

  const [criticidades, setCriticidades] = useState<RegistroModel[] | undefined>(
    NotificacaoCriticidade
  );
  const [listaTiposNotificacao, setListaTiposNotificacao] = useState<
    RegistroModel[] | undefined
  >(NotificacaoTipo);

  const { notificacaoItem, adicionarNotificacao } = useCadastros();

  const notificacao = notificacaoItem;

  useEffect(() => {
    limparTela();
    try {
      if (notificacao?.tipo) {
        setTipoSelecionado(notificacao?.tipo!);
      }
      if (notificacao?.codigo) {
        setCodigoNotificacao(notificacao.codigo!);
        setCodigoFuncionario(notificacao.codigoFuncionario!);
        setTitulo(notificacao?.titulo!);
        setDescricao(notificacao?.descricao!);
        setTipoSelecionado(notificacao?.tipo!);
        setCriticidadeSelecionada(notificacao?.criticidade!);
        setEnviarEmail(notificacao?.enviarEmail!);
        setNomeFuncionario(notificacao?.nomeFuncionario!);
      }
    } catch (error) {
      Swal.fire("", `${error}`, "error");
    }
  }, [notificacao?.codigo]);

  const limparTela = () => {
    setTitulo("");
    setDescricao("");
    setTipoSelecionado(0);
    setCriticidadeSelecionada(0);
    setEnviarEmail(false);
    setArquivoSelecionado(undefined);
  };

  const validar = () => {
    if (titulo?.length === 0) {
      return "Título não foi preenchido.";
    }

    if (
      tipoSelecionado == TipoNotificacao.Individual &&
      codigoFuncionario == 0
    ) {
      return "Funcionário não foi selecionado.";
    }

    if (descricao?.length === 0) {
      return "Mensagem deve ser preenchida.";
    }

    return "";
  };

  const uploadArquivo = async (codigoNotificacao: number) => {
    try {
      const respUpload = await NotificacaoArquivoService.upload(
        arquivoSelecionado!,
        codigoNotificacao
      );

      if (respUpload) {
        const arquivoUploaded: NotificacaoArquivoModel = respUpload.data;

        if (arquivoUploaded) {
          return "Arquivo gravado com sucesso.";
        }
      }
    } catch (error) {
      let mensagem: string = `${error}`;

      if (mensagem.indexOf("Network Error") > 0) {
        mensagem = "Verifique o tamanho do arquivo.";
      } else {
        mensagem = `${error}`;
      }

      return mensagem;
    }

    return "";
  };

  const onSave = async (notificacoes: NotificacaoModel) => {
    let codigoNotificacao: number = 0;
    let codigoFuncionario: number = 0;

    try {
      const respNotificacao = await NotificacaoService.create(notificacoes);

      if (respNotificacao) {
        if (respNotificacao.data.erros) {
          Swal.fire(
            "Erro",
            `Erro ao salvar uma notificação. Mensagem: ${respNotificacao.data.erros}.`,
            "error"
          );
          return;
        }

        codigoNotificacao = respNotificacao.data?.item?.codigo;

        let retorno = await uploadArquivo(codigoNotificacao!);

        if (retorno.length > 0) {
          Swal.fire("Upload anexo", `${retorno}`, "error");
        }

        ToastMessageAlert.fire(
          "",
          "Notificação criada com sucesso!",
          "success"
        );

        adicionarNotificacao({} as NotificacaoModel);
        limparTela();
      }
    } catch (error) {
      Swal.fire("Erro", `${error}.`, "error");
    }
  };

  const handleSaveForm = async (event: FormEvent) => {
    event.preventDefault();

    const formValido = validar();

    if (formValido.length > 0) {
      Swal.fire("Alerta !", `${formValido}`, "warning");
      return;
    }

    let notificacaoModel: NotificacaoModel = {
      codigo: 0,
    };

    notificacaoModel.codigoFuncionario = codigoFuncionario!;
    notificacaoModel.descricao = descricao;
    notificacaoModel.titulo = titulo!;
    notificacaoModel.tipo = tipoSelecionado;
    notificacaoModel.criticidade = criticidadeSelecionada;
    notificacaoModel.data = moment().format();
    notificacaoModel.enviarEmail = enviarEmail;
    notificacaoModel.existeAnexo = arquivoSelecionado !== undefined;

    onSave(notificacaoModel);
  };

  const handleTipoNotificacaoChange = (novaNotificacao: number) => {
    setTipoSelecionado(novaNotificacao);

    let tempNotificacao: NotificacaoModel = Object.assign({}, notificacao, {
      tipo: Number(novaNotificacao),
      codigo: notificacao?.codigo,
    });

    adicionarNotificacao(tempNotificacao);
  };

  const handleCriticidadeChange = (novaNotificacao: number) => {
    setCriticidadeSelecionada(novaNotificacao);

    let tempNotificacao: NotificacaoModel = Object.assign({}, notificacao, {
      criticidade: Number(novaNotificacao),
      codigo: notificacao?.codigo,
    });

    adicionarNotificacao(tempNotificacao);
  };

  const handleGetDescricao = (texto: string) => {
    setDescricao(texto);

    let tempNotificacao: NotificacaoModel = Object.assign({}, notificacao, {
      descricao: texto,
    });

    adicionarNotificacao(tempNotificacao);
  };

  const handleGetTitulo = (texto: string) => {
    setTitulo(texto);
    let tempNotificacao: NotificacaoModel = Object.assign({}, notificacao, {
      titulo: texto,
    });

    adicionarNotificacao(tempNotificacao);
  };

  const handleFuncionarioCodigo = (
    funcionarioSelecionado: FuncionarioModel
  ) => {
    setCodigoFuncionario(funcionarioSelecionado.codigo!);
  };

  const handleUploadNovoClick = (formData: FormData) =>
    setArquivoSelecionado(formData);

  const handleCancelarClick = () => {
    setArquivoSelecionado(undefined);
    setTipoSelecionado(0);
  };
  return (
    <>
      <div className={styles.adicionarContainer}>
        <form id="formNotificacao" onSubmit={handleSaveForm}>
          <div className="row">
            <div className="col-md-3 mt-3">
              <label htmlFor="tipoNotificacao" className="form-label">
                Tipo Notificação
              </label>
              <select
                className="form-select"
                id="tipoNotificacao"
                name="tipoNotificacao"
                value={tipoSelecionado || ""}
                onChange={({ target: { value } }) => {
                  handleTipoNotificacaoChange(Number(value));
                }}
                disabled={codigoNotificacao! != 0}
              >
                <option key={0}>Selecione</option>
                {listaTiposNotificacao?.map((tipo, index) => (
                  <option key={index} value={tipo.codigo}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
            {tipoSelecionado === TipoNotificacao.Individual && (
              <>
                <div className="col-md-3 mt-3">
                  <label htmlFor="criticidade" className="form-label">
                    Criticidade
                  </label>
                  <select
                    className="form-select"
                    id="criticidade"
                    name="criticidade"
                    value={criticidadeSelecionada || ""}
                    onChange={({ target: { value } }) => {
                      handleCriticidadeChange(Number(value));
                    }}
                    disabled={codigoNotificacao! != 0}
                  >
                    <option key={0}>Selecione</option>
                    {criticidades?.map((tipo, index) => (
                      <option key={index} value={tipo.codigo}>
                        {tipo.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mt-3">
                  {notificacao?.codigo! > 0 ? (
                    <>
                      <div className="row">
                        <label className="form-label ps-0">Funcionário</label>
                      </div>
                      <div className="row">
                        <label
                          className={styles["input-text"]}
                          aria-disabled={true}
                        >
                          {nomeFuncionario}
                        </label>
                      </div>
                    </>
                  ) : (
                    <AddFuncionario
                      onSave={handleFuncionarioCodigo}
                      titulo="Funcionário"
                      mostrarSocios={true}
                      mostrarUsuario={true}
                    />
                  )}
                </div>
              </>
            )}
            {tipoSelecionado! &&
            criticidadeSelecionada != CriticidadeNotificacao.Alta ? (
              <div className="col-md-2 mt-5 mx-5">
                <div className="form-check form-switch form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enviarEmail"
                    name="enviarEmail"
                    checked={enviarEmail || false}
                    onChange={(event) => {
                      setEnviarEmail(event.target.checked);
                    }}
                  />
                  <label
                    htmlFor="enviarEmail"
                    className="form-check-label user-select-none"
                  >
                    Enviar Email
                  </label>
                </div>
              </div>
            ) : null}
          </div>
          {tipoSelecionado! ? (
            <>
              <div className="row">
                <div className="col-md-6 mt-3 mx-3">
                  <UploadFiles
                    containerName=""
                    onUploadFile={handleUploadNovoClick}
                    titulo="Anexo"
                    tipoDocumento={`${TipoDocumentoUpload.AnexoNotificacao}`}
                    descricaoTipo="anexo-notificacao"
                  />
                </div>
                <div className="col-md-4 mt-5 pt-4">
                  {arquivoSelecionado && (
                    <button
                      className="w-75 bg-danger text-white"
                      onClick={() => setArquivoSelecionado(undefined)}
                    >
                      Remover arquivo anexado.
                    </button>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label htmlFor="titulo" className="form-label">
                    Titulo(*)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={titulo || ""}
                    onChange={({ target: { value } }) => {
                      handleGetTitulo(value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-4 h-25">
                  <label htmlFor="titulo" className="form-label">
                    Mensagem(*)
                  </label>
                  <QuillEditor
                    value={descricao!}
                    getValue={handleGetDescricao}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-5 ">
                  <button type="submit">Salvar</button>
                </div>
                <div className="col-md-3 mt-5 mb-5">
                  <button
                    className="btn btn-secondary fs-5"
                    type="button"
                    onClick={handleCancelarClick}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p style={{ fontSize: "11px", margin: "0.5rem" }}>
              Selecione um Tipo para prosseguir
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default AddNotificacao;
