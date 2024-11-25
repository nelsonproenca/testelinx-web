import { FormEvent, useState } from "react";

import { AuthResultType } from "../../models/auth.result.type";
import { CriarUsuarioModel } from "../../models/criar.usuario.model";
import { UsuarioModel } from "../../models/usuario.model";

import AutenticacaoService from "../../services/autenticacao.service";

import Swal from "sweetalert2";
import { ToastMessageAlert } from "../../seeds/tipo.seed";

type RegisterProps = {
  onViewLogin: () => void;
};

const Register = ({ onViewLogin }: RegisterProps) => {
  const [email, setEmail] = useState<string>();
  const [primeiroNome, setPrimeiroNome] = useState<string>();
  const [ultimoNome, setUltimoNome] = useState<string>();

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (
      email?.length === 0 ||
      email?.split("@")[1] !== "rvc.law" ||
      primeiroNome?.length === 0 ||
      ultimoNome?.length === 0
    ) {
      ToastMessageAlert.fire(
        "",
        "Verifique se os dados foram preenchidos corretamente.",
        "error"
      );
      return;
    } else {
      try {
        const criarUsuario: CriarUsuarioModel = {
          email: email!,
          primeiroNome: primeiroNome!,
          ultimoNome: ultimoNome!,
        };

        const respCriarUsuario = await AutenticacaoService.postCriarUsuario(
          criarUsuario
        );

        const result: AuthResultType<UsuarioModel>[] = respCriarUsuario.data;

        if (result) {
          ToastMessageAlert.fire("", "Usuário já cadastrado.", "warning");
        }

        onViewLogin();
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
        <label htmlFor="primeiroNome" className="form-label">
          Primeiro Nome
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconUser.png" alt="usuario email" />
          </span>
          <input
            type="text"
            className="form-control"
            id="primeiroNome"
            name="primeiroNome"
            placeholder="Informe o primeiro nome"
            onChange={(event) => setPrimeiroNome(event.target.value)}
          />
        </div>
      </div>
      <div className="mx-5 mt-3">
        <label htmlFor="ultimoNome" className="form-label">
          Último Nome
        </label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <img src="/iconUser.png" alt="usuario email" />
          </span>
          <input
            type="text"
            className="form-control"
            id="ultimoNome"
            name="ultimoNome"
            placeholder="Informe o último nome"
            onChange={(event) => setUltimoNome(event.target.value)}
          />
        </div>
      </div>
      <div className="mx-5 mt-3">
        <label htmlFor="email" className="form-label">
          E-mail
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
            placeholder="Informe o E-mail"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className="mx-5 mt-3">
        <button type="submit">Registrar</button>
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

export default Register;
