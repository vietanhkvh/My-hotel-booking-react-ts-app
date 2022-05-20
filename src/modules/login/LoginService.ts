import api, { BASE_URL } from '../../utils/api';
import { some } from '../../const/keyString';

export const getBaseOption = (newOption) => {
  return {
    ...newOption,
    headers: {
      ...newOption?.headers,
      login_token: localStorage.getItem('token-key') || '',
    },
    readonlyOption: true,
  };
};
export const actionLogin = (data: some) => {
  const option = {
    severVice: 'AUTH_SERVICE',
    baseURL: BASE_URL,
    data,
    notifyError: true,
  };
  return api.post(
    '/auth/login?UserName=' + data?.account + '&Password=' + data?.password,
    getBaseOption(option)
  );
};
