import { SubMenuType } from './sub.menu.type';

type ItemMenuType = {
  title: string;
  show: boolean;
  link: string;
  submenu: SubMenuType[];
  roles: string[];
};

export type { ItemMenuType };
