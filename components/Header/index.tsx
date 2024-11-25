import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FiMail } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import useToken from "../../hooks/useToken";

import { apiVersion, chaveToken } from "../../../api.routes";

import { TipoDocumentoUpload } from "../../seeds/tipo.seed";

import { FuncionarioArquivoModel } from "../../models/funcionario.arquivo.model";

import LocalStorageService from "../../services/local.storage.service";
import FuncionarioArquivoService from "../../services/funcionario.arquivo.service";

import CheckTokenUpdate from "../CheckTokenUpdate";
import RoxRobo from "../RoxRobo";
import PopupNotificacao from "../pages/CaixaMensagem/PopupNotificacao";

import imageUser from "../../assets/img/user-solid.svg";

import styles from "./styles.module.scss";

const Header = () => {
  const [active, setActive] = useState(false);
  const [foto, setFoto] = useState<string>("");
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const chaveAcesso: string = LocalStorageService.retrieve(chaveToken);

    if (chaveAcesso!) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const respFotoFuncionario = await FuncionarioArquivoService.get(
        token.codigoProfissional,
        TipoDocumentoUpload.Foto_3x4
      );

      let arquivoModel: FuncionarioArquivoModel = {} as FuncionarioArquivoModel;

      if (respFotoFuncionario.data) {
        arquivoModel = respFotoFuncionario.data;
        const respDownloadFoto = await FuncionarioArquivoService.download(
          arquivoModel.nome!,
          Number(token.codigoProfissional)
        );

        if (respDownloadFoto) {
          const imagem: string = respDownloadFoto.data;
          const nomeArquivo: string = arquivoModel.nome!;
          const extensao: string = nomeArquivo.substring(
            nomeArquivo.indexOf(".") + 1
          );
          const base64ImageData = `data:image/${extensao};base64,${imagem}`;
          setFoto(base64ImageData);
        }
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleLogoutClick = () => {
    try {
      Swal.fire({
        title: "Deseja sair da aplicação?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22304e",
        cancelButtonColor: "#F6A21C",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim",
        iconColor: "#22304e",
      }).then(async (result) => {
        if (result.isConfirmed) {
          LocalStorageService.remove("LoginUsuario");
          LocalStorageService.remove("AccessToken");
          window.location.href = "/";
        }
      });
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleViewAllClick = () => {
    navigate("/notificacao-ver-todas");
  };

  return (
    <>
      <CheckTokenUpdate />
      <div className={styles.headerContainer}>
        <a href="/">
          <img src="/logo-rvc.png" alt="Logo Intranet 4.0" />
        </a>

        <p>Versão: {apiVersion}</p>

        <div className="d-flex bd-highlight">
          <div
            className={`pt-1 pe-4 flex-sherink-1 bd-highlight ${styles.divMail}`}
            onClick={handleViewAllClick}
            style={{ cursor: "pointer" }}
          >
            <FiMail className={styles.mail} size="27" />
          </div>
          <div
            className={`pt-1 pe-4 flex-sherink-1 bd-highlight"${styles.divBell}`}
          >
            <PopupNotificacao />
          </div>
          <div className={`pe-4 flex-sherink-1 bd-highlight ${styles.roxRobo}`}>
            <RoxRobo />
          </div>
          <div className={`ps-2 w-100 bd-highlight pt-2 ${styles.nameUser}`}>
            <span
              onMouseEnter={() => setActive(!active)}
              onMouseUp={() => setActive(!active)}
              onMouseLeave={() => setActive(!active)}
            >
              Olá, {token?.apelido}!
            </span>

            <div className="col-md-1">
              <div
                className={styles.dropDownsair}
                style={{ position: "relative" }}
              >
                <ul
                  className={active ? "visible" : "invisible"}
                  onMouseLeave={() => setActive(!active)}
                >
                  <li>
                    <img
                      className={styles.imageUser + " img-thumbnail"}
                      src={foto.length > 0 ? foto : imageUser}
                      alt="Imagem do Usuário"
                    />
                  </li>
                  <li>
                    <span style={{ textTransform: "lowercase" }}>
                      {token.email}
                    </span>
                  </li>
                  <li>
                    <span>{token.perfil}</span>
                  </li>
                  <li>
                    <span>
                      {token.cargo} #{token.codigoProfissional}
                    </span>
                  </li>
                  <li>
                    <button
                      style={{
                        paddingTop: "3px",
                        width: "5rem",
                        height: "30px",
                        border: "none",
                        boxShadow: "none",
                        textDecoration: "none",
                      }}
                      className={`btn ${styles.buttonSair}`}
                      title="Excluir"
                      onClick={() => {
                        handleLogoutClick();
                      }}
                    >
                      <div>
                        <FontAwesomeIcon
                          style={{ marginRight: "8px" }}
                          color="#22304e"
                          icon={faArrowRightFromBracket}
                          title="Sair"
                          size="1x"
                        />
                        Sair
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
