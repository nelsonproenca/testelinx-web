import { FormEvent, useState } from "react";

import { AuthResultType } from "../../models/auth.result.type";
import { ResetarSenhaUsuarioModel } from "../../models/resetar.senha.usuario.model";
import { UsuarioModel } from "../../models/usuario.model";

import AutenticacaoService from "../../services/autenticacao.service";
import LocalStorageService from "../../services/local.storage.service";

import styles from "./styles.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../seeds/tipo.seed";

type ResetPasswordProps = {
  onViewLogin: () => void;
  accessToken: string;
};

const ResetPassword = ({ onViewLogin, accessToken }: ResetPasswordProps) => {
  const [email, setEmail] = useState<string>();
  const [confirmarSenha, setConfirmarSenha] = useState<string>();
  const [novaSenha, setNovaSenha] = useState<string>();

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const respSenhaDefault = await AutenticacaoService.getSenhaDefault();

    const senhaDefault: string = respSenhaDefault.data;

    const regexConfereSenha =
      /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\0-9a-zA-Z]{1,40}$/;
    const regexConfereSenhaTamanho = /^[@!#$%^&*()/\\0-9a-zA-Z]{8,20}$/;

    const novaSenhaConferencia = regexConfereSenha.test(confirmarSenha!);
    const novaSenhaConferenciaTamanho = regexConfereSenhaTamanho.test(
      confirmarSenha!
    );

    if (
      email?.length === 0 ||
      email?.split("@")[1] !== "rvc.law" ||
      confirmarSenha?.length === 0 ||
      novaSenha?.length === 0 ||
      novaSenha?.match(senhaDefault)
    ) {
      ToastMessageAlert.fire("", "Atenção! Dados inválidos.", "error");
      return;
    } else {
      if (novaSenha !== confirmarSenha) {
        ToastMessageAlert.fire(
          "",
          "Atenção! As senhas devem ser iguais.",
          "warning"
        );
        return;
      } else {
        if (novaSenhaConferencia === false) {
          ToastMessageAlert.fire(
            "",
            "Atenção! Informe uma senha que contenha letra maiúscula, minúscula, número e caractere especial.",
            "warning"
          );
          return;
        } else {
          if (novaSenhaConferenciaTamanho === false) {
            ToastMessageAlert.fire(
              "",
              "Atenção! Informe uma senha entre 08 e 20 dígitos.",
              "warning"
            );
            return;
          } else {
            try {
              const resetarSenha: ResetarSenhaUsuarioModel = {
                email: email!,
                novaSenha: novaSenha!,
                token: accessToken!,
              };

              const respResetarSenha =
                await AutenticacaoService.postResetarSenhaUsuario(resetarSenha);

              const result: AuthResultType<UsuarioModel> =
                respResetarSenha.data;

              if (result) {
                const logMessage = result.description;
                if (logMessage !== "Senha do Usuário alterarda com sucesso") {
                  ToastMessageAlert.fire(
                    "",
                    `${result.description}`,
                    "warning"
                  );
                } else {
                  ToastMessageAlert.fire(
                    "",
                    "Senha alterada com sucesso.",
                    "success"
                  );
                }
              }

              const code: number = result.code.indexOf("Success");

              if (code >= 0) {
                onViewLogin();
              }
            } catch (error) {
              Swal.fire("Erro", `${error}`, "error");
            }
          }
        }
      }
    }
  };

  const handleGoToLogin = (event: FormEvent) => {
    event.preventDefault();
    onViewLogin();
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form onSubmit={(event) => handleSubmitForm(event)}>
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
      <div className="mx-5 mt-1 ">
        <label htmlFor="novaSenha" className="form-label">
          Nova senha:
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconPass.png" alt="usuario senha" />
          </span>
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            id="novaSenha"
            name="novaSenha"
            placeholder="*******"
            onChange={(event) => setNovaSenha(event.target.value)}
          />
          <span className={styles.showPassword} onClick={togglePassword}>
            {passwordShown ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
      </div>
      <div className="mx-5 mt-1 mb-2">
        <label htmlFor="confirmarSenha" className="form-label">
          Confirmar Senha:
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconPass.png" alt="usuario senha" />
          </span>
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            name="confirmarSenha"
            id="confirmarSenha"
            placeholder="*******"
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />
          <span className={styles.showPassword} onClick={togglePassword}>
            {passwordShown ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
        {confirmarSenha !== novaSenha && (
          <span>Atenção! As senhas devem ser iguais.</span>
        )}
      </div>
      <div className="ps-4">
        <cite className="ps-4">
          OBS: Senha com pelo menos 1 letra maiuscula, 1 numero e 1 caracter
          especial.
        </cite>
      </div>
      <div className="mx-5 mt-3">
        <button type="submit">Salvar</button>
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

export default ResetPassword;
