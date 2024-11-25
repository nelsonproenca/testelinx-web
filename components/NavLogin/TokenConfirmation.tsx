import { FormEvent, useState } from "react";

import { AuthResultType } from "../../models/auth.result.type";
import { UsuarioModel } from "../../models/usuario.model";

import AutenticacaoService from "../../services/autenticacao.service";

import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../seeds/tipo.seed";

type TokenConfirmationProps = {
  onViewChangePassword: () => void;
  onViewResetPassword: (accessToken: string) => void;
  onViewLogin: () => void;
  primeiroAcesso: boolean;
};

const TokenConfirmation = ({
  onViewChangePassword,
  onViewLogin,
  onViewResetPassword,
  primeiroAcesso,
}: TokenConfirmationProps) => {
  const [email, setEmail] = useState<string>();
  const [token, setToken] = useState<string>();

  const handleGerarTokenEmailConfirmacao = async () => {
    try {
      const respConfirmarEmail =
        await AutenticacaoService.postGerarEmailConfirmacao(email!);

      const result: AuthResultType<UsuarioModel> = respConfirmarEmail.data;

      if (result) {
        ToastMessageAlert.fire("", `${result.description}`, "success");
      }
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleGerarTokenEsqueciSenha = async () => {
    const respEsquecerSenha =
      await AutenticacaoService.postEsquecerSenhaUsuario(email!);

    const result: AuthResultType<UsuarioModel> = respEsquecerSenha.data;

    if (result) {
      ToastMessageAlert.fire("", `${result.description}`, "success");
    }
  };

  const handleGoToLogin = (event: FormEvent) => {
    event.preventDefault();
    onViewLogin();
  };

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (
      email?.length === 0 ||
      email?.split("@")[1] !== "rvc.law" ||
      token?.length === 0
    ) {
      ToastMessageAlert.fire(
        "",
        "Dados inválidos, Verifique se os dados foram preenchidos corretamente.",
        "error"
      );
      return;
    } else {
      try {
        if (primeiroAcesso) {
          const respConfirmarEmail =
            await AutenticacaoService.postConfirmarEmailUsuario(token!, email);

          const result: AuthResultType<UsuarioModel> = respConfirmarEmail.data;

          if (result) {
            ToastMessageAlert.fire("", `${result.description}`, "success");

            const code: number = result.code.indexOf("Success");

            if (code >= 0) {
              onViewChangePassword();
              return;
            }
          }
        } else {
          onViewResetPassword(token!);
        }
      } catch (error) {
        Swal.fire("Erro", `${error}`, "error");
      }
    }
  };

  const handleSolicitarTokenClick = (event: FormEvent) => {
    event.preventDefault();

    if (email?.length === 0 || email?.split("@")[1] !== "rvc.law") {
      ToastMessageAlert.fire(
        "",
        "Atenção! E-mail deve ser preenchido.",
        "warning"
      );
      return;
    }

    if (primeiroAcesso) {
      handleGerarTokenEmailConfirmacao();
    } else {
      handleGerarTokenEsqueciSenha();
    }
  };

  return (
    <form onSubmit={(event) => handleSubmitForm(event)}>
      <div className="mx-5 mt-3">
        <label htmlFor="email" className="form-label w-100">
          <div className="row ">
            <div className="col-md-8">Token de Validação:</div>
            <div className="col-md-4 text-end">
              <span>
                <a
                  href="/"
                  onClick={(event) => {
                    handleSolicitarTokenClick(event);
                  }}
                >
                  Solicitar novo token
                </a>
              </span>
            </div>
          </div>
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconPass.png" alt="token email" />
          </span>
          <input
            type="text"
            className="form-control"
            id="token"
            name="token"
            onChange={(event) => setToken(event.target.value)}
          />
        </div>
      </div>
      <div className="mx-5 mt-3">
        <label htmlFor="email" className="form-label">
          E-mail:
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
        <button type="submit">Validar token</button>
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

export default TokenConfirmation;
