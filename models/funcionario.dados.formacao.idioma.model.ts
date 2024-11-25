import { FormacaoModel } from './funcionario.formacao.model';
import { FuncionarioIdiomaModel } from './funcionario.idioma.model';

type FuncionarioDadosFormacaoIdiomaModel = {
  codigoFuncionario?: number;
  idiomas?: FuncionarioIdiomaModel[];
  formacoes?: FormacaoModel[];
};

export type { FuncionarioDadosFormacaoIdiomaModel };
