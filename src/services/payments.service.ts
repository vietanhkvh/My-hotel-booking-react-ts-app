import { some } from '@const/keyString';
import api from '../utils/api';

export const savePayments = (payload: some) => {
  return api.post(
    'payments?Guest_Number=' +
      payload?.guestNum +
      '&Final_Total=' +
      payload?.finalTotal +
      '&ID_Account=' +
      payload?.idAccount +
      '&Status=' +
      payload?.paymentMethod
  );
};
export const savePayments_D = (payload: some) => {
  return api.post(
    'payments-detail?ID_Payment=' +
      payload?.idPayment +
      '&ID_Room=' +
      payload?.idRoom
  );
};
export const getPaymentInfor = (payload: some) => {
  return api.get(
    'payment-detail/' + payload?.idPayment
  );
};
export const getPaymentAccount = (payload: some) => {
  return api.get(
    'payments-account/' + payload?.idAccount + '/' + payload?.idStatus
  );
};
export const getPaymentAccountAll = (payload: some) => {
  return api.get('payments/' + payload?.idAccount);
};
export const getPaymentHostByHotel = (payload: some) => {
  return api.get('payments-host/' + payload?.idHotel);
};
export const updatePaymentSts = (payload: some) => {
  return api.put(
    'payments/' +
      payload?.idPayment +
      '?idStatus=' +
      payload?.idStatus +
      '&finalTotal=' +
      payload?.finalTotal
  );
};
export const saveMultiplePD = (payload: some) => {
  return api.post('payments-save/'+payload?.idPayment, null, {
    params: { paymentD: payload?.paymentD },
  });
};
export const getLastIdPaymentD = () => {
  return api.get('paymentd-last-id');
};
