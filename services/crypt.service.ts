import { chaveToken } from '../../api.routes';
import http from '../api/http-common';

import { CryptParamsModel } from '../models/crypt.params.model';

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

const encrypt = (data: CryptParamsModel) => {
  let config = init();
  return http.post<string>('/ServicosCriptografia/encrypt', data, config);
};

const decrypt = (data: CryptParamsModel) => {
  let config = init();
  return http.post<string>('/ServicosCriptografia/decrypt', data), config;
};

const CryptService = {
  encrypt,
  decrypt,
};

export default CryptService;
