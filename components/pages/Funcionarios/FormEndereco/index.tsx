import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";

import { FuncionarioEnderecoModel } from "../../../../models/funcionario.endereco.model";

import FuncionarioEnderecoService from "../../../../services/funcionario.endereco.service";

import AddEndereco from "../AddEndereco";
import FormDependentes from "../FormDependentes";

import styles from "./styles.module.scss";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

type FormEnderecoProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormEndereco = ({ codigoFuncionario, edicao }: FormEnderecoProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const { adicionarEndereco, enderecoItem } = useCadastros();

  const endereco = enderecoItem;

  const { token } = useToken();

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respEndereco = await FuncionarioEnderecoService.getAll(
        edicao ? codigoFuncionario! : Number(token.codigoProfissional)
      );

      if (respEndereco?.data?.codigo! > 0) {
        let tempEndereco: FuncionarioEnderecoModel = Object.assign(
          {},
          endereco,
          respEndereco.data
        );

        adicionarEndereco(tempEndereco);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (
    funcionarioEnderecoModel: FuncionarioEnderecoModel
  ) => {
    try {
      let enderecoModel: FuncionarioEnderecoModel = {
        codigo: Number(funcionarioEnderecoModel.codigo),
        codigoFuncionario: Number(funcionarioEnderecoModel.codigoFuncionario),
        codigoUf: Number(funcionarioEnderecoModel.codigoUf),
        codigoMunicipio: Number(funcionarioEnderecoModel.codigoMunicipio),
        logradouro: funcionarioEnderecoModel.logradouro ?? "",
        numero: funcionarioEnderecoModel.numero ?? "",
        cep: funcionarioEnderecoModel.cep ?? "",
        bairro: funcionarioEnderecoModel.bairro ?? "",
        complemento: funcionarioEnderecoModel.complemento ?? "",
      };

      const respEndereco = await FuncionarioEnderecoService.update(
        enderecoModel
      );

      if (respEndereco.data) {
        ToastMessageAlert.fire(
          "",
          "Endereço atualizado com sucesso.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    setIsLoading(true);
  };

  const onSave = async (endereco: FuncionarioEnderecoModel) => {
    try {
      const respEndereco = await FuncionarioEnderecoService.create(endereco);

      if (respEndereco.data) {
        ToastMessageAlert.fire(
          "",
          "Endereço atualizado com sucesso.",
          "success"
        );
      }
      setIsLoading(true);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  return (
    <div className={styles.formEnderecoContainer}>
      <fieldset>
        <legend>Endereço</legend>
        <AddEndereco
          onSave={onSave}
          onUpdate={onUpdate}
          codigoFuncionario={codigoFuncionario}
          edicao
        />
      </fieldset>
      <fieldset>
        <legend>Dependentes</legend>
        <FormDependentes />
      </fieldset>
    </div>
  );
};

export default FormEndereco;
