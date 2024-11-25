import { MenuModel } from './menu.model';
import { PermissaoModel } from './permissao.model';

type PerfilUsuarioModel = {
  emails: string[];
  perfil: string;
  permissoes: PermissaoModel[];
  menuPermissoes?: MenuModel[];
};

export type { PerfilUsuarioModel };
