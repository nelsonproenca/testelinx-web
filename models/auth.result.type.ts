type AuthResultType<T> = {
  code: string;
  description: string;
  item?: T;
  items?: Array<T>;
};

export type { AuthResultType };
