import { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faSearch,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import moment from "moment";

import {
  NotificacaoTipo,
  TipoNotificacao,
  ToastMessageAlert,
} from "../../../../seeds/tipo.seed";

import useToken from "../../../../hooks/useToken";

import { RegistroModel } from "../../../../models/registro.model";
import { NotificacaoModel } from "../../../../models/notificacao.model";
import { FuncionarioModel } from "../../../../models/funcionario.model";

import NotificacaoService from "../../../../services/notificacao.service";

import AddFuncionario from "../../../AddFuncionario";
import Loading from "../../../Loading";

import styles from "./styles.module.scss";

const paginationComponentOptions = {
  rowsPerPageText: "Linhas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const customStyle = {
  headCells: {
    style: {
      paddingLeft: "0.25rem",
      paddingRigth: "0rem",
      borderBottom: "0.15rem solid #000",
      fontWeight: "bold",
      fontSize: "0.95rem",
    },
  },
  cells: {
    style: {
      borderBottom: "0.15rem solid #000",
      borderRight: "0.15rem solid #c0c0c0",
      padding: "0rem 0rem 0.5rem 0.4rem",
    },
  },
};

type TableNotificacoesProps = {
  onDelete: (codigo: number) => void;
};

const TableNotificacao = ({ onDelete }: TableNotificacoesProps) => {
  let columns = [
    {
      name: "Data",
      selector: (row: any) => row.data,
      format: (row: any) => moment(row.data).format("DD/MM/YYYY"),
      sortable: true,
      width: "10%",
    },
    {
      name: "Título",
      selector: (row: any) => row.titulo,
      sortable: true,
      width: "",
    },
    {
      name: "Lida",
      selector: (row: any) => (row.lida! ? "Lida" : "Não Lida"),
      sortable: true,
      width: "7%",
    },
    {
      name: "Ações",
      width: "5%",
      cell: (row: NotificacaoModel) => (
        <>
          <button
            style={{
              width: "25px",
              height: "25px",
              border: "none",
              boxShadow: "none",
              padding: "0px 0rem 0px 0px",
            }}
            className="btn btn-link"
            title="Reenviar"
            onClick={() => {
              handleReenviarClick(row.codigo);
            }}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-danger fa-lg"
            />
          </button>
          &nbsp;&nbsp;
          <button
            style={{
              width: "25px",
              height: "25px",
              border: "none",
              boxShadow: "none",
              padding: "0px 0rem 0px 0px",
            }}
            className="btn btn-link"
            title="Excluir"
            onClick={() => {
              handleDeleteClick(row.codigo);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-danger fa-lg" />
          </button>
          &nbsp;&nbsp;
        </>
      ),
      style: {
        width: "100%",
        padding: "0px",
      },
    },
  ];

  const [listaNotificacao, setListaNotificacoes] = useState<
    NotificacaoModel[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaPesquisa, setListaPesquisa] = useState<NotificacaoModel[]>();

  const [tipoNotificacao, setTipoNotificacao] = useState<
    RegistroModel[] | undefined
  >(NotificacaoTipo);

  const [notificacaoSelecionada, setNotificacaoSelecionada] =
    useState<number>(0);
  const [codigoFuncionario, setCodigoFuncionario] = useState<number>(0);

  const { token } = useToken();

  const handleDeleteClick = (codigo: number) => {
    onDelete(codigo);
    handleFilterClick();
  };

  const handleReenviarClick = (codigo: number) => {};

  const handleFilterClick = async () => {
    setIsLoading(true);

    if (
      notificacaoSelecionada === TipoNotificacao.Individual &&
      codigoFuncionario <= 0
    ) {
      ToastMessageAlert.fire(
        "",
        "Atenção! Selecione um colaborador.",
        "warning"
      );
      return;
    }

    try {
      if (notificacaoSelecionada === TipoNotificacao.Todos) {
        const respFiltroTodos = await NotificacaoService.getPorTipo(
          notificacaoSelecionada
        );

        setListaNotificacoes(respFiltroTodos.data);
        setListaPesquisa(respFiltroTodos.data);

        setIsLoading(false);
      }

      if (notificacaoSelecionada === TipoNotificacao.Individual) {
        const respFiltroIndividual = await NotificacaoService.getPorFuncionario(
          token.codigoProfissional
        );

        setListaNotificacoes(respFiltroIndividual.data);
        setListaPesquisa(respFiltroIndividual.data);

        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
      setIsLoading(false);
    }
  };

  const handleChangePesquisa = (pesquisa: string) => {
    if (pesquisa === "") {
      setPesquisa("");
      setListaPesquisa(listaNotificacao);
    } else {
      setPesquisa(pesquisa);
      let resultado: NotificacaoModel[] = [];

      const resultadoPesquisa = listaNotificacao?.filter((lista2) => {
        if (lista2.codigoFuncionario !== null || lista2.tipo !== null) {
          return (
            lista2.data?.toLowerCase().match(pesquisa.toLowerCase()) ||
            lista2.titulo?.toLowerCase().match(pesquisa.toLowerCase()) ||
            lista2.descricao
              ?.toLocaleLowerCase()
              .match(pesquisa.toLocaleLowerCase()) ||
            lista2?.criticidade ||
            lista2?.tipo
          );
        }
      });

      if (resultadoPesquisa?.length! > 0) {
        resultado = resultadoPesquisa!;
      }

      setListaPesquisa(resultado);
    }
  };

  const handleTipoNotificacaoChange = (novaNotificacao: number) => {
    setNotificacaoSelecionada(novaNotificacao);
    setCodigoFuncionario(0);
  };

  const onSave = (funcionarioSelecionado: FuncionarioModel) => {
    setCodigoFuncionario(funcionarioSelecionado.codigo!);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.conteinerTableCompleta}>
        <div className={styles.tableContainer}>
          <form>
            <div className="row">
              <div className="col-md-3 mt-3">
                <label htmlFor="tipoNotificacao" className="form-label">
                  Tipo Notificação
                </label>
                <select
                  className="form-select"
                  id="tipoNotificacaoTable"
                  name="tipoNotificacaoTable"
                  value={notificacaoSelecionada || ""}
                  onChange={({ target: { value } }) => {
                    handleTipoNotificacaoChange(Number(value));
                  }}
                >
                  <option value={0}>Selecione</option>
                  {tipoNotificacao?.map((tipo, index) => (
                    <option key={index} value={tipo.codigo}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>
              {notificacaoSelecionada === TipoNotificacao.Individual ? (
                <div className="col-md-3 mt-3">
                  <AddFuncionario
                    onSave={onSave}
                    titulo="Funcionário"
                    mostrarSocios={true}
                    mostrarUsuario={true}
                  />
                </div>
              ) : (
                <div className="col-md-3"></div>
              )}
              <div className="col-md-3 offset-md-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    handleFilterClick();
                  }}
                  disabled={notificacaoSelecionada <= 0}
                >
                  Filtrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.tableContainerLista}>
          <div className={styles.borderDaTable}>
            <DataTable
              title="Lista de Notificações"
              columns={columns}
              data={listaPesquisa!}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              subHeader
              subHeaderComponent={
                <>
                  <div className="row mt-3">
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
                </>
              }
              paginationComponentOptions={paginationComponentOptions}
              dense
              customStyles={customStyle}
              highlightOnHover
              noDataComponent={"Não existem dados para visualização."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableNotificacao;
