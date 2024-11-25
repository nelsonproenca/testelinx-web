import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioIdiomaModel } from '../models/funcionario.idioma.model';

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

const getAll = (codigoFuncionario: number) => {
  let config = init();
  return http.get<Array<FuncionarioIdiomaModel>>(
    `/FuncionarioIdioma/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<FuncionarioIdiomaModel>(`/FuncionarioIdioma/${id}`, config);
};

const create = (data: FuncionarioIdiomaModel) => {
  let config = init();
  return http.post<FuncionarioIdiomaModel>('/FuncionarioIdioma', data, config);
};

const update = (data: FuncionarioIdiomaModel) => {
  let config = init();
  return http.put<boolean>('/FuncionarioIdioma', data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(`/FuncionarioIdioma/${id}`, config);
};

const FuncionarioIdiomaService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioIdiomaService;
