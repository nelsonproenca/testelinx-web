import { FormEvent, useState } from "react";
import { AuthResultType } from "../../models/auth.result.type";
import { UsuarioModel } from "../../models/usuario.model";

import AutenticacaoService from "../../services/autenticacao.service";

import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../seeds/tipo.seed";

type ForgotPassawordProps = {
  onViewLogin: () => void;
  onViewTokenConfirmation: (primeiroAcesso: boolean) => void;
};

const ForgotPassword = ({
  onViewLogin,
  onViewTokenConfirmation,
}: ForgotPassawordProps) => {
  const [email, setEmail] = useState<string>();

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (email?.length === 0 || email?.split("@")[1] !== "rvc.law") {
      ToastMessageAlert.fire(
        "",
        "Verifique se os dados foram preenchidos corretamente.",
        "error"
      );
      return;
    } else {
      try {
        const respEsquecerSenha =
          await AutenticacaoService.postEsquecerSenhaUsuario(email);

        const result: AuthResultType<UsuarioModel> = respEsquecerSenha.data;

        if (result) {
          ToastMessageAlert.fire(
            "Token enviado com sucesso.",
            "E-mail enviado com o token de reset de senha.",
            "success"
          );
        }

        const code: number = result.code.indexOf("Success");

        if (code >= 0) {
          onViewTokenConfirmation(false);
        }
      } catch (error) {
        Swal.fire("Erro", `${error}`, "error");
      }
    }
  };

  const handleGoToLogin = (event: FormEvent) => {
    event.preventDefault();
    onViewLogin();
  };

  return (
    <form onSubmit={(event) => handleSubmitForm(event)}>
      <div className="mx-5 mt-3">
        <label htmlFor="email" className="form-label">
          Entre com o seu e-mail:
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconUser.png" alt="usuario email" />
          </span>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="exemplo@rvc.law"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="mx-5 mt-3">
        <button type="submit">Enviar e-mail</button>
      </div>
      <div className="mx-5 mt-1">
        <div className="col text-end">
          <span>
            <a
              href="/"
              onClick={(event) => {
                handleGoToLogin(event);
              }}
            >
              Voltar para o Login
            </a>
          </span>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
