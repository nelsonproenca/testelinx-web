import http from '../api/http-common';

const getToken = () => {
  return http.get<string>(`/Auth/token`);
};

const AuthService = {
  getToken,
};

export default AuthService;
