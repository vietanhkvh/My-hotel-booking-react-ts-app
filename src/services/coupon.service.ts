import { some } from '../const/keyString';
import api from '../utils/api';

export const getCouponHotel = (payload: some) => {
  return api.get('/coupon/' + payload?.idHotel);
};

export const getListCouponHotel = (payload: some) => {
  return api.get('coupon-hotel/' + payload?.idHotel);
};
export const saveCoupon = (payload: some) => {
  return api.post(
    'coupon?idHotel=' +
      payload?.idHotel +
      '&name=' +
      payload?.name +
      '&value=' +
      payload?.value +
      '&startDate=' +
      payload?.startDate +
      '&endDate=' +
      payload?.endDate
  );
};
export const updateCoupon = (payload: some) => {
  return api.put(
    'coupon/' +
      payload?.idCoupon +
      '?name=' +
      payload?.name +
      '&value=' +
      payload?.value +
      '&startDate=' +
      payload?.startDate +
      '&endDate=' +
      payload?.endDate
      +'&idStatus='+payload?.idStatus
  );
};
