import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { FuncionarioDependenteModel } from "../../../../models/funcionario.dependente.model";
import moment from "moment";
import { Dependentes } from "../../../../seeds/tipo.seed";

type TableProps = {
  lista?: FuncionarioDependenteModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: FuncionarioDependenteModel) => void;
};

const TableDependentes = ({ lista, onDelete, onEdit }: TableProps) => {
  const handleEditClick = (item: FuncionarioDependenteModel) => onEdit(item);

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  const getTipoDependente = (tipoDependente?: number) => {
    let dependente = Dependentes.find(
      (dependente) => dependente.codigo === tipoDependente
    );
    return dependente?.nome;
  };

  return (
    <div className={styles.tableDependentesContainer}>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th className="w-45">Nome</th>
              <th className="w-15">Dependente</th>
              <th className="w-25">CPF</th>
              <th>Data de Nascimento</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista?.length! > 0 &&
              lista?.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{getTipoDependente(item.codigoTipoDependente)}</td>
                  <td>{item.cpf}</td>
                  <td>{moment(item.dataNascimento).format("DD/MM/YYYY")}</td>
                  <td className="text-center">
                    <button
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                      }}
                      className="btn btn-link"
                      title="Alterar"
                      onClick={() => {
                        handleEditClick(item);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="1x"
                        className="text-warning"
                      />
                    </button>
                    <button
                      style={{
                        paddingTop: "3px",
                        width: "30px",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                      }}
                      className="btn btn-link"
                      title="Excluir"
                      onClick={() => {
                        handleDeleteClick(item.codigo);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        size="1x"
                        className="text-danger"
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDependentes;
