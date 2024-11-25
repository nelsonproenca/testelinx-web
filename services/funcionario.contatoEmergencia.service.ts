import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioContatoEmergenciaModel } from '../models/funcionario.contatoemergencia.model';

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
  return http.get<Array<FuncionarioContatoEmergenciaModel>>(
    `/FuncionarioContato/contatos/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<FuncionarioContatoEmergenciaModel>(
    `/FuncionarioContato/contato/${id}`,
    config
  );
};

const create = (data: FuncionarioContatoEmergenciaModel) => {
  let config = init();
  return http.post<FuncionarioContatoEmergenciaModel>(
    '/FuncionarioContato',
    data,
    config
  );
};

const update = (data: FuncionarioContatoEmergenciaModel) => {
  let config = init();
  return http.put<number>('/FuncionarioContato', data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(`/FuncionarioContato/${id}`, config);
};

const FuncionarioContatoEmergenciaService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioContatoEmergenciaService;
