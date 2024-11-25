import { useState } from 'react';

import { UsuarioModel } from '../models/usuario.model';

import LocalStorageService from '../services/local.storage.service';

export default function useToken() {
  const getToken = () => {
    const token: UsuarioModel = JSON.parse(
      LocalStorageService.retrieve('LoginUsuario')
    );
    return token;
  };

  const [token, setToken] = useState<UsuarioModel>(getToken());

  const saveToken = (userToken: UsuarioModel) => {
    LocalStorageService.create(JSON.stringify(userToken), 'LoginUsuario');    
    
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
