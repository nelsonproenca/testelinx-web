import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  StatusNotificacao,
  TipoNotificacao,
} from "../../../../seeds/tipo.seed";
import { useCadastros } from "../../../../contexts/CadastrosContextData";

import { NotificacaoModel } from "../../../../models/notificacao.model";
import { NotificacaoFuncionarioModel } from "../../../../models/notificacao.funcionario.model";

import NotificacaoService from "../../../../services/notificacao.service";
import NotificacaoFuncionarioService from "../../../../services/notificacao.funcionario.service";

import styles from "./styles.module.scss";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

type NotificacaoListaProps = {
  notifications: NotificacaoModel[];
  onGetNotification: (notificacaoProps: NotificacaoModel) => void;
  onGetListaNotificacao: () => void;
  habilitarLeitura: boolean;
  onMarcarLidaIndividualmente?: (codigo: number) => void;
  maxLengthDescription?: number;
  isPopup?: boolean;
};

const NotificacaoLista = ({
  notifications,
  onGetNotification,
  onGetListaNotificacao,
  habilitarLeitura,
  onMarcarLidaIndividualmente,
  maxLengthDescription,
  isPopup,
}: NotificacaoListaProps) => {
  const { adicionarNotificacao } = useCadastros();
  const { notificacaoFuncionarioItem, adicionarNotificacaoFuncionario } =
    useCadastros();

  const funcionario = notificacaoFuncionarioItem;

  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<
    number | undefined
  >(0);
  const [notificacaoLida, setNotificacaoLida] = useState<boolean>(false);
  const [notificacoesLidas, setNotificacoesLidas] = useState<number[]>([]);

  useEffect(() => {
    const storedNotificacoesLidas = localStorage.getItem("notificacoesLidas");
    if (storedNotificacoesLidas) {
      setNotificacoesLidas(JSON.parse(storedNotificacoesLidas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notificacoesLidas",
      JSON.stringify(notificacoesLidas)
    );
  }, [notificacoesLidas]);

  const handleMostrarNotificacaoClick = async (
    notificacao: NotificacaoModel
  ) => {
    if (habilitarLeitura!) {
      onGetNotification(notificacao);
      setNotificacaoSelecionada(notificacao.codigo);

      if (!notificacao.monitorarLeitura && !funcionario?.codigoNotificacao) {
        monitorarLeitura(notificacao);
        addFuncionario(notificacao);
      }
    }
  };

  const monitorarLeitura = async (notificacao: NotificacaoModel) => {
    try {
      if (notificacao.tipo == TipoNotificacao.Individual) {
        let notificacaoModel = notificacao;

        await NotificacaoService.updateOne(
          notificacaoModel.codigo,
          (notificacaoModel.monitorarLeitura = true)
        );
        setNotificacaoLida(true);
        adicionarNotificacao({} as NotificacaoModel);

        onGetListaNotificacao();
      }
      if (
        notificacao.tipo === TipoNotificacao.Todos &&
        !notificacoesLidas.includes(notificacao.codigo)
      ) {
        setNotificacoesLidas((prevState) => [...prevState, notificacao.codigo]);
        if (onMarcarLidaIndividualmente) {
          onMarcarLidaIndividualmente(notificacao.codigo);
        }
      }
    } catch (error) {}
  };

  const addFuncionario = async (notificacao: NotificacaoModel) => {
    try {
      let funcionarioModel: NotificacaoFuncionarioModel = {
        codigo: funcionario?.codigo ?? 0,
        codigoFuncionario: notificacao?.codigoFuncionario ?? 0,
        codigoNotificacao: notificacao?.codigo ?? 0,
        status: notificacao.monitorarLeitura
          ? StatusNotificacao.Lida
          : StatusNotificacao.NaoLida,
      };

      funcionarioModel.dataLeitura = moment().format();

      const diffDate =
        (new Date(
          moment(funcionarioModel.dataLeitura)
            .format("YYYY-MM-DD")
            .concat("T23:59:59.01")
        ).valueOf() +
          990 -
          new Date(
            moment(notificacao.data).format("YYYY-MM-DD").concat("T00:00:00.00")
          ).valueOf()) /
          (1000 * 60 * 60 * 24) || 0;

      funcionarioModel.diasEmAberto = diffDate;

      await NotificacaoFuncionarioService.create(funcionarioModel);

      adicionarNotificacaoFuncionario({} as NotificacaoFuncionarioModel);
    } catch (error) {
      Swal.fire("Erro ", `${error}`, "error");
    }
  };

  const sanitizeAndLimitChars = (html: string, maxLength: number) => {
    const withoutHTML = html.replace(/<[^>]*>?/gm, "");

    const limitedChars = withoutHTML.slice(0, maxLength);
    const finalText =
      withoutHTML.length > maxLength
        ? limitedChars.substring(0, maxLength) + "..."
        : limitedChars;

    return finalText;
  };

  return (
    <>
      <div className="list-group">
        {notifications.map((item, index) => {
          const isNotificacaoLida =
            notificacoesLidas.includes(item.codigo) || item.monitorarLeitura;

          return (
            <a
              key={index}
              className={`list-group-item list-group-item-action ${styles.listaHover}`}
              aria-current="true"
              style={{
                backgroundColor:
                  notificacaoSelecionada === item.codigo ? "#aed9ff" : "#fff",
                borderLeft: isNotificacaoLida ? "" : "5px solid #faa627",
              }}
              onClick={() => handleMostrarNotificacaoClick(item)}
            >
              {isPopup! ? (
                <>
                  <div className="row">
                    <div className="col-md-10">
                      <p className="my-2 fs-5 text-truncate fw-bold">
                        {item.titulo}
                      </p>
                    </div>
                    <div className="col-md-2 text-end mt-2">
                      {item.existeAnexo && (
                        <FontAwesomeIcon icon={faPaperclip} size="1x" />
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-row my-1">
                    <div
                      className="w-100 text-break fs-6 fw-bold"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeAndLimitChars(
                          item.descricao!,
                          maxLengthDescription!
                        ),
                      }}
                    />
                  </div>
                  <div className="my-1 text-body-secondary text-warning fw-bold fs-6">
                    {moment(item.data).format("DD/MM/YYYY HH:mm")}
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-10">
                      <p className="my-2 fs-5 text-truncate fw-bold">
                        {item.titulo}
                      </p>
                    </div>
                    <div className="col-md-2 text-end mt-2">
                      {item.existeAnexo && (
                        <FontAwesomeIcon icon={faPaperclip} size="1x" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div
                      className={
                        "w-100 fs-6" +
                        (isNotificacaoLida ? "" : " text-warning")
                      }
                      dangerouslySetInnerHTML={{
                        __html: sanitizeAndLimitChars(
                          item.descricao!,
                          maxLengthDescription!
                        ),
                      }}
                    />
                  </div>
                  <div className="text-end">
                    <p
                      className={
                        "my-1 fs-6" + (isNotificacaoLida ? "" : " text-warning")
                      }
                    >
                      {moment(item.data).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>
                </>
              )}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default NotificacaoLista;
