import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useToken from "../../../../hooks/useToken";
import { useCadastros } from "../../../../contexts/CadastrosContextData";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import FuncionarioIdiomaService from "../../../../services/funcionario.idioma.service";

import { FuncionarioIdiomaModel } from "../../../../models/funcionario.idioma.model";

import AddIdioma from "../AddIdioma";
import TableIdiomas from "../TableIdiomas";

type FormIdiomaProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormIdioma = ({ codigoFuncionario, edicao }: FormIdiomaProps) => {
  const [listaIdioma, setListaIdioma] = useState<
    FuncionarioIdiomaModel[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const { adicionarIdioma } = useCadastros();

  const { token } = useToken();

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respIdioma = await FuncionarioIdiomaService.getAll(
        edicao ? codigoFuncionario! : Number(token.codigoProfissional)
      );

      setListaIdioma(respIdioma.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarIdioma({} as FuncionarioIdiomaModel);
  };

  const verificarIdiomaExiste = (tipoIdioma: number) => {
    if (listaIdioma) {
      let idioma = listaIdioma?.find(
        (idioma) => idioma.tipoIdioma === tipoIdioma
      );

      if (idioma) {
        return true;
      }
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
          await FuncionarioIdiomaService.remove(id);
          ToastMessageAlert.fire("", "Seu registro foi excluído.", "success");
          setIsLoading(true);
          loadData();
        }
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (idiomaModel: FuncionarioIdiomaModel) => {
    try {
      let existe: boolean = verificarIdiomaExiste(idiomaModel.tipoIdioma!);

      if (existe) {
        ToastMessageAlert.fire(
          "",
          "Formação já existente, insira um formação que ainda não exista.",
          "warning"
        );
        return;
      }

      await FuncionarioIdiomaService.update(idiomaModel);
      setIsLoading(true);
      loadData();
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onSave = async (idioma: FuncionarioIdiomaModel) => {
    try {
      let existe: boolean = verificarIdiomaExiste(idioma.tipoIdioma!);

      if (existe) {
        ToastMessageAlert.fire(
          "",
          "Formação já existente, insira um formação que ainda não exista.",
          "warning"
        );
        return;
      }

      await FuncionarioIdiomaService.create(idioma);
      setIsLoading(true);
      loadData();
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onEdit = (idioma: FuncionarioIdiomaModel) => adicionarIdioma(idioma);

  return (
    <>
      <AddIdioma
        onSave={onSave}
        onUpdate={onUpdate}
        codigoFuncionario={codigoFuncionario}
        edicao
      />
      <TableIdiomas lista={listaIdioma} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
};

export default FormIdioma;
