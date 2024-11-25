import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioModel } from '../models/funcionario.model';
import { SaldoFeriasModel } from '../models/saldo.ferias.model';

import LocalStorageService from './local.storage.service';

const init = () => {
  const token: string = LocalStorageService.retrieve(chaveToken);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

const getAll = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(`/Funcionario`, config);
};

const getOne = (codigoFuncionario: number) => {
  let config = init();
  return http.get<FuncionarioModel>(
    `/Funcionario/${codigoFuncionario}`,
    config
  );
};

const getDadosPessoais = (codigoFuncionario: number) => {
  let config = init();
  return http.get<FuncionarioModel>(
    `/Funcionario/dadosPessoais/${codigoFuncionario}`,
    config
  );
};

const getSocios = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(
    `/Funcionario/sociosPipeline`,
    config
  );
};

const getSociosTi = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(`/Funcionario/sociosti`, config);
};

const getGerentes = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(`/Funcionario/gerentes`, config);
};

const getAdvogadoSrs = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(`/Funcionario/advogadosr`, config);
};

const getAtivos = (codigoFuncionario: number, mostrarSocios: boolean) => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(
    `/Funcionario/ativos/${codigoFuncionario}/socios/${mostrarSocios}`,
    config
  );
};

const getSociosAtivos = () => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(`/Funcionario/sociosAtivos`, config);
};

const getPorCoach = (codigoFuncionario: number) => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(
    `/Funcionario/porCoach/${codigoFuncionario}`,
    config
  );
};

const getPorLider = (codigoFuncionario: number) => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(
    `/Funcionario/porLider/${codigoFuncionario}`,
    config
  );
};

const getPorPerfil = (perfil: string) => {
  let config = init();
  return http.get<Array<FuncionarioModel>>(
    `/Funcionario/porPerfil/${perfil}`,
    config
  );
};

const getPorApelido = (apelido: string) => {
  let config = init();
  return http.get<FuncionarioModel>(
    `/Funcionario/porApelido/${apelido}`,
    config
  );
};

const getPorEmail = (email: string) => {
  let config = init();
  return http.get<FuncionarioModel>(`/Funcionario/porEmail/${email}`, config);
};

const getNomes = () => {
  let config = init();
  return http.get<string[]>(`/Funcionario/nomes/`, config);
};

const getSaldoFeriasFuncionario = (codigoFuncionario: number) => {
  let config = init();
  return http.get<SaldoFeriasModel[]>(`/Funcionario/saldoFerias/funcionario/${codigoFuncionario}`, config);
};

const create = (data: FuncionarioModel) => {
  let config = init();
  return http.post<FuncionarioModel>('/Funcionario', data, config);
};

const updateDadosPessoais = (data: FuncionarioModel) => {
  let config = init();
  return http.put<boolean>('/Funcionario/dadosPessoais/', data, config);
};

const FuncionarioService = {
  getAll,
  getOne,
  getPorPerfil,
  getGerentes,
  getSocios,
  getSociosTi,
  getAdvogadoSrs,
  getPorEmail,
  getAtivos,
  getPorCoach,
  getNomes,
  getPorApelido,
  getPorLider,
  getSociosAtivos,
  getSaldoFeriasFuncionario,
  updateDadosPessoais,
  getDadosPessoais,
  create,
};

export default FuncionarioService;
