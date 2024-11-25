import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { FuncionarioContatoEmergenciaModel } from "../../../../models/funcionario.contatoemergencia.model";
import { mask } from "node-masker";

type TableProps = {
  lista?: FuncionarioContatoEmergenciaModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: FuncionarioContatoEmergenciaModel) => void;
};

const TableContatoEmergencia = ({ lista, onDelete, onEdit }: TableProps) => {
  const handleEditClick = (item: FuncionarioContatoEmergenciaModel) =>
    onEdit(item);

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  return (
    <div className={styles.TableContatoEmergencia}>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th className="w-35">Nome contato</th>
              <th className="w-15">Grau de parentesco</th>
              <th className="w-15">Telefone</th>
              <th>Telefone2</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista?.length! > 0 &&
              lista?.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.grauParentesco}</td>
                  <td>
                    {item.telefone
                      ? mask(item.telefone, [
                          "(99) 9999-9999",
                          "(99) 99999-9999",
                        ])
                      : ""}
                  </td>
                  <td>
                    {item.telefone2
                      ? mask(item.telefone2, [
                          "(99) 9999-9999",
                          "(99) 99999-9999",
                        ])
                      : ""}
                  </td>
                  <td className="text-center">
                    <button
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                      }}
                      className="btn"
                      title="Alterar"
                      onClick={() => {
                        handleEditClick(item);
                      }}
                      type="button"
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
                      className="btn"
                      title="Excluir"
                      onClick={() => {
                        handleDeleteClick(item.codigo);
                      }}
                      type="button"
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
export default TableContatoEmergencia;
