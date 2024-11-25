import { useEffect, useState } from "react";
import { useCadastros } from "../../../../contexts/CadastrosContextData";
import { FuncionarioContatoEmergenciaModel } from "../../../../models/funcionario.contatoemergencia.model";
import useToken from "../../../../hooks/useToken";
import { mask, unMask } from "node-masker";
import Swal from "sweetalert2";
import FuncionarioContatoEmergenciaService from "../../../../services/funcionario.contatoEmergencia.service";

type AddContatoEmergenciaProps = {
  onSave: (contatoEmergencia: FuncionarioContatoEmergenciaModel) => void;
  onUpdate: (
    contatoEmergencia: FuncionarioContatoEmergenciaModel,
    codigoContato: number
  ) => void;
  codigoFuncionario?: number;
  edicao?: boolean;
};

const AddContatoEmergencia = ({
  onSave,
  onUpdate,
  codigoFuncionario,
  edicao,
}: AddContatoEmergenciaProps) => {
  const [nomeContato, setNomeContato] = useState<string | undefined>("");
  const [grauParentesco, setGrauParentesco] = useState<string | undefined>("");
  const [telefone, setTelefoneContato] = useState<string | undefined>("");
  const [telefone2, setTelefone2Contato] = useState<string | undefined>("");

  const { contatoEmergenciaItem } = useCadastros();

  const { token } = useToken();

  let contatoEmergencia = contatoEmergenciaItem;

  useEffect(() => {
    if (contatoEmergencia) {
      setNomeContato(contatoEmergencia?.nome);
      setGrauParentesco(contatoEmergencia?.grauParentesco);
      setTelefoneContato(contatoEmergencia?.telefone);
      setTelefone2Contato(contatoEmergencia?.telefone2);
    }
  }, [contatoEmergencia]);

  const handleSaveForm = async () => {
    const valido: string = validaCampos();

    if (valido.length > 0) {
      Swal.fire("Validação", valido, "warning");
      return;
    }

    let contatoEmergenciaModel: FuncionarioContatoEmergenciaModel = {
      codigo: 0,
      codigoFuncionario: edicao
        ? codigoFuncionario
        : Number(token.codigoProfissional),
      nome: nomeContato,
      grauParentesco,
      telefone,
      telefone2,
    };
    if (contatoEmergencia != undefined && contatoEmergencia?.codigo! > 0) {
      contatoEmergenciaModel.codigo = contatoEmergencia?.codigo!;

      onUpdate(contatoEmergenciaModel, contatoEmergencia?.codigo!);
    } else {
      const respcontatoEmergencia =
        await FuncionarioContatoEmergenciaService.getAll(
          edicao ? codigoFuncionario! : Number(token.codigoProfissional)
        );

      if (respcontatoEmergencia.data.length >= 3) {
        Swal.fire(
          "Limite atingido",
          "Você já adicionou o número máximo de contatos de emergência.",
          "warning"
        );
        return;
      }
      onSave(contatoEmergenciaModel);
    }

    limparTela();
  };

  const validaCampos = () => {
    if (!nomeContato) {
      return "O campo nome contato não está preenchido. Verifique.";
    }
    if (!grauParentesco) {
      return "O campo grau de parentesco não está preenchido. Verifique.";
    }
    if (!telefone) {
      return "O campo telefone não está preenchido. Verifique.";
    }
    return "";
  };

  const limparTela = () => {
    setNomeContato("");
    setGrauParentesco("");
    setTelefoneContato("");
    setTelefone2Contato("");
  };

  return (
    <div className="row p-3">
      <div className="col-md-3">
        <label htmlFor="nomeContato" className="form-label">
          Nome contato
        </label>
        <input
          type="text"
          title="Informe o nome do contato para Emergencia"
          className="form-control"
          name="nomeContato"
          id="nomeContato"
          placeholder="Contato para Emergência"
          value={nomeContato || ""}
          onChange={({ target: { value } }) => {
            setNomeContato(value);
          }}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="grauParentescoContato" className="form-label">
          Grau de parentesco
        </label>
        <input
          type="text"
          title="Grau de parentesco"
          className="form-control"
          name="grauParentescoContato"
          id="grauParentescoContato"
          placeholder="Digite o Grau de parentesco"
          value={grauParentesco || ""}
          onChange={({ target: { value } }) => {
            setGrauParentesco(value);
          }}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="telefone" className="form-label">
          Telefone
        </label>
        <input
          type="text"
          title="Telefone de contato"
          className="form-control"
          name="telefone"
          id="telefone"
          placeholder="Digite o telefone de contato"
          value={
            (telefone &&
              mask(telefone, ["(99) 9999-9999", "(99) 99999-9999"])) ||
            ""
          }
          onChange={({ target: { value } }) => {
            setTelefoneContato(unMask(value));
          }}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="telefone2" className="form-label">
          Telefone2
        </label>
        <input
          type="text"
          title="telefone2 de contato"
          className="form-control"
          name="telefone2"
          id="telefone2"
          placeholder="Digite o telefone"
          value={
            (telefone2 &&
              mask(telefone2, ["(99) 9999-9999", "(99) 99999-9999"])) ||
            ""
          }
          onChange={({ target: { value } }) => {
            setTelefone2Contato(unMask(value));
          }}
        />
      </div>
      <div className="row p-3">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <button type="button" onClick={handleSaveForm}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContatoEmergencia;
