import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioDependenteModel } from '../models/funcionario.dependente.model';

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
  return http.get<Array<FuncionarioDependenteModel>>(
    `/FuncionarioDependente/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<FuncionarioDependenteModel>(
    `/FuncionarioDependente/${id}`,
    config
  );
};

const create = (data: FuncionarioDependenteModel) => {
  let config = init();
  return http.post<FuncionarioDependenteModel>(
    '/FuncionarioDependente',
    data,
    config
  );
};

const update = (data: FuncionarioDependenteModel) => {
  let config = init();
  return http.put<number>('/FuncionarioDependente', data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(`/FuncionarioDependente/${id}`, config);
};

const FuncionarioDependenteService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioDependenteService;
