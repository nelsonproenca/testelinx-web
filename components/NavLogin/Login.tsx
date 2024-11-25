import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import useToken from "../../hooks/useToken";

import { ToastMessageAlert } from "../../seeds/tipo.seed";

import { LoginUserModel } from "../../models/login.user.model";
import { UsuarioModel } from "../../models/usuario.model";
import { CommandResultType } from "../../models/command.result.type";

import AutenticacaoService from "../../services/autenticacao.service";
import LoginUsuarioService from "../../services/local.storage.service";

import Loading from "../Loading";

import styles from "./styles.module.scss";
import AuthService from "../../services/auth.service";

type LoginProps = {
  onViewRegister: () => void;
  onViewChangePassword: () => void;
  onViewForgotPassaword: () => void;
  onViewTokenConfirmation: (primeiroAcesso: boolean) => void;
};

const Login = ({
  onViewChangePassword,
  onViewRegister,
  onViewForgotPassaword,
  onViewTokenConfirmation,
}: LoginProps) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [removeLoading, setRemoveLoading] = useState(false);
  const [senhaDefault, setSenhaDefault] = useState("");

  const { setToken, token } = useToken();

  useEffect(() => {
    loadSenhaDefault();
  }, []);

  const loadSenhaDefault = async () => {
    try {
      const respSenhaDefault = await AutenticacaoService.getSenhaDefault();

      const senhaDefault: string = respSenhaDefault.data;
      setSenhaDefault(senhaDefault);
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !senha || email?.split("@")[1] !== "rvc.law") {
      ToastMessageAlert.fire(
        "E-mail/Senha inválidos.",
        "Verifique se e-mail ou senha estão corretos.",
        "error"
      );
      return;
    } else {
      try {
        if (!senhaDefault) {
          ToastMessageAlert.fire(
            "",
            "Erro ao conectar com o servidor",
            "error"
          );
          window.location.reload();
          return;
        }

        const login: LoginUserModel = {
          email,
          password: senha!,
        };

        setRemoveLoading(true);

        const respLogin = await AutenticacaoService.postLoginUsuario(login);

        if (respLogin.data.mensagem) {
          setRemoveLoading(false);

          Swal.fire("Problemas no acesso.", respLogin.data.mensagem, "error");

          return;
        }

        const usuarioAuth: CommandResultType<UsuarioModel> = respLogin?.data;

        const logUser = usuarioAuth.item;

        if (logUser && senhaDefault === senha) {
          Swal.fire(
            "Informações de Acesso",
            "No primeiro acesso é obrigatório a alteração da senha padrão. E a confirmação de e-mail.",
            "warning"
          );

          const emailConfirmado = await verificarEmailConfirmado(email);

          if (!emailConfirmado) {
            onViewTokenConfirmation(true);
          } else {
            onViewChangePassword();
          }
          return;
        } else {
          const emailConfirmado = verificarEmailConfirmado(email);

          if (!emailConfirmado) {
            Swal.fire(
              "Problemas com Acesso",
              "Seu e-mail ainda não foi confirmado em nosso sistema. Confirme seu e-mail e tente novamente. ",
              "error"
            );

            onViewTokenConfirmation(true);
            return;
          }

          const usuarioLogado: UsuarioModel = usuarioAuth.item!;

          if (token === null || token?.email !== usuarioLogado.email) {
            if (!usuarioLogado.perfil || usuarioLogado.perfil.length === 0) {
              setRemoveLoading(false);
              Swal.fire(
                "Problemas com Acesso",
                "Usuário não tem perfil associado para acessar o site.",
                "error"
              );
              return;
            }

            LoginUsuarioService.remove("LoginUsuario");

            setToken(usuarioLogado);
            navigate("/");
            window.location.reload();
          }
        }
      } catch (error) {
        setRemoveLoading(false);
        Swal.fire("Erro", `${error}`, "error");
      }
    }
  };

  const verificarEmailConfirmado = async (email: string) => {
    try {
      const respEmailConfirmado = await AutenticacaoService.getEmailConfirmado(
        email
      );

      const emailConfirmado: boolean = respEmailConfirmado.data;

      return emailConfirmado;
    } catch (error) {
      Swal.fire("Erro", `${error}`, "error");
    }
  };

  const handleGoToRegister = (event: FormEvent) => {
    event.preventDefault();
    onViewRegister();
  };

  const handleGoToChangePassword = (event: FormEvent) => {
    event.preventDefault();
    onViewChangePassword();
  };

  const handleGoToForgotPassaword = (event: FormEvent) => {
    event.preventDefault();
    onViewForgotPassaword();
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      {removeLoading && <Loading />}

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
              name="email"
              placeholder="exemplo@rvc.law"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="mx-5 mt-3">
          <label htmlFor="senha" className="form-label">
            Senha:
          </label>
          <div className="input-group">
            <span className="input-group-text bg-white">
              <img src="/iconPass.png" alt="usuario senha" />
            </span>
            <input
              type={passwordShown ? "text" : "password"}
              className="form-control"
              placeholder="*******"
              id="senha"
              name="senha"
              onChange={(event) => setSenha(event.target.value)}
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
        <div className="mx-5 mt-3">
          <div className="col text-end">
            <span>
              Primeiro acesso?&nbsp;
              <a
                href="/"
                onClick={(event) => {
                  handleGoToRegister(event);
                }}
              >
                Registre-se.
              </a>
            </span>
          </div>
        </div>
        <div className="mx-5 mt-3">
          <div className="col text-end">
            <span>
              <a
                href="/"
                onClick={(event) => {
                  handleGoToChangePassword(event);
                }}
              >
                Alterar minha senha.
              </a>
            </span>
          </div>
        </div>

        <div className="mx-5 mt-3">
          <div className="col text-end">
            <span>
              <a
                href="/"
                onClick={(event) => {
                  handleGoToForgotPassaword(event);
                }}
              >
                Esqueci minha senha.
              </a>
            </span>
          </div>
        </div>

        <div className="mx-5 mt-4">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </>
  );
};

export default Login;
