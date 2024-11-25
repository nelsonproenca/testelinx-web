import { PermissaoModel } from './permissao.model';

type UsuarioModel = {
  email?: string;
  senha?: string;
  perfil: string;
  codigoProfissional: number;
  nomeCompleto: string;
  apelido: string;
  cargo: string;
  periodoInicialApontamento: string;
  periodoFinalApontamento: string;
  codigoParametroAvaliacao: number;
  bloqueadoPeriodoAvaliado: boolean;
  bloqueadoPeriodoAvaliador: boolean;
  bloqueadoPeriodoCoach: boolean;
  periodoPromocao?: boolean;
  permissoes: PermissaoModel[];
  hashUpdate?: string;
  admissao?: string;
  vinculo?: string;
  bloqueadoHorasExtras?: boolean;
  codigoEscritorio?: number;
};

export type { UsuarioModel };
