import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { FuncionarioIdiomaModel } from "../../../../models/funcionario.idioma.model";

import { Idiomas, NiveisIdiomas } from "../../../../seeds/tipo.seed";

import styles from "./styles.module.scss";

type TableIdiomaProps = {
  lista?: FuncionarioIdiomaModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: FuncionarioIdiomaModel) => void;
};

const TableIdiomas = ({ lista, onDelete, onEdit }: TableIdiomaProps) => {
  const handleEditClick = (item: FuncionarioIdiomaModel) => onEdit(item);

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  return (
    <div className={styles.tableIdiomasContainer}>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th className="w-25">Idioma</th>
              <th className="w-50">Nível</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista?.length! > 0 &&
              lista?.map((item, index) => (
                <tr key={index}>
                  <td>{Idiomas[item.tipoIdioma! - 1].nome}</td>
                  <td>{NiveisIdiomas[item.nivel! - 1].nome}</td>
                  <td className="text-center">
                    <button
                      style={{
                        paddingTop: "3px",
                        width: "30px",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                        background: "none",
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
                    &nbsp;&nbsp;
                    <button
                      style={{
                        paddingTop: "3px",
                        width: "30px",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                        background: "none",
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

export default TableIdiomas;
