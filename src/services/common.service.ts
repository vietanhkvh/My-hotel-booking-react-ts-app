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
export const checkDupUserN = (payload: some) => {
  return api.get('dup-username-account/' + payload?.userName);
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
    'rating?idPaymentD=' +
      payload?.idPaymentD +
      '&rateCounting=' +
      payload?.rateCounting +
      '&rateDetail=' +
      payload?.rateDetail
  );
};
//email
export const sendEmailBooking = (payload: some) => {
  return api.post(
    'send-email-payment?email=' +
      payload?.email +
      '&idPayment=' +
      payload?.idPayment +
      '&detail=' +
      payload?.detail
  );
};
export const sendEmailOtp = (payload: some) => {
  return api.post(
    'send-email-otp?email=' + payload?.email + '&otpCode=' + payload?.otp
  );
};
export const sendEmailNewPwd = (payload: some) => {
  return api.post('send-email-forgot-pwd?email=' + payload?.email);
};
//statistical
export const getPaymentAmount = (payload: some) => {
  return api.get('payments-amount/' + payload?.idAccount);
};
export const getTotalIncome = (payload: some) => {
  return api.get('payments-income/' + payload?.idAccount + '/' + payload?.year);
};

export const getTotalIncomeEY = (payload: some) => {
  return api.get(
    'payments-income-each-year/' + payload?.idAccount + '/' + payload?.year
  );
};

export const getTotalRoomIncomeM = (payload: some) => {
  return api.get(
    'payments-room-income-month/' +
      payload?.idAccount +
      '/' +
      payload?.idHotel +
      '/' +
      payload?.year
  );
};

export const getTotalHotelIncomeY = (payload: some) => {
  return api.get(
    'payments-income-year/' +
      payload?.idAccount +
      '/' +
      payload?.idHotel +
      '/' +
      payload?.year
  );
};

export const getTotalRA = (payload: some) => {
  return api.get('room-active/' + payload?.idAccount);
};

export const getTotalR = (payload: some) => {
  return api.get('room-all/' + payload?.idAccount);
};

export const getRatingHotel = (payload: some) => {
  return api.get('rating-hotel/' + payload?.idHotel);
};
