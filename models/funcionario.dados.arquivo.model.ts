import { FuncionarioArquivoModel } from './funcionario.arquivo.model';

type FuncionarioDadosArquivoModel = {
  codigoFuncionario?: number;
  arquivos?: FuncionarioArquivoModel[];
};

export type { FuncionarioDadosArquivoModel };
