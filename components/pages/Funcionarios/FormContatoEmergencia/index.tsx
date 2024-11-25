import { useEffect, useState } from "react";
import { useCadastros } from "../../../../contexts/CadastrosContextData";
import useToken from "../../../../hooks/useToken";
import { FuncionarioContatoEmergenciaModel } from "../../../../models/funcionario.contatoemergencia.model";
import { ToastMessageAlert } from "../../../../seeds/tipo.seed";
import AddContatoEmergencia from "../AddContatoEmergencia";
import TableContatoEmergencia from "../TableContatoEmergencia";
import Swal from "sweetalert2";
import FuncionarioContatoEmergenciaService from "../../../../services/funcionario.contatoEmergencia.service";

type FormContatoEmergenciaProps = {
  codigoFuncionario?: number;
  edicao?: boolean;
};

const FormContatoEmergencia = ({
  codigoFuncionario,
  edicao,
}: FormContatoEmergenciaProps) => {
  const [listaContatoEmergencia, setListaContatoEmergencia] = useState<
    FuncionarioContatoEmergenciaModel[] | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useToken();

  const { adicionarContatoEmergencia } = useCadastros();

  useEffect(() => {
    loadData();
  }, [isLoading]);

  const loadData = async () => {
    try {
      const respcontatoEmergencia =
        await FuncionarioContatoEmergenciaService.getAll(
          edicao ? codigoFuncionario! : Number(token.codigoProfissional)
        );

      let contatoEmergencia: FuncionarioContatoEmergenciaModel[] =
        respcontatoEmergencia.data;

      setListaContatoEmergencia(contatoEmergencia);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarContatoEmergencia({} as FuncionarioContatoEmergenciaModel);
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
          await FuncionarioContatoEmergenciaService.remove(id);
          ToastMessageAlert.fire("", "Seu registro foi excluído.", "success");
          setIsLoading(true);
          loadData();
        }
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onUpdate = async (
    contatoEmergenciaModel: FuncionarioContatoEmergenciaModel
  ) => {
    try {
      await FuncionarioContatoEmergenciaService.update(contatoEmergenciaModel);
      setIsLoading(true);
      loadData();
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarContatoEmergencia({} as FuncionarioContatoEmergenciaModel);
  };

  const onSave = async (
    contatoEmergenciaModel: FuncionarioContatoEmergenciaModel
  ) => {
    try {
      let contatoEmergencia = listaContatoEmergencia?.find(
        (contatoEmergencia) =>
          contatoEmergencia.telefone?.toLowerCase() ===
          contatoEmergenciaModel.telefone?.toLowerCase()
      );

      if (contatoEmergencia) {
        ToastMessageAlert.fire(
          "",
          "Contato já existente, insira um Contato que ainda não está listado.",
          "warning"
        );
        return;
      }
      const respcontatoEmergencia =
        await FuncionarioContatoEmergenciaService.create(
          contatoEmergenciaModel
        );

      if (respcontatoEmergencia) {
        Swal.fire(
          "Cadastro",
          `Contato de emergência cadastrado com sucesso.`,
          "success"
        );
        setIsLoading(true);
        loadData();
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }

    adicionarContatoEmergencia({} as FuncionarioContatoEmergenciaModel);
  };

  const onEdit = async (
    contatoEmergencia: FuncionarioContatoEmergenciaModel
  ) => {
    let respcontatoEmergencia = await FuncionarioContatoEmergenciaService.get(
      contatoEmergencia.codigo
    );

    adicionarContatoEmergencia(respcontatoEmergencia.data);
  };
  return (
    <>
      <AddContatoEmergencia
        onSave={onSave}
        onUpdate={onUpdate}
        codigoFuncionario={codigoFuncionario}
        edicao={edicao}
      />
      <TableContatoEmergencia
        lista={listaContatoEmergencia}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default FormContatoEmergencia;
