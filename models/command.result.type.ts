type CommandResultType<T> = {
  mensagem: string;
  erros: string;
  item: T;
};

export type { CommandResultType };
