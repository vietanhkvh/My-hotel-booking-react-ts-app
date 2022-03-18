import { some } from '../const/keyString';
import api from '../utils/api';

//account
export const getAccount = (payload: some) => {
  return api.get('account/' + payload?.idRole);
};
export const getAccountIF = (payload: some) => {
  return api.get('account-infor/' + payload?.idAccount);
};
export const getAccountRoleSts = (payload: some) => {
  return api.get('account-role-sts/' + payload?.idStatus);
};
export const updateAccountInfor = (payload: some) => {
  return api.post(
    'account-update?idAccount=' +
      payload?.idAccount +
      '&email=' +
      payload?.email +
      '&fullName=' +
      payload?.fullName +
      '&phone=' +
      payload?.phone +
      '&password=' +
      payload?.password
  );
};
export const updateAccountSts = (payload: some) => {
  return api.post(
    'account-status?idAccount=' +
      payload?.idAccount +
      '&status=' +
      payload?.status
  );
};
export const updateAccountRole = (payload: some) => {
  return api.post(
    'account-role/' + payload?.idAccount + '?idRole=' + payload?.idRole
  );
};
export const registerAccount = (payload: some) => {
  return api.post(
    'account?ID_Role=' +
      payload?.idRole +
      '&UserName=' +
      payload?.userName +
      '&Password=' +
      payload?.password +
      '&FullName=' +
      payload?.fullName +
      '&Email=' +
      payload?.email +
      '&Phone=' +
      payload?.phone +
      '&Status=' +
      payload?.status
  );
};
//type room
export const getTypesRoom = () => {
  return api.get('types-room');
};
//images
export const getImgHotel = (payload: some) => {
  return api.get('images/' + payload?.idHotel);
};
export const getImgRoom = (payload: some) => {
  return api.get('images-hotel-room/' + payload?.idRoom);
};
export const updateImg = (payload: some) => {
  return api.put('images/' + payload?.idImg + '?imgUrl=' + payload?.imgUrl);
};
export const saveImg = (payload: some) => {
  return api.post(
    'images?idHotel=' +
      payload?.idHotel +
      '&idRoom=' +
      payload?.idRoom +
      '&Image=' +
      payload?.imgUrl
  );
};
//rating
export const getRatingInfor = (payload: some) => {
  return api.get('rating-account/' + payload?.idPayment);
};
export const saveRating = (payload: some) => {
  return api.post(
    'rating?idPayment=' +
      payload?.idPayment +
      '&rateCounting=' +
      payload?.rateCounting +
      '&rateDetail=' +
      payload?.rateDetail
  );
};
