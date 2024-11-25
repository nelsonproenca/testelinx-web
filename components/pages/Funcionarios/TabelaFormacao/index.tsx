import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Formacoes, StatusCurso } from "../../../../seeds/tipo.seed";

import { FormacaoModel } from "../../../../models/funcionario.formacao.model";

import styles from "./styles.module.scss";
import moment from "moment";

type TableFormacaoProps = {
  lista?: FormacaoModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: FormacaoModel) => void;
};

const TableFormacao = ({ lista, onDelete, onEdit }: TableFormacaoProps) => {
  const handleEditClick = (item: FormacaoModel) => onEdit(item);

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  const getNomeTipoFormacao = (tipoFormacao?: number) => {
    let formacao = Formacoes.find(
      (formacao) => formacao.codigo === tipoFormacao
    );
    return formacao?.nome || "Tipo de Formação Desconhecido";
  };

  return (
    <div className={styles.tableFormacaoContainer}>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th>Nome da Instituição</th>
              <th>Formação Superior</th>
              <th>Curso</th>
              <th>Status do curso</th>
              <th>Início</th>
              <th>Término</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {lista?.length! > 0 &&
              lista
                ?.sort((a, b) => a.tipoFormacao! - b.tipoFormacao!)
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.nomeInstituicao}</td>
                    <td>{getNomeTipoFormacao(item.tipoFormacao)}</td>
                    <td>{item.nomeCurso}</td>
                    <td>
                      {item.statusCursando! &&
                        StatusCurso[item.statusCursando! - 1].nome}
                    </td>
                    <td>
                      {item.inicio!
                        ? moment(item.inicio).format("MM/YYYY")
                        : ""}
                    </td>
                    <td>
                      {item.termino!
                        ? moment(item.termino).format("MM/YYYY")
                        : ""}
                    </td>
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

export default TableFormacao;
