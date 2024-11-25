const create = (valor: string, chave: string) => {
  localStorage.setItem(chave, valor);
};

const retrieve = (chave: string): string => localStorage.getItem(chave)!;

const remove = (chave: string) => localStorage.removeItem(chave);

const LocalStorageService = {
  create,
  retrieve,
  remove,
};

export default LocalStorageService;
