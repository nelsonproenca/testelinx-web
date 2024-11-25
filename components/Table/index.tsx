import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { RegistroModel } from "../../models/registro.model";

type TableProps = {
  lista?: RegistroModel[];
  onDelete: (codigo: number) => void;
  onEdit: (item: RegistroModel) => void;
};

const Table = ({ lista, onDelete, onEdit }: TableProps) => {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaPesquisa, setListaPesquisa] = useState<RegistroModel[]>();

  useEffect(() => {
    setListaPesquisa(lista);
  }, [lista]);

  const handleEditClick = (codigo: number, nome?: string) => {
    let registro: RegistroModel = {
      codigo,
      nome,
    };
    onEdit(registro);
  };

  const handleDeleteClick = (codigo: number) => onDelete(codigo);

  const handleChangePesquisa = (pesquisa: string) => {
    if (pesquisa === "") {
      setPesquisa("");
      setListaPesquisa(lista);
    } else {
      setPesquisa(pesquisa);
      let resultado: RegistroModel[] = [];

      const resultadoPesquisa = lista?.filter((lista2) => {
        if (lista2.nome !== "") {
          return lista2.nome?.toLowerCase().match(pesquisa.toLowerCase());
        }
      });

      if (resultadoPesquisa?.length! > 0) {
        resultado = resultadoPesquisa!;
      }

      setListaPesquisa(resultado);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className="row">
        <div className="col-md-4 offset-md-8">
          <div className="input-group mb-2">
            <input
              type="text"
              placeholder="Pesquisar"
              className="form-control"
              value={pesquisa}
              onChange={(e) => handleChangePesquisa(e.target.value)}
            />
            <span className="input-group-text">
              <FontAwesomeIcon
                icon={faSearch}
                size="1x"
                className="text-secondary"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        className="table-responsive-sm"
        style={{ overflow: "auto", height: "250px", padding: "10px" }}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th className="w-75">Nome</th>
              <th className="text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {listaPesquisa?.length! > 0 &&
              listaPesquisa?.map((item, index) => (
                <tr key={index}>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
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
                        handleEditClick(item.codigo, item.nome);
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
        {!listaPesquisa?.length && (
          <>
            <div className="d-flex justify-content-center">
              <h4>Não existem dados para visualização.</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
