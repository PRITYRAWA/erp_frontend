import axios from 'axios';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import {
  createAction,
  RESET__PASSWORD__EMAIL,
  USER__LOGIN, CHANGE__PASSWORD
} from './action';

import { HEADERS } from '../config/appHeaders';
import { BASE_URL } from '../config/api';

export const user_login = (data) => {
  const encryptData = base64_encode(data.username + ':' + data.password);

  return createAction({
    type: USER__LOGIN,
    // action: () => axios.post(`${BASE_URL}/users/login/`, data, { headers: HEADERS.LOGIN(encryptData) })
    action: () => axios.post(`${BASE_URL}/users/login/`, data, { headers: HEADERS.LOGIN(encryptData) })
  });
}


export const request_reset_email = (data) => {
  // const encryptData = base64_encode(data.email);
  return createAction({
    type: RESET__PASSWORD__EMAIL,
    action: () => axios.post(`${BASE_URL}/users/request-reset-email/`, data, { headers: HEADERS.AUTHENTIC() })
  });
}

export const change_password = (data) => {
  return createAction({
    type: CHANGE__PASSWORD,
    action: () => axios.post(`${BASE_URL}/users/request-reset-email/`, data, { headers: HEADERS.AUTHENTIC() })
  });
}