import { environment } from './../../environments/environment';

const APIURI = environment.apiUrl;

export const API = {
  user: {
    login: APIURI + '/user/login',
  },

  patient: APIURI + '/patient'
}
