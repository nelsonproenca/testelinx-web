import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { ExperienciaProfissionalModel } from "../../../../models/funcionario.experienciaprofissional.model";

import styles from "./styles.module.scss";

type TableProps = {
  lista: ExperienciaProfissionalModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: ExperienciaProfissionalModel) => void;
};

const TableExperienciaProfissional = ({
  lista,
  onDelete,
  onEdit,
}: TableProps) => {
  const handleEditClick = (item: ExperienciaProfissionalModel) => onEdit(item);

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  return (
    <div className={styles.tableExperienciaProfissionalContainer}>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th>Nome da Empresa</th>
              <th>Cargo</th>
              <th>Data de Admissão</th>
              <th>Data de Recisão</th>
              <th>Descrição Atividades</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista?.length! > 0 &&
              lista?.map((item, index) => (
                <tr key={index}>
                  <td>{item.nomeEmpresa}</td>
                  <td>{item.cargo}</td>
                  <td>{item.dataAdmissao}</td>
                  <td>{item.dataRecisao}</td>
                  <td className="text-truncate " style={{ maxWidth: "250px" }}>
                    {item.descricaoAtividades}
                  </td>
                  <td className="text-center">
                    <button
                      style={{
                        paddingTop: "3px",
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
                    &nbsp;&nbsp;
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

export default TableExperienciaProfissional;
