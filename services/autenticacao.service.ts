import http from '../api/http-common';

import { AlterarSenhaUsuarioModel } from '../models/alterar.senha.usuario.model';
import { AuthResultType } from '../models/auth.result.type';
import { CommandResultType } from '../models/command.result.type';
import { CriarUsuarioModel } from '../models/criar.usuario.model';
import { LoginUserModel } from '../models/login.user.model';
import { PerfilUsuarioModel } from '../models/perfil.usuario.model';
import { PermissaoModel } from '../models/permissao.model';
import { ResetarSenhaUsuarioModel } from '../models/resetar.senha.usuario.model';
import { UsuarioModel } from '../models/usuario.model';

const getPerfis = () => {
  return http.get<Array<string>>(`/Autenticacao/perfis`);
};

const getPermissoes = (perfil: string) => {
  return http.get<Array<PermissaoModel>>(`/Autenticacao/permissoes/${perfil}`);
};

const postCriarUsuario = (data: CriarUsuarioModel) => {
  return http.post(`/Autenticacao/criarUsuario`, data);
};

const postLoginUsuario = (data: LoginUserModel) => {
  return http.post<CommandResultType<UsuarioModel>>(
    `/Autenticacao/loginUsuario`,
    data
  );
};

const postAlterarSenhaUsuario = (data: AlterarSenhaUsuarioModel) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/alterarSenhaUsuario`,
    data
  );
};

const postAdicionarPermissoesUsuario = (data: PerfilUsuarioModel) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/adicionarPermissoesUsuario`,
    data
  );
};

const getSenhaDefault = () => {
  return http.get<string>(`/Autenticacao/senhaDefault`);
};

const postEsquecerSenhaUsuario = (email: string) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/esquecerSenhaUsuario/${email}`
  );
};

const postResetarSenhaUsuario = (data: ResetarSenhaUsuarioModel) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/resetarSenhaUsuario`,
    data
  );
};

const postConfirmarEmailUsuario = (data: string, email: string) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/confirmarEmailUsuario/${email}`,
    data
  );
};

const postGerarEmailConfirmacao = (email: string) => {
  return http.post<AuthResultType<UsuarioModel>>(
    `/Autenticacao/gerarEmailConfirmacao/${email}`
  );
};

const getEmailConfirmado = (email: string) => {
  return http.get<boolean>(`/Autenticacao/emailConfirmado/${email}`);
};

const putRemoverPerfil = (email: string, novoPerfil: string) => {
  return http.put<AuthResultType<UsuarioModel>>(
    `/Autenticacao/removerPerfil/${email}`,
    novoPerfil
  );
};

const getObterPerfil = (email: string) => {
  return http.get<string>(`/Autenticacao/perfil/email/${email}`);
};

const AutenticacaoService = {
  getPerfis,
  getSenhaDefault,
  getEmailConfirmado,
  getPermissoes,
  postCriarUsuario,
  postLoginUsuario,
  postAlterarSenhaUsuario,
  postAdicionarPermissoesUsuario,
  postEsquecerSenhaUsuario,
  postResetarSenhaUsuario,
  postConfirmarEmailUsuario,
  postGerarEmailConfirmacao,
  putRemoverPerfil,
  getObterPerfil,
};

export default AutenticacaoService;
