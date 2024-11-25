import http from '../api/http-common';

import { BuscaCepModel } from '../models/busca.cep.model';

const getBuscaCep = (cep: string) => {
  return http.get<BuscaCepModel>(`https://viacep.com.br/ws/${cep}/json`);
};

const BuscaCepService = {
  getBuscaCep,
};

export default BuscaCepService;
