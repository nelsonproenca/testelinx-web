type FuncionarioEnderecoModel = {
  codigo: number;
  codigoFuncionario: number;
  codigoUf: number;
  codigoMunicipio: number;
  logradouro?: string;
  numero?: string;
  cep?: string;
  bairro?: string;
  complemento?: string;
};

export type { FuncionarioEnderecoModel };
