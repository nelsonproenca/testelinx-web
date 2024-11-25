import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { FormacaoModel } from "../../../../models/funcionario.formacao.model";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import FuncionarioFormacaoService from "../../../../services/funcionario.formacao.service";

import AddFormacao from "../AddFormacao";
import FormIdioma from "../FormIdioma";
import TableFormacao from "../TabelaFormacao";

import styles from "./styles.module.scss";

type FormFormacaoProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormFormacao = ({ codigoFuncionario, edicao }: FormFormacaoProps) => {
  const [listaFormacao, setListaFormacao] = useState<
    FormacaoModel[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useToken();

  const { adicionarFormacao } = useCadastros();

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respFormacao = await FuncionarioFormacaoService.getAll(
        edicao ? codigoFuncionario! : token.codigoProfissional
      );

      setListaFormacao(respFormacao.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarFormacao({} as FormacaoModel);
  };

  const verificarFormacaoExiste = (
    nomeInstituicao: string,
    nomeCurso: string,
    formacaoSuperior: number
  ) => {
    if (nomeInstituicao?.length === 0 || formacaoSuperior === 0) {
      return false;
    }

    let formacao = listaFormacao?.find(
      (formacao) =>
        formacao.nomeInstituicao?.toLowerCase() ===
          nomeInstituicao?.toLowerCase() &&
        formacao.nomeCurso?.toLowerCase() === nomeCurso?.toLowerCase() &&
        formacao.tipoFormacao! === formacaoSuperior!
    );

    if (formacao) {
      return true;
    }

    return false;
  };

  const onDelete = async (id: number) => {
    try {
      Swal.fire({
        title: "Quer mesmo remover esse registro?",
        text: "Você não será capaz de reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "grey",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, remover",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await FuncionarioFormacaoService.remove(id);
          ToastMessageAlert.fire("", "Seu registro foi excluído.", "success");
        }
        setIsLoading(true);
        loadData();
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (formacaoModel: FormacaoModel) => {
    try {
      await FuncionarioFormacaoService.update(
        formacaoModel.codigo,
        formacaoModel
      );
      setIsLoading(true);
      loadData();
      return true;
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
      return false;
    }
  };

  const onSave = async (formacaoModel: FormacaoModel) => {
    try {
      let existe: boolean = verificarFormacaoExiste(
        formacaoModel.nomeInstituicao!,
        formacaoModel.nomeCurso!,
        formacaoModel.tipoFormacao!
      );

      if (existe) {
        ToastMessageAlert.fire(
          "",
          "Formação já existente, insira um formação que ainda não exista.",
          "warning"
        );
        return false;
      }

      const respFormacao = await FuncionarioFormacaoService.create(
        formacaoModel
      );
      if (respFormacao) {
        if (respFormacao.data?.erros.length > 0) {
          Swal.fire("Erro", `${respFormacao.data?.erros}`, "error");
          return false;
        }
        if (respFormacao.data?.mensagem.length > 0) {
          Swal.fire("Erro", `${respFormacao.data?.mensagem}`, "error");
          return false;
        } else {
          Swal.fire("Inclusão", "Formação cadastrada com sucesso.", "success");

          setIsLoading(true);
          loadData();
        }
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    return true;
  };

  const onEdit = (formacao: FormacaoModel) => {
    adicionarFormacao(formacao);
  };

  return (
    <div className={styles.formFormacaoContainer}>
      <fieldset>
        <legend>Formação</legend>
        <AddFormacao
          onSave={onSave}
          onUpdate={onUpdate}
          codigoFuncionario={codigoFuncionario}
          edicao
        />
        <TableFormacao
          lista={listaFormacao}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </fieldset>
      <fieldset>
        <legend>Idiomas</legend>
        <FormIdioma />
      </fieldset>
    </div>
  );
};

export default FormFormacao;
