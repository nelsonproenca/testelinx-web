import { useEffect, useState } from "react";
import { VscBell } from "react-icons/vsc";
import Swal from "sweetalert2";

import closeRoboRox from "../../../../assets/img/close_robo_rox.png";

import NotificacaoLista from "../NotificacaoLista";

import { useNavigate } from "react-router-dom";
import useToken from "../../../../hooks/useToken";

import { NotificacaoModel } from "../../../../models/notificacao.model";

import NotificacaoService from "../../../../services/notificacao.service";

import styles from "./styles.module.scss";
import CheckTokenUpdate from "../../../CheckTokenUpdate";
import LocalStorageService from "../../../../services/local.storage.service";
import { chaveToken } from "../../../../../api.routes";

const PopupNotificacao = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState<NotificacaoModel[]>([]);
  const [ultimasNotificacoes, setUltimasNotificacoes] = useState<
    NotificacaoModel[]
  >([]);

  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<
    NotificacaoModel | undefined
  >();

  const [quantidadeNotificacaoNaoLida, setQuantidadeNotificacaoNaoLida] =
    useState<number>(0);

  const { token } = useToken();

  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const chaveAcesso: string = LocalStorageService.retrieve(chaveToken);

    if (chaveAcesso!) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const respNotificacoesFuncionario =
        await NotificacaoService.getListaPopup(token.codigoProfissional);

      if (respNotificacoesFuncionario.data!) {
        let lista: NotificacaoModel[] = respNotificacoesFuncionario.data;

        const storedNotificacoesLidas =
          localStorage.getItem("notificacoesLidas");

        let notificacoesLidasStored: number[] = [];

        if (storedNotificacoesLidas) {
          notificacoesLidasStored = [...JSON.parse(storedNotificacoesLidas)];
        }

        let listaNaoLidas = lista.filter(
          (item) =>
            !item.monitorarLeitura &&
            !notificacoesLidasStored.includes(item.codigo)
        );

        setNotificacoes(listaNaoLidas);

        let ultimasCinco = listaNaoLidas.slice(0, 5);

        setUltimasNotificacoes(ultimasCinco);

        let quantidade = listaNaoLidas.length;
        setQuantidadeNotificacaoNaoLida(quantidade);
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handlePopupToggle = () => {
    setActive(!active);
  };

  const onGetNotification = (notificacaoProps: NotificacaoModel) => {
    setNotificacaoSelecionada(notificacaoProps);
  };

  const onGetListaNotificacao = () => {
    loadData();
  };

  const handleViewAllClick = () => {
    navigate("/notificacao-ver-todas");
    setActive(false);
  };

  const handleMarcarLidaIndividualmente = (codigo: number) => {
    setQuantidadeNotificacaoNaoLida((prevState) => Math.max(prevState - 1, 0));
  };

  return (
    <>
      <CheckTokenUpdate />
      <section className={styles.popupNotificacao}>
        <button
          className={styles.buttonPopupNotificacao}
          onClick={handlePopupToggle}
        >
          <VscBell className={styles.popupIcon} size={27} />
          {notificacoes.length! > 0 && (
            <span className="position-absolute translate-middle badge rounded-pill bg-danger">
              {quantidadeNotificacaoNaoLida}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
        {active && (
          <div className={styles.containerPopupNotificacao}>
            <header
              style={{ textTransform: "uppercase" }}
              className="text-center"
            >
              <span>NOTIFICAÇÕES</span>
              <img
                className={styles.closeModal}
                onClick={handlePopupToggle}
                src={closeRoboRox}
                alt="closeModal"
              />
              <hr />
            </header>
            <div className="d-flex align-items-start flex-column mb-3">
              <div className="col-md-12 py-2">
                <div className={styles.containerList}>
                  {notificacoes.length > 0 ? (
                    <NotificacaoLista
                      notifications={ultimasNotificacoes}
                      onGetNotification={onGetNotification}
                      onGetListaNotificacao={onGetListaNotificacao}
                      habilitarLeitura={false}
                      onMarcarLidaIndividualmente={
                        handleMarcarLidaIndividualmente
                      }
                      maxLengthDescription={95}
                      isPopup={true}
                    />
                  ) : (
                    <div className="d-flex justify-content-center">
                      Não Existem Novas Mensagens
                    </div>
                  )}
                </div>
              </div>
            </div>
            {notificacoes.length > 0 && (
              <div className="col-md-12">
                <button
                  type="button"
                  className={styles.buttonVerTodas}
                  onClick={handleViewAllClick}
                >
                  Ver Todas
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default PopupNotificacao;
