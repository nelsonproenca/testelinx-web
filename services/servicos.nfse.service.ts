import http from '../api/http-common';

import { CancelarResultType } from '../models/nfse.cancelar.result.type';
import { ConsultaSucessoResultType } from '../models/nfse.consulta.sucesso.result.type';
import { EnvioSucessoResultType } from '../models/nfse.envio.sucesso.result.type';

import { NFSeModel } from '../models/nfse.model';

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

const consultar = (referencia: string, codigoEmpresa: number) => {
  let config = init();
  return http.get<ConsultaSucessoResultType>(
    `/ServicosNFSe/consultar/referencia/${referencia}/empresa/${codigoEmpresa}`,
    config
  );
};

const autorizar = (
  referencia: string,
  data: NFSeModel,
  codigoEmpresa: number
) => {
  let config = init();
  return http.post<EnvioSucessoResultType>(
    `/ServicosNFSe/autorizar/referencia/${referencia}/empresa/${codigoEmpresa}`,
    data,
    config
  );
};

const cancelar = (
  referencia: string,
  justificativa: string,
  codigoEmpresa: number
) => {
  let config = init();
  return http.delete<CancelarResultType>(
    `/ServicosNFSe/cancelar/referencia/${referencia}/empresa/${codigoEmpresa}/${justificativa}`,
    config
  );
};

const enviarEmail = (referencia: string, codigoEmpresa: number) => {
  let config = init();
  return http.post<string>(
    `/ServicosNFSe/enviarEmail/referencia/${referencia}/empresa/${codigoEmpresa}`,
    config
  );
};

const ServicosNFSeService = {
  enviarEmail,
  cancelar,
  autorizar,
  consultar,
};

export default ServicosNFSeService;
