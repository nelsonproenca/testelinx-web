import { useState } from "react";
import Swal from "sweetalert2";

import { ToastMessageAlert } from "../../../../seeds/tipo.seed";

import { FuncionarioModel } from "../../../../models/funcionario.model";

import NotificacaoService from "../../../../services/notificacao.service";

import AddFuncionario from "../../../AddFuncionario";

import styles from "./styles.module.scss";

const CryptoMaster = () => {
  const [emailFuncionario, setEmailFuncionario] = useState<string>("");

  const handleAlterarCryptClick = async () => {
    try {
      if (emailFuncionario.length === 0) {
        ToastMessageAlert.fire(
          "",
          "É necessário selecionar um funcionário.",
          "warning"
        );

        return;
      }

      const respRecript = await NotificacaoService.recript(emailFuncionario!);

      if (respRecript) {
        ToastMessageAlert.fire(
          "",
          "Reprocessamento feito com sucesso",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const onSave = (funcionarioSelecionado: FuncionarioModel) => {
    setEmailFuncionario(funcionarioSelecionado.email!);
  };

  return (
    <>
      <div className={styles.adicionarContainer}>
        <div className={styles.conteinerTableCompleta}>
          <div className={styles.tableContainer}>
            <form>
              <div className="row">
                <div className="col-md-3 mt-3">
                  <AddFuncionario
                    onSave={onSave}
                    titulo="Funcionário"
                    mostrarSocios={true}
                    mostrarUsuario={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      handleAlterarCryptClick();
                    }}
                  >
                    Processar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoMaster;
