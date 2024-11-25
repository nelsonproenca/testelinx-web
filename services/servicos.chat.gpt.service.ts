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


const postConversation = (data: string) => {
  let config = init();
  return http.post<string>(`/ServicosChatGpt/conversation`, data, config);
};

const postSentiment = (data: string) => {
  let config = init();
  return http.post<string>(`/ServicosChatGpt/sentiment`, data, config);
};

const postSummarize = (data: string) => {
  let config = init();
  return http.post<string>('/ServicosChatGpt/summarize', data, config);
};

const ServicosChatGptService = {
  postConversation,
  postSentiment,
  postSummarize,
};

export default ServicosChatGptService;
