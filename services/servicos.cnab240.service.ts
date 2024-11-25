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

const getAll = () => {
  let config = init();
  return http.get<Array<string>>(`/ServicosCnab240/list`, config);
};

const getContainer = (ano: string) => {
  let config = init();
  return http.get<Array<string>>(`/ServicosCnab240/container/${ano}`, config);
};

const upload = (data: FormData) => {
  let config = init();
  return http.post<string>('/ServicosCnab240/upload', data, config);
};

const download = (ano: string, nomeArquivo: string) => {
  let config = init();
  return http.post<string>(
    `/ServicosCnab240/download/container/${ano}`,
    nomeArquivo,
    config
  );
};

const send = (data: FormData) => {
  let config = init();
  return http.post<string>('/ServicosCnab240', data, config);
};

const ServicosCnab240Service = {
  getAll,
  getContainer,
  upload,
  download,
  send,
};

export default ServicosCnab240Service;
