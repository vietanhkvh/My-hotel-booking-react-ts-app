import { some } from '../const/keyString';
import api from '../utils/api';

//hotel
export const getHotelTable = () => {
  return api.get('/hotel');
};
export const getHotelTableForHostAll = (payload: some) => {
  return api.get('/hotel/' + payload?.idAccount);
};
export const getHotelTableForHost=(payload:some)=>{
  return api.get('/hotel/' + payload?.idAccount);
}
export const getLocationHotel = () => {
  return api.get('/hotel-location');
};
export const getSearchingResultLocation = (payload: some) => {
  return api.post(
    'hotel-list-searching-location?location=' + payload?.location+"&guestNum="+payload?.guestNum
  );
};
export const getSearchingResultRating = (payload: some) => {
  return api.post('hotel-list-searching-rating?location=' + payload?.location+"&guestNum="+payload?.guestNum);
};
export const getHotelInforByID = (payload: some) => {
  return api.post('hotel-by-id?idHotel=' + payload?.idHotel);
};

export const updateHotelInfor = (ID_Hotel: string, payload: some) => {
  return api.put(
    'hotel/' +
      ID_Hotel +
      '?hotelName=' +
      payload?.Hotel_Name +
      '&city=' +
      payload?.City +
      '&district=' +
      payload?.District +
      '&ward=' +
      payload?.Ward +
      '&street=' +
      payload?.Street +
      '&phone=' +
      payload?.Phone
  );
};
export const getIDHotelLastest = () => {
  return api.get('hotel-id-lastest');
};
export const saveHotelInfor = (payload: some) => {
  return api.post(
    'hotel?Hotel_Name=' +
      payload?.hotelName +
      '&City=' +
      payload?.city +
      '&District=' +
      payload?.district +
      '&Ward=' +
      payload?.ward +
      '&Street=' +
      payload?.street +
      '&Phone=' +
      payload?.phone +
      '&ID_Status=' +
      payload?.idStatus +
      '&ID_Account=' +
      payload?.idAccount
  );
};
export const updateHotelStatus = (payload:some)=>{
  return api.put('hotel-update-status/'+payload?.idHotel+'?idStatus='+payload?.idStatus)
}
export const getHotelActiveAll=()=>{
  return api.get('hotel-request-active-all')
}
export const getHotelActive=(payload:some)=>{
  return api.get('hotel-request-active/'+payload?.idStatus)
}
export const getHotelManager=(payload:some)=>{
  return api.get('hotel-manager/'+payload?.idAccount+'/'+payload?.idStatus)
}
//room
export const getHotelRoom = (payload: some) => {
  return api.get('hotel-room/' + payload?.idHotel+'/'+payload?.guestNum);
};
export const getRoom = (payload: some) => {
  return api.get('room-by-id/' + payload?.idHotel + '/' + payload?.idRoom);
};
export const editStatusRoom = (payload: some) => {
  return api.post(
    'room-status/' + payload?.idRoom + '?idStatus=' + payload?.idStatus
  );
};
export const getRoomsHotel = (payload: some) => {
  return api.get('rooms/' + payload?.idHotel);
};
export const updateRoomInfor = (idRoom: string, payload: some) => {
  return api.put(
    'hotel-room/' +
      idRoom +
      '?roomName=' +
      payload?.roomName +
      '&bedNumber=' +
      payload?.bedNumber +
      '&bathNumber=' +
      payload?.bathNumber +
      '&price=' +
      payload?.price +
      '&idType='+payload?.idType
  );
};

export const getIDRoomLastest = () => {
  return api.get('room-id-lastest');
};

export const saveRoomInfor = (payload: some) => {
  return api.post(
    'hotel-room?idHotel=' +
      payload?.idHotel +
      '&roomName=' +
      payload?.roomName +
      '&bedNumber=' +
      payload?.bedNumber +
      '&bathNumber=' +
      payload?.bathNumber +
      '&price=' +
      payload?.price +
      '&idType=' +
      payload?.idType +
      '&idStatus=' +
      payload?.idStatus
  );
};
