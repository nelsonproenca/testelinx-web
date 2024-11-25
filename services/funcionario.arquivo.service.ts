import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { FuncionarioArquivoModel } from '../models/funcionario.arquivo.model';

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
  return http.get<Array<FuncionarioArquivoModel>>(
    `/FuncionarioArquivo/funcionario/${codigoFuncionario}`,
    config
  );
};

const get = (codigoFuncionario: number, tipoDocumento: number) => {
  let config = init();
  return http.get<FuncionarioArquivoModel>(
    `/FuncionarioArquivo/funcionario/${codigoFuncionario}/tipo/${tipoDocumento}`,
    config
  );
};

const create = (data: FuncionarioArquivoModel) => {
  let config = init();
  return http.post<FuncionarioArquivoModel>(
    '/FuncionarioArquivo',
    data,
    config
  );
};

const update = (data: FuncionarioArquivoModel) => {
  let config = init();
  return http.put<boolean>('/FuncionarioArquivo', data, config);
};

const remove = (id: number) => {
  let config = init();
  return http.delete<boolean>(`/FuncionarioArquivo/${id}`, config);
};

const upload = (data: FormData) => {
  let config = init();
  return http.post<FuncionarioArquivoModel>(
    '/FuncionarioArquivo/upload/',
    data,
    config
  );
};

const download = (data: string, codigoFuncionario: number) => {
  let config = init();
  return http.post<string>(
    `/FuncionarioArquivo/download/funcionario/${codigoFuncionario}`,
    data,
    config
  );
};

const FuncionarioArquivoService = {
  getAll,
  get,
  create,
  update,
  remove,
  upload,
  download,
};

export default FuncionarioArquivoService;
