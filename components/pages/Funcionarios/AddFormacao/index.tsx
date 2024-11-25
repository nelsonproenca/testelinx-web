import moment from "moment";
import { useEffect, useState } from "react";
import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { FormacaoModel } from "../../../../models/funcionario.formacao.model";
import { Formacoes, StatusCurso } from "../../../../seeds/tipo.seed";

import styles from "./styles.module.scss";
import Swal from "sweetalert2";

type AddFormacaoProps = {
  onSave: (formacao: FormacaoModel) => Promise<boolean>;
  onUpdate: (formacao: FormacaoModel) => Promise<boolean>;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddFormacao = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddFormacaoProps) => {
  const [statusCursoTipos, setStatusCursoTipos] = useState(StatusCurso);
  const [formacaoTipos, setFormacaoTipos] = useState(Formacoes);
  const [nomeInstituicao, setNomeInstituicao] = useState<string | undefined>(
    ""
  );
  const [dataInicio, setDataInicio] = useState<string | undefined>("");
  const [dataTermino, setDataTermino] = useState<string | undefined>("");
  const [tipoFormacao, setTipoFormacao] = useState<number | undefined>(0);
  const [statusCurso, setStatusCurso] = useState<number | undefined>(0);
  const [nomeCurso, setNomeCurso] = useState<string | undefined>("");
  const [semestre, setSemestre] = useState<string | undefined>("");
  const [orgaoClasse, setOrgaoClasse] = useState<string | undefined>("");
  const [numeroRegistroOrgao, setNumeroRegistroOrgao] = useState<
    string | undefined
  >("");
  const [especializacaoAdicional, setEspecializacaoAdicional] = useState<
    string | undefined
  >("");

  const { token } = useToken();

  const { formacaoItem } = useCadastros();

  let formacao = formacaoItem;

  useEffect(() => {
    setDataInicio("01-0001");
    setDataTermino("01-0001");
  }, []);

  useEffect(() => {
    setStatusCursoTipos(StatusCurso);
    handleGetListaFormacoes();
    setNomeInstituicao(formacao?.nomeInstituicao);
    setDataInicio(formacao?.inicio);
    setDataTermino(formacao?.termino);
    setTipoFormacao(formacao?.tipoFormacao);
    setStatusCurso(formacao?.statusCursando);
    setSemestre(formacao?.semestre);
    setOrgaoClasse(formacao?.orgaoClasse);
    setNumeroRegistroOrgao(formacao?.numeroRegistroOrgao);
    setEspecializacaoAdicional(formacao?.especializacaoAdicional);
    setNomeCurso(formacao?.nomeCurso);
  }, [formacao]);

  const handleGetListaFormacoes = () => {
    let listaFormacoes = Formacoes.sort((a, b) => {
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

    setFormacaoTipos(listaFormacoes);
  };

  const limparTela = () => {
    setNomeInstituicao("");
    setDataInicio("");
    setDataTermino("");
    setTipoFormacao(0);
    setStatusCurso(0);
    setSemestre("");
    setOrgaoClasse("");
    setNumeroRegistroOrgao("");
    setEspecializacaoAdicional("");
    setNomeCurso("");
  };

  const validar = () => {
    if (!nomeInstituicao) {
      return "Nome da Instituição não pode ser vazio.";
    }

    if (!tipoFormacao) {
      return "Formação precisa ter um valor selecionado.";
    }

    if (!nomeCurso) {
      return "Nome do Curso não pode ser vazio.";
    }

    if (!dataInicio) {
      return "Início não pode ser vazio.";
    }

    if (!dataTermino) {
      return "Término não pode ser vazio.";
    }

    return "";
  };

  const handleSaveForm = async () => {
    let valido: string = validar();

    if (valido.length > 0) {
      Swal.fire("Validação", `${valido}`, "info");
      return;
    }

    let formacaoNova: FormacaoModel = {
      codigo: 0,
      codigoFuncionario: edicao
        ? codigoFuncionario!
        : Number(token.codigoProfissional),
      nomeInstituicao,
      statusCursando: Number(statusCurso),
      tipoFormacao,
      semestre: semestre ?? "",
      orgaoClasse: orgaoClasse ?? "",
      numeroRegistroOrgao: numeroRegistroOrgao ?? "",
      especializacaoAdicional: especializacaoAdicional ?? "",
      nomeCurso: nomeCurso ?? "",
      inicio: dataInicio ?? "",
      termino: dataTermino ?? "",
    };

    let result: boolean = false;

    if (formacao != undefined && formacao?.codigo > 0) {
      formacaoNova.codigo = formacao?.codigo;
      result = await onUpdate(formacaoNova);
    } else {
      result = await onSave(formacaoNova);
    }

    if (result) {
      limparTela();
      formacao = undefined;
    }
  };

  return (
    <form id="formRegistro">
      <div className={styles.formContainer}>
        <div className="mb-3 mt-3">
          <div className="row">
            <div className="col-4">
              <label htmlFor="nomeInstituicao" className="form-label">
                Nome da Instituição
              </label>
              <input
                type="text"
                className="form-control"
                id="nomeInstituicao"
                name="nomeInstituicao"
                value={nomeInstituicao || ""}
                onChange={({ target: { value } }) => {
                  setNomeInstituicao(value);
                }}
                required
              />
            </div>
            <div className="col-4">
              <label htmlFor="dataInicio" className="form-label">
                Início
              </label>
              <input
                type="month"
                title="Data de Início"
                className="form-control"
                name="dataInicio"
                value={dataInicio || ""}
                id="dataInicio"
                onChange={({ target: { value } }) => {
                  setDataInicio(value);
                  setDataTermino(value);
                }}
                required
              />
            </div>
            <div className="col-4">
              <label htmlFor="dataTermino" className="form-label">
                Término
              </label>
              <input
                type="month"
                title="Data de Término"
                className="form-control"
                name="dataTermino"
                value={dataTermino || ""}
                id="dataTermino"
                onChange={({ target: { value } }) => {
                  setDataTermino(value);
                }}
                required
              />
              {moment(dataTermino) < moment(dataInicio) && (
                <div className="text-danger mt-2">
                  Data de Término deve ser maior que a início.
                </div>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <label htmlFor="tipoFormacao" className="form-label">
                Formação
              </label>
              <select
                className="form-select"
                id="tipoFormacao"
                name="tipoFormacao"
                value={tipoFormacao || ""}
                onChange={({ target: { value } }) => {
                  setTipoFormacao(Number(value));
                }}
                required
              >
                <option value="0">Selecione</option>
                {formacaoTipos.map((tipo, index) => (
                  <option key={index} value={tipo.codigo}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="statusCurso" className="form-label">
                Status do Curso
              </label>
              <select
                title="Status do curso"
                className="form-select"
                name="statusCurso"
                value={statusCurso || ""}
                id="statusCurso"
                onChange={({ target: { value } }) => {
                  setStatusCurso(Number(value));
                }}
                required
              >
                <option value="0">Selecione</option>
                {statusCursoTipos.map((tipo, index) => (
                  <option key={index} value={tipo.codigo}>
                    {tipo.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="nomeCurso" className="form-label">
                Curso
              </label>
              <input
                type="text"
                className="form-control"
                id="nomeCurso"
                name="nomeCurso"
                value={nomeCurso || ""}
                onChange={({ target: { value } }) => {
                  setNomeCurso(value);
                }}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <label htmlFor="semestre" className="form-label">
                Semestre
              </label>
              <input
                type="text"
                className="form-control"
                id="semestre"
                name="semestre"
                value={semestre || ""}
                onChange={({ target: { value } }) => {
                  setSemestre(value);
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="orgaoClasse" className="form-label">
                Orgão da Classe
              </label>
              <input
                type="text"
                className="form-control"
                id="orgaoClasse"
                name="orgaoClasse"
                value={orgaoClasse || ""}
                onChange={({ target: { value } }) => {
                  setOrgaoClasse(value);
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="numeroRegistroOrgao" className="form-label">
                Número de Registro do Orgão
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroRegistroOrgao"
                name="numeroRegistroOrgao"
                value={numeroRegistroOrgao || ""}
                onChange={({ target: { value } }) => {
                  setNumeroRegistroOrgao(value);
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="especializacaoAdicional" className="form-label">
                Especialização Adicional
              </label>
              <input
                type="text"
                className="form-control"
                id="especializacaoAdicional"
                name="especializacaoAdicional"
                value={especializacaoAdicional || ""}
                onChange={({ target: { value } }) => {
                  setEspecializacaoAdicional(value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-sm-9"></div>
        <div className="col-sm-3">
          <button type="button" onClick={handleSaveForm}>
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddFormacao;
