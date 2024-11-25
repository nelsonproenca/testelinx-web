import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";

import { AlterarSenhaUsuarioModel } from "../../models/alterar.senha.usuario.model";
import { AuthResultType } from "../../models/auth.result.type";
import { UsuarioModel } from "../../models/usuario.model";

import AutenticacaoService from "../../services/autenticacao.service";

import styles from "./styles.module.scss";

import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../seeds/tipo.seed";

type ChangePasswordProps = {
  onViewLogin: () => void;
};

const ChangePassword = ({ onViewLogin }: ChangePasswordProps) => {
  const [email, setEmail] = useState<string>();
  const [senhaAtual, setSenhaAtual] = useState<string>();
  const [novaSenha, setNovaSenha] = useState<string>();

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const respSenhaDefault = await AutenticacaoService.getSenhaDefault();

    const senhaDefault: string = respSenhaDefault.data;

    const regexConfereSenha =
      /^(?=.*[@!#$%^&*()/\\])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\0-9a-zA-Z]{1,40}$/;
    const regexConfereSenhaTamanho = /^[@!#$%^&*()/\\0-9a-zA-Z]{8,20}$/;

    const novaSenhaConferencia = regexConfereSenha.test(novaSenha!);
    const novaSenhaConferenciaTamanho = regexConfereSenhaTamanho.test(
      novaSenha!
    );

    if (
      email?.length === 0 ||
      email?.split("@")[1] !== "rvc.law" ||
      senhaAtual?.length === 0 ||
      novaSenha?.length === 0 ||
      novaSenha?.match(senhaDefault)
    ) {
      ToastMessageAlert.fire("", "Dados inválidos.", "warning");
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
            "Atenção! Informe uma senha entre 08 e 20 caracteres.",
            "warning"
          );
          return;
        } else {
          try {
            const alterarSenha: AlterarSenhaUsuarioModel = {
              email: email!,
              novaSenha: novaSenha!,
              senhaAtual: senhaAtual!,
            };

            const respAlterarSenha =
              await AutenticacaoService.postAlterarSenhaUsuario(alterarSenha);

            const result: AuthResultType<UsuarioModel> = respAlterarSenha.data;

            if (result) {
              const logMessage = result.description;
              if (logMessage === "Incorrect password.") {
                ToastMessageAlert.fire(
                  "",
                  "Senha atual informada está incorreta.",
                  "error"
                );
              } else {
                if (logMessage === "Senha do Usuário alterarda com sucesso") {
                  ToastMessageAlert.fire(
                    "",
                    "Senha alterada com sucesso.",
                    "success"
                  );
                } else {
                  ToastMessageAlert.fire(
                    "",
                    `${result.description}`,
                    "warning"
                  );
                }
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
  };

  const handleGoToLogin = (event: FormEvent) => {
    event.preventDefault();
    onViewLogin();
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [NewPasswordShown, setNewPasswordShown] = useState(false);

  const toggleNewPassword = () => {
    setNewPasswordShown(!NewPasswordShown);
  };

  return (
    <form
      onSubmit={(event) => handleSubmitForm(event)}
      className={styles.changePasswordContainer}
    >
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
        <label htmlFor="senhaAtual" className="form-label">
          Senha Atual:
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconPass.png" alt="usuario senha" />
          </span>
          <input
            type={passwordShown ? "text" : "password"}
            className="form-control"
            name="senhaAtual"
            id="senhaAtual"
            placeholder="*******"
            onChange={(event) => setSenhaAtual(event.target.value)}
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
      <div className="mx-5 mt-3 mb-2">
        <label htmlFor="novaSenha" className="form-label">
          Nova senha:
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconPass.png" alt="usuario senha" />
          </span>
          <input
            type={NewPasswordShown ? "text" : "password"}
            className="form-control"
            id="novaSenha"
            placeholder="*******"
            name="novaSenha"
            onChange={(event) => setNovaSenha(event.target.value)}
          />
          <span className={styles.showPassword} onClick={toggleNewPassword}>
            {NewPasswordShown ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
        <cite>
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

export default ChangePassword;
