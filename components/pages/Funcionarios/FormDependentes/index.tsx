import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { cpf } from "cpf-cnpj-validator";

import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import FuncionarioDependenteService from "../../../../services/funcionario.dependente.service";

import { FuncionarioDependenteModel } from "../../../../models/funcionario.dependente.model";

import TableDependentes from "../TableDependentes";
import AddDependentes from "../AddDependentes";

type FormDependentesProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormDependentes = ({
  codigoFuncionario,
  edicao,
}: FormDependentesProps) => {
  const [listaDependentes, setListaDependentes] = useState<
    FuncionarioDependenteModel[] | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useToken();

  const { adicionarDependente } = useCadastros();

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respDependentes = await FuncionarioDependenteService.getAll(
        edicao ? codigoFuncionario! : token.codigoProfissional
      );

      let dependentes: FuncionarioDependenteModel[] = respDependentes.data;

      setListaDependentes(dependentes);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarDependente({} as FuncionarioDependenteModel);
    setIsLoading(false);
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
          await FuncionarioDependenteService.remove(id);
          ToastMessageAlert.fire("", "Seu registro foi excluído.", "success");
          setIsLoading(true);
          loadData();
        }
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (dependenteModel: FuncionarioDependenteModel) => {
    try {
      if (!cpf.isValid(dependenteModel.cpf!)) {
        Swal.fire("Validação", "CPF Inválido. Verifique.", "warning");
        return;
      }

      await FuncionarioDependenteService.update(dependenteModel);
      setIsLoading(true);
      loadData();
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarDependente({} as FuncionarioDependenteModel);
  };

  const onSave = async (dependenteModel: FuncionarioDependenteModel) => {
    try {
      const valido: string = validaCampos(dependenteModel);

      if (valido.length > 0) {
        Swal.fire("Validação", valido, "warning");
        return;
      }
      const respDependente = await FuncionarioDependenteService.create(
        dependenteModel
      );

      if (respDependente) {
        Swal.fire("Cadastro", `Dependente cadastrado com sucesso.`, "success");
        setIsLoading(true);
        loadData();
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarDependente({} as FuncionarioDependenteModel);
  };

  const validaCampos = (dependenteModel: FuncionarioDependenteModel) => {
    if (
      !dependenteModel.nome ||
      dependenteModel.nome.length <= 8 ||
      dependenteModel.nome.split(" ").length < 2
    ) {
      return "Por favor, insira o nome completo do dependente. Verifique.";
    }

    if (!cpf.isValid(dependenteModel.cpf!)) {
      return "CPF inválido. Verifique.";
    }

    let dependente = listaDependentes?.find(
      (dependente) =>
        dependente.cpf?.toLowerCase() === dependenteModel.cpf?.toLowerCase()
    );

    if (dependente) {
      return "Dependente já existente, insira um dependente que ainda está listado.";
    }

    if (!dependenteModel.dataNascimento) {
      return "Data de nascimento não está preenchida. Verifique.";
    }

    if (!dependenteModel.codigoTipoDependente) {
      return "O tipo de dependente não está preenchido. Verifique.";
    }

    return "";
  };

  const onEdit = async (dependente: FuncionarioDependenteModel) => {
    let respDependente = await FuncionarioDependenteService.get(
      dependente.codigo
    );

    adicionarDependente(respDependente.data);
  };

  return (
    <>
      <AddDependentes onSave={onSave} onUpdate={onUpdate} />
      <TableDependentes
        lista={listaDependentes}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default FormDependentes;
