type MenuModel = {
  codigo: number;
  titulo: string;
  visivel: boolean;
  link: string;
  subMenu: boolean;
  codigoMenuPai: number;
  claimRead: string;
  claimWrite: string;
  isCheckedClaimRead: boolean;
  isCheckedClaimWrite: boolean;
};

export type { MenuModel };
