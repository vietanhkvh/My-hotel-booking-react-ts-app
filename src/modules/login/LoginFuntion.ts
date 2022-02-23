import { SUCCESS_CODE } from '../../components/constants';
import { some } from '@const/keyString';
import { actionLogin } from './LoginService';

export const HandleLogin = async (account: string, password: string) => {
  let result: some=[];
  const req = actionLogin({
    account,
    password,
  });
  try {
    const res: some = await req;
    if (res?.data?.code === SUCCESS_CODE) {
      result = {
        data: res?.data,
      };
    } else {
      result = {
        error: {
          message: res?.data?.data
        },
      };
    }
  } catch (error) {
    result = { error };
  }
  return result;
};
