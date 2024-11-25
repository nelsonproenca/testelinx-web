import { useEffect, useState } from "react";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { FuncionarioIdiomaModel } from "../../../../models/funcionario.idioma.model";
import { Idiomas, NiveisIdiomas } from "../../../../seeds/tipo.seed";

import styles from "./styles.module.scss";

type AddIdiomaProps = {
  onSave: (idioma: FuncionarioIdiomaModel) => void;
  onUpdate: (idioma: FuncionarioIdiomaModel) => void;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddIdioma = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddIdiomaProps) => {
  const [idiomaTipos, setIdiomaTipos] = useState(Idiomas);
  const [nivelTipos, setNivelTipos] = useState(NiveisIdiomas);
  const [tipoIdioma, setTipoIdioma] = useState<number | undefined>();
  const [nivelIdioma, setNivelIdioma] = useState<number | undefined>();

  const { idiomaItem } = useCadastros();

  const { token } = useToken();

  let idioma = idiomaItem;

  useEffect(() => {
    setIdiomaTipos(Idiomas);
    setNivelTipos(NiveisIdiomas);
    setTipoIdioma(idioma?.tipoIdioma);
    setNivelIdioma(idioma?.nivel);
  }, [idioma]);

  const handleSaveForm = () => {
    let idiomaNovo: FuncionarioIdiomaModel = {
      codigo: 0,
      codigoFuncionario: edicao
        ? codigoFuncionario!
        : Number(token.codigoProfissional),
      tipoIdioma,
      nivel: nivelIdioma,
    };

    if (idioma != undefined && idioma?.codigo > 0) {
      idiomaNovo.codigo = idioma?.codigo;
      onUpdate(idiomaNovo);
    } else {
      onSave(idiomaNovo);
    }

    setTipoIdioma(0);
    setNivelIdioma(0);

    idioma = undefined;
  };

  return (
    <form id="formRegistro">
      <div className={styles.formContainer}>
        <div className="row">
          <div className="col-6">
            <label htmlFor="tipoIdioma" className="form-label">
              Idioma
            </label>
            <select
              className="form-select"
              id="tipoIdioma"
              name="tipoIdioma"
              value={tipoIdioma || ""}
              onChange={({ target: { value } }) => {
                setTipoIdioma(Number(value));
              }}
              required
            >
              <option value="0">Selecione</option>
              {idiomaTipos.map((tipo, index) => (
                <option key={index} value={tipo.codigo}>
                  {tipo.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="nivelIdioma" className="form-label">
              Nível
            </label>
            <select
              className="form-select"
              id="nivelIdioma"
              name="nivelIdioma"
              value={nivelIdioma || ""}
              onChange={({ target: { value } }) => {
                setNivelIdioma(Number(value));
              }}
              required
            >
              <option value="0">Selecione</option>
              {nivelTipos.map((tipo, index) => (
                <option key={index} value={tipo.codigo}>
                  {tipo.nome}
                </option>
              ))}
            </select>
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

export default AddIdioma;
