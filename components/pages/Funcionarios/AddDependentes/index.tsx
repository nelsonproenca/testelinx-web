import { useEffect, useState } from "react";
import { cpf } from "cpf-cnpj-validator";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";

import useToken from "../../../../hooks/useToken";

import { FuncionarioDependenteModel } from "../../../../models/funcionario.dependente.model";
import {
  Dependentes,
  handleOrdenarListaSeed,
  TipoDependentes,
  ToastMessageAlert,
} from "../../../../seeds/tipo.seed";

import styles from "./styles.module.scss";
import { RegistroModel } from "../../../../models/registro.model";
import moment from "moment";

type AddDependentesProps = {
  onSave: (dependente: FuncionarioDependenteModel) => void;
  onUpdate: (
    dependente: FuncionarioDependenteModel,
    codigoDependente: number
  ) => void;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddDependentes = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddDependentesProps) => {
  const dataAtual: string = moment().format("YYYY-MM-DD");
  const [nome, setNome] = useState<string | undefined>("");
  const [cpfDependente, setCpfDependente] = useState<string | undefined>("");
  const [tipoDependente, setTipoDependente] = useState<number | undefined>(0);
  const [dataNascimento, setDataNascimento] = useState<string | undefined>("");

  const [listaTipoDependente, setListaTipoDependente] = useState<
    RegistroModel[] | undefined
  >();
  const { dependenteItem } = useCadastros();

  const { token } = useToken();

  let dependente = dependenteItem;

  useEffect(() => {
    setNome(dependente?.nome);
    setCpfDependente(dependente?.cpf);
    setListaTipoDependente(handleOrdenarListaSeed(Dependentes));
    setDataNascimento(
      dependente?.dataNascimento !== null
        ? moment(dependente?.dataNascimento).format("YYYY-MM-DD")
        : ""
    );
    setTipoDependente(dependente?.codigoTipoDependente);
  }, [dependente]);

  const handleSaveForm = () => {
    if (!cpf.isValid(cpfDependente!)) {
      ToastMessageAlert.fire("", "CPF inválido. Verifique.", "warning");
      return;
    }

    const dataNascimentoValida: string =
      !dataNascimento || dataNascimento === "Invalid date"
        ? "1900-01-01"
        : dataNascimento;

    let dependenteModel: FuncionarioDependenteModel = {
      codigo: 0,
      codigoFuncionario: edicao
        ? codigoFuncionario
        : Number(token.codigoProfissional),
      nome,
      cpf: cpfDependente,
      dataNascimento: dataNascimentoValida,
      codigoTipoDependente: tipoDependente,
    };

    if (dependente != undefined && dependente?.codigo! > 0) {
      dependenteModel.codigo = dependente?.codigo!;
      onUpdate(dependenteModel, dependente?.codigo!);
    } else {
      onSave(dependenteModel);
    }

    limparTela();
  };

  const limparTela = () => {
    setNome("");
    setCpfDependente("");
    setDataNascimento("");
    setTipoDependente(0);
  };

  return (
    <form id="formDependentes">
      <div className={styles.formContainer}>
        <div className="row">
          <div className="col-md-4 mt-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              title="Nome do dependente"
              className="form-control"
              name="nome"
              id="nome"
              placeholder="Informe o nome do dependente"
              value={nome || ""}
              onChange={({ target: { value } }) => {
                setNome(value);
              }}
              required
            />
          </div>
          <div className="col-md-2 mt-3">
            <label htmlFor="nome" className="form-label">
              Tipo de Dependente
            </label>
            <select
              className="form-select"
              id="tipoDependente"
              name="tipoDependente"
              value={tipoDependente || ""}
              onChange={({ target: { value } }) => {
                setTipoDependente(Number(value));
              }}
              required
            >
              <option>Selecione</option>
              {listaTipoDependente?.map((classif, index) => (
                <option key={index} value={classif.codigo}>
                  {classif.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mt-3">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              type="string"
              title="CPF do dependente"
              className="form-control"
              name="cpf"
              id="cpf"
              placeholder="Informe o CPF"
              value={cpfDependente || ""}
              onChange={({ target: { value } }) => {
                setCpfDependente(value);
              }}
              required
            />
          </div>
          <div className="col-md-3 mt-3">
            <label htmlFor="dataNascimento" className="form-label">
              Data de Nascimento
            </label>
            <label className={styles["input-text"]}></label>
            <input
              type="date"
              placeholder="Digite a data de nascimento"
              className="form-control"
              name="dataNascimento"
              id="dataNascimento"
              value={dataNascimento || ""}
              onChange={({ target: { value } }) => {
                setDataNascimento(value);
              }}
              max={dataAtual}
              required
            />
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <button type="button" onClick={handleSaveForm}>
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDependentes;
