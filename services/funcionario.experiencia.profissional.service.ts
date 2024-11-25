import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { CommandResultType } from '../models/command.result.type';
import { ExperienciaProfissionalModel } from '../models/funcionario.experienciaprofissional.model';

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
  return http.get<Array<ExperienciaProfissionalModel>>(
    `/FuncionarioExperienciaProfissional/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (id: number) => {
  let config = init();
  return http.get<ExperienciaProfissionalModel>(
    `/FuncionarioExperienciaProfissional/${id}`,
    config
  );
};

const create = (data: ExperienciaProfissionalModel) => {
  let config = init();
  return http.post<CommandResultType<ExperienciaProfissionalModel>>(
    '/FuncionarioExperienciaProfissional',
    data,
    config
  );
};

const update = (data: ExperienciaProfissionalModel, id: number) => {
  let config = init();
  return http.put<boolean>(
    `/FuncionarioExperienciaProfissional/${id}`,
    data,
    config
  );
};

const remove = (id: number) => {
  let config = init();
  return http.delete<number>(
    `/FuncionarioExperienciaProfissional/${id}`,
    config
  );
};

const FuncionarioExperienciaProfissionalService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default FuncionarioExperienciaProfissionalService;
