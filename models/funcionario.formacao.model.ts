type FormacaoModel = {
  codigo: number;
  codigoFuncionario: number;
  nomeInstituicao?: string;
  inicio?: string;
  termino?: string;
  statusCursando?: number;
  nomeCurso?: string;
  tipoFormacao?: number;
  semestre?: string;
  orgaoClasse?: string;
  numeroRegistroOrgao?: string;
  especializacaoAdicional?: string;
};

export type { FormacaoModel };
