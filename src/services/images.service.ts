import { some } from '@const/keyString';
import api from '@utils/api';

export const getImagesHotel = (data: some) => {
  return api.get('images/' + data?.idHotel);
};
export const getImageHotelRoom = (data: some) => {
  return api.get('images-hotel-room/' + data?.idRoom);
};
