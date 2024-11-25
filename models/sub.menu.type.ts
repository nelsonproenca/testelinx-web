type SubMenuType = {
  title: string;
  show: boolean;
  link: string;
  roles: string[];
  submenu: SubMenuType[];
};

export type { SubMenuType };
