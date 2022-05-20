import { some } from '../const/keyString';
import api from '../utils/api';

export const getCouponHotel = (payload: some) => {
  return api.post(
    'coupon-hotel/' +
      payload?.idHotel +
      '?dateIn=' +
      payload?.dateIn +
      '&dateOut=' +
      payload?.dateOut
  );
};
export const getListCouponHotel = (payload: some) => {
  return api.get('coupon-hotel-manager/' + payload?.idHotel);
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
      payload?.endDate +
      '&typeRoom=' +
      payload?.typeRoom
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
      payload?.endDate +
      '&idStatus=' +
      payload?.idStatus +
      '&typeRoom=' +
      payload?.typeRoom
  );
};
