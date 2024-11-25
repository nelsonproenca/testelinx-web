import axios from 'axios';

import { devLocal, prodIntranet } from '../../api.routes';

const api = axios.create({
  baseURL: prodIntranet,
  headers: {
    'Content-type': 'application/json',
  },
});

export default api;
