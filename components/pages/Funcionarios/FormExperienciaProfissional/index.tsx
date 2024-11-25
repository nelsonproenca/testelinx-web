import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import FuncionarioExperienciaProfissionalService from "../../../../services/funcionario.experiencia.profissional.service";

import { ExperienciaProfissionalModel } from "../../../../models/funcionario.experienciaprofissional.model";

import AddExperienciaProfissional from "../AddExperienciaProfissional";
import TableExperienciaProfissional from "../TableExperienciaProfissional";

import styles from "./styles.module.scss";

type FormFormacaoProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormExperienciaProfissional = ({
  codigoFuncionario,
  edicao,
}: FormFormacaoProps) => {
  const [listaExperiencias, setListaExperiencias] = useState<
    ExperienciaProfissionalModel[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useToken();

  const { adicionarExperienciaProfissional } = useCadastros();

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respExperiencia =
        await FuncionarioExperienciaProfissionalService.getAll(
          edicao ? codigoFuncionario! : Number(token.codigoProfissional)
        );

      let experienciasProfissionais: ExperienciaProfissionalModel[] =
        respExperiencia.data;

      setListaExperiencias(experienciasProfissionais);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarExperienciaProfissional({} as ExperienciaProfissionalModel);
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
        confirmButtonText: "Sim",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await FuncionarioExperienciaProfissionalService.remove(id);
          ToastMessageAlert.fire("", "Seu registro foi excluído.", "success");
          setIsLoading(true);
        }
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (experienciaModel: ExperienciaProfissionalModel) => {
    try {
      const respExperiencia =
        await FuncionarioExperienciaProfissionalService.update(
          experienciaModel,
          experienciaModel.codigo
        );
      if (respExperiencia) {
        Swal.fire(
          "Alteração",
          "Experiência Profissional alterada com sucesso.",
          "success"
        );
        setIsLoading(true);
        return true;
      }
      return false;
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
      return false;
    }
  };

  const onSave = async (experienciaModel: ExperienciaProfissionalModel) => {
    try {
      const respExperiencia =
        await FuncionarioExperienciaProfissionalService.create(
          experienciaModel
        );

      if (respExperiencia) {
        if (respExperiencia.data?.erros.length > 0) {
          Swal.fire("Erro", `${respExperiencia.data?.erros}`, "error");
          return false;
        }
        if (respExperiencia.data?.mensagem.length > 0) {
          Swal.fire("Erro", `${respExperiencia.data?.mensagem}`, "error");
          return false;
        } else {
          Swal.fire(
            "Inclusão",
            "Experiência Profissional cadastrada com sucesso.",
            "success"
          );

          setIsLoading(true);
        }
      }
      return true;
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
      return false;
    }
  };

  const onEdit = async (experienciaModel: ExperienciaProfissionalModel) => {
    adicionarExperienciaProfissional(experienciaModel);
  };

  return (
    <div className={styles.formContainer}>
      <fieldset>
        <legend>Experiência Profissional</legend>
        <AddExperienciaProfissional
          onSave={onSave}
          onUpdate={onUpdate}
          codigoFuncionario={codigoFuncionario}
          edicao
        />
        <TableExperienciaProfissional
          lista={listaExperiencias!}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </fieldset>
    </div>
  );
};

export default FormExperienciaProfissional;
