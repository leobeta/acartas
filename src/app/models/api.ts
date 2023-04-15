import { environment } from './../../environments/environment';

const APIURI = environment.apiUrl;

export const API = {
  user: {
    login: APIURI + '/user/login',
    getUser: APIURI + '/user/getUserById'
  },
  patient: APIURI + '/patient',
  agenda: APIURI + '/agenda',
  consultation: APIURI + '/consultation',
}
