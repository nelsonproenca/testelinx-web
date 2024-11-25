import http from '../api/http-common';

import { ClienteModel } from '../models/cliente.model';

import LocalStorageService from './local.storage.service';

const init = () => {
  const chave: string = 'AccessToken';

  const token: string = LocalStorageService.retrieve(chave);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

const get = (cpfCnpj: string) => {
  let config = init();
  return http.get<ClienteModel>(`/ServicosReceita/${cpfCnpj}`, config);
};

const ServicosReceitaService = {
  get,
};

export default ServicosReceitaService;
