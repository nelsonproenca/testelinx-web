import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioEnderecoModel } from '../models/funcionario.endereco.model';

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
  return http.get<FuncionarioEnderecoModel>(
    `/FuncionarioEndereco/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<FuncionarioEnderecoModel>(
    `/FuncionarioEndereco/${id}`,
    config
  );
};

const create = (data: FuncionarioEnderecoModel) => {
  let config = init();
  return http.post<FuncionarioEnderecoModel>(
    '/FuncionarioEndereco',
    data,
    config
  );
};

const update = (data: FuncionarioEnderecoModel) => {
  let config = init();
  return http.put<number>('/FuncionarioEndereco', data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(`/FuncionarioEndereco/${id}`, config);
};

const FuncionarioEnderecoService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioEnderecoService;
