import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { MenuModel } from '../models/menu.model';

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
  return http.get<MenuModel[]>(`/Menu`, config);
};

const getMenuItens = (id: number = 0) => {
  let config = init();
  return http.get<Array<MenuModel>>(`/Menu/menuitens/${id}`, config);
};

const get = (id: number) => {
  let config = init();
  return http.get<MenuModel>(`/Menu/${id}`, config);
};

const MenuService = {
  getAll,
  get,
  getMenuItens,
};

export default MenuService;
