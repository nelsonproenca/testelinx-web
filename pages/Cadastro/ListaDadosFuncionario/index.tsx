import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { useCadastros } from "../../../contexts/CadastrosContextData";

import { FuncionarioModel } from "../../../models/funcionario.model";

import Title from "../../../components/Title";

import FuncionarioService from "../../../services/funcionario.service";

import Loading from "../../../components/Loading";

import styles from "./styles.module.scss";
import CheckTokenUpdate from "../../../components/CheckTokenUpdate";

const paginationComponentOptions = {
  rowsPerPageText: "Linhas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const ListaDadosFuncionario = () => {
  const [sizeCellsTable, setSiceCellsTable] = useState<number>(1);

  const customStyle = {
    headCells: {
      style: {
        paddingLeft: "0.25rem",
        borderBottom: "0.15rem solid #000",
        paddingRight: "0rem",
        fontWeight: "bold",
        fontSize: "1rem",
      },
    },
    cells: {
      style: {
        borderBottom: "0.15rem solid #000",
        borderRight: "0.15rem solid #c0c0c0",
        padding: "0rem 0rem 0.5rem 0.4rem",
        fontSize: `${sizeCellsTable}rem`,
      },
    },
  };

  const columns = [
    {
      name: "Nome do Profissional",
      selector: (row: any) => row.apelido,
    },
    {
      name: "Cargo",
      selector: (row: any) => row.nomeCargo,
    },
    {
      name: "Ações",
      width: "4rem",
      cell: (row: any) => (
        <>
          <button
            style={{
              width: "1px",
              height: "25px",
              border: "none",
              boxShadow: "none",
              padding: "0px 1.2rem 0px 0px",
              marginRight: "0.5rem",
            }}
            className="btn btn-link"
            title="Editar"
            onClick={() => handleEditClick(row)}
          >
            <FontAwesomeIcon icon={faEdit} size="lg" className="text-warning" />
          </button>
        </>
      ),
    },
  ];

  const [listaProfissional, setListaProfissional] =
    useState<FuncionarioModel[]>();
  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaPesquisa, setListaPesquisa] = useState<FuncionarioModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { adicionarFuncionarioDados } = useCadastros();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const respListaFuncionarios = await FuncionarioService.getAtivos(0, true);
      if (respListaFuncionarios) {
        const listaFuncionarios = respListaFuncionarios.data;
        setListaProfissional(listaFuncionarios);
        setListaPesquisa(listaFuncionarios);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Erro!", `${error}`, "error");
    }
  };

  const handleEditClick = (row: FuncionarioModel) => {
    adicionarFuncionarioDados(row);
    navigate("/funcionarios");
  };

  const handleChangePesquisa = (pesquisa: string) => {
    if (pesquisa === "") {
      setPesquisa("");
      setListaPesquisa(listaProfissional);
    } else {
      setPesquisa(pesquisa);
      let resultado: FuncionarioModel[] = [];

      const resultadoPesquisaNome = listaProfissional?.filter((lista2) => {
        if (lista2.apelido !== "") {
          return lista2.apelido?.toLowerCase().match(pesquisa.toLowerCase());
        }
      });

      const resultadoPesquisaNomeCargo = listaProfissional?.filter((lista2) => {
        if (lista2.nomeCargo !== "") {
          return lista2.nomeCargo?.toLowerCase().match(pesquisa.toLowerCase());
        }
      });

      if (resultadoPesquisaNome?.length! > 0) {
        resultado = resultadoPesquisaNome!;
      } else if (resultadoPesquisaNomeCargo?.length! > 0) {
        resultado = resultadoPesquisaNomeCargo!;
      }

      setListaPesquisa(resultado);
    }
  };

  return (
    <div>
      <CheckTokenUpdate />
      {isLoading && <Loading />}
      <Title nomeTela="" />
      <div className={styles.addFuncionariosContainer}>
        <div className="card mb-4 my-5">
          <div className="card-header bg-warning d-flex justify-content-between">
            <h4>Lista dos Funcionarios</h4>
          </div>

          <div className="card-body">
            <DataTable
              columns={columns}
              data={listaPesquisa!}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              subHeader
              subHeaderComponent={
                <div className="row">
                  <div className="col-md-12">
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
              }
              highlightOnHover
              paginationComponentOptions={paginationComponentOptions}
              dense
              customStyles={customStyle}
              noDataComponent={"Não existem dados para visualização."}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaDadosFuncionario;
