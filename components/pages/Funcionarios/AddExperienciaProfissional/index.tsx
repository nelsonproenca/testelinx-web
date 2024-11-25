import { useEffect, useState } from "react";
import moment from "moment";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";

import { ExperienciaProfissionalModel } from "../../../../models/funcionario.experienciaprofissional.model";

import styles from "./styles.module.scss";

type AddExperienciaProfissionalProps = {
  onSave: (registro: ExperienciaProfissionalModel) => Promise<boolean>;
  onUpdate: (registro: ExperienciaProfissionalModel) => Promise<boolean>;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddExperienciaProfissional = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddExperienciaProfissionalProps) => {
  const [nomeEmpresa, setNomeEmpresa] = useState<string | undefined>("");
  const [cargo, setCargo] = useState<string | undefined>("");
  const [dataAdmissao, setDataAdmissao] = useState<string | undefined>("");
  const [dataRecisao, setDataRecisao] = useState<string | undefined>("");
  const [descricaoAtividades, setDescricaoAtividades] = useState<
    string | undefined
  >("");

  const { token } = useToken();
  const { experienciaProfissionalItem } = useCadastros();

  let experienciaProfissional = experienciaProfissionalItem;

  useEffect(() => {
    setNomeEmpresa(experienciaProfissional?.nomeEmpresa);
    setCargo(experienciaProfissional?.cargo);
    setDataAdmissao(experienciaProfissional?.dataAdmissao);
    setDataRecisao(experienciaProfissional?.dataRecisao);
    setDescricaoAtividades(experienciaProfissional?.descricaoAtividades);
  }, [experienciaProfissional]);

  const handleSaveForm = async () => {
    let experienciaProfissionalNova: ExperienciaProfissionalModel = {
      codigo: 0,
      codigoFuncionario: edicao
        ? codigoFuncionario!
        : Number(token.codigoProfissional),
      nomeEmpresa,
      cargo,
      dataAdmissao,
      dataRecisao,
      descricaoAtividades,
    };

    let result: boolean = false;

    if (
      experienciaProfissional != undefined &&
      experienciaProfissional?.codigo > 0
    ) {
      experienciaProfissionalNova.codigo = experienciaProfissional?.codigo!;

      result = await onUpdate(experienciaProfissionalNova);
    } else {
      result = await onSave(experienciaProfissionalNova);
    }

    if (result) {
      setNomeEmpresa("");
      setCargo("");
      setDataAdmissao("");
      setDataRecisao("");
      setDescricaoAtividades("");
      experienciaProfissional = undefined;
    }
  };

  return (
    <form id="formExperienciaProfissional" onSubmit={handleSaveForm}>
      <div className={styles.formContainer}>
        <div className="mb-3 mt-3">
          <div className="row">
            <div className="col-7">
              <label htmlFor="nomeEmpresa" className="form-label">
                Nome da Empresa
              </label>
              <input
                type="text"
                className="form-control"
                id="nomeEmpresa"
                name="nomeEmpresa"
                value={nomeEmpresa || ""}
                onChange={({ target: { value } }) => {
                  setNomeEmpresa(value);
                }}
                required
              />
            </div>
            <div className="col-5">
              <label htmlFor="cargo" className="form-label">
                Cargo
              </label>
              <input
                type="text"
                className="form-control"
                id="cargo"
                name="cargo"
                value={cargo || ""}
                onChange={({ target: { value } }) => {
                  setCargo(value);
                }}
                required
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <label htmlFor="dataAdmissao" className="form-label">
                Data de Admissão
              </label>
              <input
                type="month"
                className="form-control"
                id="dataAdmissao"
                name="dataAdmissao"
                value={dataAdmissao || ""}
                onChange={({ target: { value } }) => {
                  setDataAdmissao(value);
                  setDataRecisao(value);
                }}
                required
              />
            </div>
            <div className="col-6">
              <label htmlFor="dataRecisao" className="form-label">
                Data da Recisão
              </label>
              <input
                type="month"
                className="form-control"
                id="dataRecisao"
                name="dataRecisao"
                value={dataRecisao || ""}
                onChange={({ target: { value } }) => {
                  setDataRecisao(value);
                }}
                required
              />
              {moment(dataRecisao) < moment(dataAdmissao) && (
                <div className="text-danger mt-2">
                  Data da Recisão deve ser maior que a Data de Admissão.
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <label htmlFor="descricaoAtividades" className="form-label">
                Descrição das Atividades
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="descricaoAtividades"
                name="descricaoAtividades"
                value={descricaoAtividades || ""}
                onChange={({ target: { value } }) => {
                  setDescricaoAtividades(value);
                }}
                required
              ></textarea>
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

export default AddExperienciaProfissional;
