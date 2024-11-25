import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { CommandResultType } from '../models/command.result.type';
import { FormacaoModel } from '../models/funcionario.formacao.model';

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
  return http.get<Array<FormacaoModel>>(
    `/FuncionarioFormacao/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<FormacaoModel>(`/FuncionarioFormacao/${id}`, config);
};

const create = (data: FormacaoModel) => {
  let config = init();
  return http.post<CommandResultType<FormacaoModel>>(
    '/FuncionarioFormacao',
    data,
    config
  );
};

const update = (id: number, data: FormacaoModel) => {
  let config = init();
  return http.put<number>(`/FuncionarioFormacao/${id}`, data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(`/FuncionarioFormacao/${id}`, config);
};

const FuncionarioFormacaoService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioFormacaoService;
