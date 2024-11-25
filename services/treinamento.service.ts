import http from '../api/http-common';

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

const upload = (data: FormData) => {
  let config = init();
  return http.post<boolean>('/Treinamento/upload/', data, config);
};

const TreinamentoService = {
  upload,
};

export default TreinamentoService;
