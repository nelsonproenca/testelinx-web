import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";

import { FuncionarioEnderecoModel } from "../../../../models/funcionario.endereco.model";
import { RegistroModel } from "../../../../models/registro.model";

import MunicipioService from "../../../../services/municipio.service";

import styles from "./styles.module.scss";

type AddEnderecoProps = {
  onSave: (registro: FuncionarioEnderecoModel) => void;
  onUpdate: (registro: FuncionarioEnderecoModel) => void;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddEndereco = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddEnderecoProps) => {
  const [codigoUf, setCodigoUf] = useState<number>();
  const [codigoMunicipio, setCodigoMunicipio] = useState<number>();
  const [logradouro, setLogradouro] = useState<string | undefined>("");
  const [numero, setNumero] = useState<string | undefined>("");
  const [cep, setCep] = useState<string | undefined>("");
  const [bairro, setBairro] = useState<string | undefined>("");
  const [complemento, setComplemento] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const [ufs, setUfs] = useState<RegistroModel[] | undefined>();
  const [municipios, setMunicipios] = useState<RegistroModel[] | undefined>();

  const { token } = useToken();
  const { enderecoItem } = useCadastros();

  let endereco = enderecoItem;

  useEffect(() => {
    if (endereco?.codigo! > 0) {
      setCodigoUf(endereco?.codigoUf);
      handleUfsChange(endereco?.codigoUf!);
      setCodigoMunicipio(endereco?.codigoMunicipio!);
      setLogradouro(endereco?.logradouro);
      setNumero(endereco?.numero);
      setCep(endereco?.cep);
      setBairro(endereco?.bairro);
      setComplemento(endereco?.complemento);
    }
  }, [endereco]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respUfs = await MunicipioService.getUfs();

      setUfs(respUfs.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleUfsChange = async (codigoEstado: number) => {
    setCodigoUf(codigoEstado);

    if (codigoEstado !== undefined && codigoEstado > 0) {
      const respMunicipios = await MunicipioService.getByUf(codigoEstado);

      setMunicipios(respMunicipios.data);
    }
  };

  const handleSaveForm = (event: FormEvent) => {
    event.preventDefault();
    let enderecoNovo: FuncionarioEnderecoModel = {
      codigo: 0,
      codigoFuncionario: edicao!
        ? codigoFuncionario!
        : Number(token.codigoProfissional),
      codigoUf: codigoUf!,
      codigoMunicipio: codigoMunicipio!,
      logradouro,
      numero,
      cep,
      bairro,
      complemento,
    };

    if (endereco != undefined && endereco?.codigo > 0) {
      enderecoNovo.codigo = endereco?.codigo;
      onUpdate(enderecoNovo);
    } else {
      onSave(enderecoNovo);
    }

    setCodigoUf(0);
    setCodigoMunicipio(0);
    setLogradouro("");
    setNumero("");
    setCep("");
    setBairro("");
    setComplemento("");
    endereco = undefined;
  };

  return (
    <>
      <form id="formFuncionarioEndereco">
        <div className={styles.formContainer}>
          <div className="mb-2 mt-2">
            <div className="row">
              <div className="col-9">
                <label htmlFor="logradouro" className="form-label">
                  Logradouro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="logradouro"
                  value={logradouro || ""}
                  name="logradouro"
                  onChange={({ target: { value } }) => {
                    setLogradouro(value);
                  }}
                  required
                />
              </div>
              <div className="col-3">
                <label htmlFor="numero" className="form-label">
                  Número
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="numero"
                  name="numero"
                  value={numero || ""}
                  onChange={({ target: { value } }) => {
                    setNumero(value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <label htmlFor="codigoUf" className="form-label">
                  Estado
                </label>
                <select
                  className="form-select"
                  id="codigoUf"
                  name="codigoUf"
                  value={codigoUf || ""}
                  onChange={(event) =>
                    handleUfsChange(Number(event.target.value))
                  }
                >
                  <option>Selecione</option>
                  {ufs?.map((uf, index) => (
                    <option key={index} value={uf.codigo}>
                      {uf.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="codigoMunicipio" className="form-label">
                  Cidade
                </label>
                <select
                  className="form-select"
                  id="codigoMunicipio"
                  name="codigoMunicipio"
                  value={codigoMunicipio || ""}
                  onChange={({ target: { value } }) => {
                    setCodigoMunicipio(Number(value));
                  }}
                >
                  <option>Selecione</option>
                  {municipios?.map((municipio, index) => (
                    <option key={index} value={municipio.codigo}>
                      {municipio.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="cep" className="form-label">
                  Cep
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cep"
                  name="cep"
                  value={cep || ""}
                  onChange={({ target: { value } }) => {
                    setCep(value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <label htmlFor="bairro" className="form-label">
                  Bairro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bairro"
                  name="bairro"
                  value={bairro || ""}
                  onChange={({ target: { value } }) => {
                    setBairro(value);
                  }}
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="complemento" className="form-label">
                  Complemento
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="complemento"
                  name="complemento"
                  value={complemento || ""}
                  onChange={({ target: { value } }) => {
                    setComplemento(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="row p-4">
        <div className="col-sm-9"></div>
        <div className="col-sm-3 text-end">
          <button type="submit" onClick={handleSaveForm}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEndereco;
